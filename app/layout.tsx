import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'सरकारी योजना Hub | Govt Schemes, Jobs & CSC',
  description: 'India\'s #1 Portal for Government Schemes, Sarkari Jobs, CSC Services.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <head>
        {/* ADSENSE - Jab ID mile toh XXXX ki jagah apni ID dalein */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-gradient-to-br from-orange-50 to-white min-h-screen flex flex-col">
        <main className="flex-grow">{children}</main>

        <footer className="bg-gray-900 text-white mt-10">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold text-orange-400 mb-3">🇮🇳 सरकारी योजना Hub</h3>
                <p className="text-gray-400 text-sm">Trusted source for Govt Schemes, Jobs & Digital Services.</p>
              </div>
              <div>
                <h4 className="font-bold mb-3">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/" className="hover:text-orange-400">🏠 Home</Link></li>
                  <li><Link href="/about" className="hover:text-orange-400">ℹ️ About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-orange-400">📞 Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/privacy" className="hover:text-orange-400">🔒 Privacy Policy</Link></li>
                  <li><Link href="/disclaimer" className="hover:text-orange-400">⚠️ Disclaimer</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3">⚠️ Notice</h4>
                <p className="text-xs text-gray-500">NOT an official govt website. Verify from .gov.in sources only.</p>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-6 text-center">
              <p className="text-xs text-gray-500">© 2026 Sarkari Yojana Hub | Made with ❤️ for India</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
