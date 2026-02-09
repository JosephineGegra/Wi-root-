import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Wi Root - Cassava Flour E-Commerce',
  description: 'Empowering women-led vendors with quality cassava flour',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
          <Toaster position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}