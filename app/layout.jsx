import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Your Name — Portfolio",
  description: "Photography, films, projects, and apps.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body bg-ink text-parchment min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
