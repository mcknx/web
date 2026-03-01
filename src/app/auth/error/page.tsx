export default function AuthErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-sm w-full text-center">
        <span className="text-5xl block mb-4">⚠️</span>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Authentication Error</h2>
        <p className="text-sm text-gray-600 mb-6">
          Something went wrong during authentication. Please try again.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2.5 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 transition-colors"
        >
          Go Home
        </a>
      </div>
    </main>
  );
}
