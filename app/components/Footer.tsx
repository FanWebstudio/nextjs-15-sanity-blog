import CopyrightYear from './CopyrightYear';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="text-center text-sm text-gray-500">
          <p>  <CopyrightYear /> Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
