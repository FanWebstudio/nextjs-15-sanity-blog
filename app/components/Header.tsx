import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight hover:text-gray-600 transition-colors">
            Blog
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/posts" className="hover:text-gray-600 transition-colors">
              Posts
            </Link>
            <Link href="/about" className="hover:text-gray-600 transition-colors">
              About
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
