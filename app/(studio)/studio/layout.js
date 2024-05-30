import "@/app/(site)/globals.css"

export const metadata = {
  title: 'Studio Blog',
  description: 'Page for Studio Blog',
}

export default function StudioLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
