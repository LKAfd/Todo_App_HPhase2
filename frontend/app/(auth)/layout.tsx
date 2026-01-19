import React from 'react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <main className="container mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
};

export default AuthLayout;