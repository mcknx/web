import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">U</span>
              </div>
              <span className="text-lg font-bold text-gray-800">Ulayaw</span>
            </div>
            <p className="text-sm text-gray-500">
              Your AI-powered mental health companion using Cognitive Behavioral Therapy techniques.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Navigation</h3>
            <div className="flex flex-col gap-2">
              <Link href="/chat" className="text-sm text-gray-500 hover:text-teal-600">Start Chatting</Link>
              <Link href="/about" className="text-sm text-gray-500 hover:text-teal-600">About</Link>
              <Link href="/manual" className="text-sm text-gray-500 hover:text-teal-600">User Manual</Link>
              <Link href="/feedback" className="text-sm text-gray-500 hover:text-teal-600">Feedback</Link>
            </div>
          </div>

          {/* Crisis Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Crisis Resources</h3>
            <div className="text-sm text-gray-500 space-y-1">
              <p>National Center for Mental Health</p>
              <p className="font-medium text-teal-600">Crisis Hotline: 0917-899-8727</p>
              <p>PMHA: (02) 8921-4958</p>
              <p>In Touch Crisis Line: (02) 8893-7603</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Ulayaw. Built with care for mental health awareness.
        </div>
      </div>
    </footer>
  );
}
