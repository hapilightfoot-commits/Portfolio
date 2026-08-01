export default function Footer() {
  return (
    <footer className="max-w-5xl mx-auto px-6 py-10 mt-20">
      <div className="sprocket-rule mb-6" />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="eyebrow">&copy; {new Date().getFullYear()} Your Name</p>
        <p className="eyebrow">Built with Next.js &amp; Tailwind CSS</p>
      </div>
    </footer>
  );
}
