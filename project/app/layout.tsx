
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Navigation from '@/components/navigation';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OptiWork - Optimize Your Remote Work',
  description: 'Enhance productivity and optimize remote work for managers, HR, and employees',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <Script
        src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"
        strategy="lazyOnload"
      />
        <Script
        src="https://files.bpcontent.cloud/2024/11/15/17/20241115175452-200VSO6G.js"
        strategy="lazyOnload"
      />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <Navigation/>
            <main className="container mx-auto px-4 py-6">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}