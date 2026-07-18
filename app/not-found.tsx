import Link from "next/link";
import { Navbar } from "@/components/redesign/Navbar";
import { Footer } from "@/components/redesign/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-8xl md:text-9xl font-serif font-bold text-accent mb-4">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Page Not Found
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
          We couldn't find the page you're looking for. It might have been
          moved, or it simply doesn't exist.
        </p>

        <Link
          href="/"
          className="bg-accent text-background px-8 py-3 rounded-full font-medium transition-transform hover:scale-105 active:scale-95"
        >
          Return Home
        </Link>
      </main>

      <Footer />
    </div>
  );
}
