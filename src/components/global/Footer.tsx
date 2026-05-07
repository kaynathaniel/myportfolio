export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#1e1e1e] py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[#444444] text-xs tracking-widest uppercase">
        <span>© {year} SpiceKtrl. All rights reserved.</span>
        <span>Music. Identity. Culture.</span>
      </div>
    </footer>
  )
}
