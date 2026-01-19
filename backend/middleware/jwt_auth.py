from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.responses import Response
from jose import JWTError
from utils.jwt_utils import verify_token
import logging


class JWTAuthMiddleware(BaseHTTPMiddleware):
    """
    Middleware to verify JWT tokens for protected endpoints.

    This middleware intercepts incoming requests and verifies JWT tokens
    in the Authorization header before allowing the request to proceed.
    """

    def __init__(self, app, exempt_paths: list = None):
        """
        Initialize the middleware.

        Args:
            app: The FastAPI application instance
            exempt_paths (list, optional): List of paths that don't require authentication. Defaults to None.
        """
        super().__init__(app)
        self.exempt_paths = exempt_paths or []
        self.logger = logging.getLogger(__name__)

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        """
        Process the request and verify JWT token if needed.

        Args:
            request (Request): Incoming request
            call_next (RequestResponseEndpoint): Next middleware or endpoint in the chain

        Returns:
            Response: Processed response
        """
        # Check if the path is exempt from authentication
        if self._is_exempt_path(request.url.path):
            return await call_next(request)

        # Extract the authorization header
        auth_header = request.headers.get("Authorization")

        if not auth_header or not auth_header.startswith("Bearer "):
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={
                    "success": False,
                    "data": None,
                    "message": "Authorization header missing or invalid format",
                    "timestamp": self._get_timestamp()
                }
            )

        # Extract the token
        token = auth_header.split(" ")[1]

        # Verify the token
        try:
            user_info = verify_token(token)

            if user_info is None:
                return JSONResponse(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    content={
                        "success": False,
                        "data": None,
                        "message": "Invalid or expired token",
                        "timestamp": self._get_timestamp()
                    }
                )

            # Add user info to request state for later use
            request.state.user = user_info

        except JWTError as e:
            self.logger.error(f"JWT verification error: {str(e)}")
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={
                    "success": False,
                    "data": None,
                    "message": "Invalid token",
                    "timestamp": self._get_timestamp()
                }
            )

        # Continue with the request
        response = await call_next(request)
        return response

    def _is_exempt_path(self, path: str) -> bool:
        """
        Check if a path is exempt from authentication.

        Args:
            path (str): Path to check

        Returns:
            bool: True if path is exempt, False otherwise
        """
        # Normalize the path (ensure it starts with /)
        if not path.startswith("/"):
            path = "/" + path

        # Check against exempt paths
        for exempt_path in self.exempt_paths:
            if path.startswith(exempt_path):
                return True

        return False

    def _get_timestamp(self) -> str:
        """
        Get the current timestamp in ISO format.

        Returns:
            str: Current timestamp in ISO format
        """
        from datetime import datetime
        return datetime.utcnow().isoformat()