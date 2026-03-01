import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-cyan-50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full mb-6">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
              AI-Powered Mental Health Support
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Kaibigan mo sa{" "}
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Mental Health
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Ulayaw is your AI companion for exploring thoughts and feelings using
              Cognitive Behavioral Therapy (CBT) techniques. Available in English and Filipino.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/chat"
                className="w-full sm:w-auto px-8 py-4 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-200 hover:shadow-xl hover:shadow-teal-200"
              >
                Start Chatting
              </Link>
              <Link
                href="/manual"
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:border-teal-300 hover:text-teal-600 transition-all"
              >
                Learn How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Ulayaw Helps You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Using evidence-based Cognitive Behavioral Therapy techniques, Ulayaw guides you through understanding and managing your thoughts and emotions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🧠"
              title="Thought Diary"
              description="Work through the ABC model — identify Activating events, Beliefs, and Consequences to understand your thought patterns."
            />
            <FeatureCard
              icon="💬"
              title="CBT-Based Chat"
              description="Have a guided conversation that helps you identify unhelpful thinking styles and develop healthier perspectives."
            />
            <FeatureCard
              icon="📊"
              title="Assessment & Tracking"
              description="Take structured assessments and track your emotional progress over time with professional oversight."
            />
          </div>
        </div>
      </section>

      {/* Bilingual */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Available in English &amp; Filipino
            </h2>
            <p className="text-gray-600 mb-8">
              Ulayaw supports bilingual conversations. Talk in the language you&apos;re most
              comfortable with — we&apos;ll understand and respond in kind.
            </p>
            <div className="inline-flex gap-4">
              <span className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-medium">🇺🇸 English</span>
              <span className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-medium">🇵🇭 Filipino</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-8 sm:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to start your journey?</h2>
            <p className="text-teal-100 mb-8 max-w-xl mx-auto">
              Take the first step towards understanding your thoughts and feelings better. Ulayaw is here for you 24/7.
            </p>
            <Link
              href="/chat"
              className="inline-block px-8 py-4 bg-white text-teal-700 font-semibold rounded-xl hover:bg-teal-50 transition-colors shadow-lg"
            >
              Start a Session
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="p-6 bg-gray-50 rounded-2xl hover:bg-teal-50 transition-colors group">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
