import Navbar from '@/components/global/Navbar'
import Footer from '@/components/global/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20">{children}</main>
      <Footer />
    </>
  )
}
