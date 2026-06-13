import Link from "next/link";
import "./globals.css";

/**
 * Global fallback 404 for paths that never reach the [locale] layout. The
 * middleware rewrites almost everything into a locale (so the localized
 * not-found handles normal cases); this is the last-resort shell.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="bg-bg text-text-body antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="font-mono text-sm font-semibold text-brand">404</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-text-strong">
            Page not found
          </h1>
          <p className="mt-3 max-w-md text-text-body">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-11 items-center rounded-full bg-brand px-5 text-sm font-medium text-on-accent"
          >
            Back to home
          </Link>
        </main>
      </body>
    </html>
  );
}
