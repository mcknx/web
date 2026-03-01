export default function ManualPage() {
  const steps = [
    {
      step: 1,
      title: "Create an Account",
      title_tl: "Gumawa ng Account",
      description:
        "Sign up using your email or Google account. You'll need an assessment code from your administrator.",
      description_tl:
        "Mag-sign up gamit ang iyong email o Google account. Kakailanganin mo ang assessment code mula sa administrator.",
      icon: "👤",
    },
    {
      step: 2,
      title: "Complete the SBQR Assessment",
      title_tl: "Kumpletuhin ang SBQR Assessment",
      description:
        "Answer 4 screening questions honestly. This helps us understand how best to support you.",
      description_tl:
        "Sagutin nang tapat ang 4 na screening questions. Tumutulong ito sa amin na maunawaan kung paano ka mas mapagsisilbihan.",
      icon: "📋",
    },
    {
      step: 3,
      title: "Chat with Ulayaw",
      title_tl: "Kausapin si Ulayaw",
      description:
        "Start a conversation. Ulayaw will guide you through CBT techniques like the ABC Model and Thought Diary.",
      description_tl:
        "Magsimula ng usapan. Gagabayan ka ni Ulayaw sa mga CBT technique tulad ng ABC Model at Thought Diary.",
      icon: "💬",
    },
    {
      step: 4,
      title: "Identify Your Thoughts",
      title_tl: "Kilalanin ang Iyong Pag-iisip",
      description:
        "Work through activating events, beliefs, and consequences. Identify unhelpful thinking styles (UTS).",
      description_tl:
        "Pagdaanan ang mga activating event, beliefs, at consequences. Kilalanin ang unhelpful thinking styles (UTS).",
      icon: "🧠",
    },
    {
      step: 5,
      title: "Reframe & Reflect",
      title_tl: "I-reframe at Mag-reflect",
      description:
        "Challenge negative thoughts with evidence. Use the thought diary to track your progress over time.",
      description_tl:
        "Hamunin ang negatibong pag-iisip gamit ang ebidensya. Gamitin ang thought diary para i-track ang iyong progreso.",
      icon: "✨",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">User Manual</h1>
          <p className="text-lg text-teal-100">
            Learn how to use Ulayaw for your mental health journey
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {steps.map((s) => (
              <div key={s.step} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-2xl">
                    {s.icon}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                      Step {s.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-xs text-teal-600 mb-2 italic">{s.title_tl}</p>
                  <p className="text-sm text-gray-600">{s.description}</p>
                  <p className="text-sm text-gray-400 mt-1 italic">{s.description_tl}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Is Ulayaw a replacement for therapy?",
                a: "No. Ulayaw is a support tool that uses CBT techniques. It is not a replacement for professional mental health care.",
              },
              {
                q: "What is an assessment code?",
                a: "An assessment code is provided by your administrator (counselor, teacher, etc.) to verify your access to the platform.",
              },
              {
                q: "Is my data private?",
                a: "Yes. Your conversations and diary entries are encrypted and only accessible to you and authorized administrators.",
              },
              {
                q: "What languages are supported?",
                a: "Ulayaw supports both English and Filipino (Tagalog). You can switch languages anytime during your session.",
              },
            ].map((faq, i) => (
              <details key={i} className="bg-white p-4 rounded-xl shadow-sm group">
                <summary className="font-medium text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-sm text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
