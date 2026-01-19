import React from 'react';
import { AuthProvider } from '@/components/providers/AuthProvider';
import '@/app/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          <div className="relative min-h-screen">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}