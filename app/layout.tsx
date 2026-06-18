import './globals.css'

export const metadata = {
  title: 'Sarkari Yojana Hub',
  description: 'Auto-Updated Government Schemes Directory',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  )
}
