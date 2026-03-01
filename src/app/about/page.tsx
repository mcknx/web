import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About Ulayaw</h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            Ulayaw is a mental health support chatbot designed to provide accessible, 
            culturally-sensitive psychological support for Filipino users.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Mental health services in the Philippines remain limited and stigmatized. 
            Ulayaw aims to bridge this gap by providing an accessible, bilingual (English/Filipino) 
            chatbot that guides users through evidence-based Cognitive Behavioral Therapy (CBT) techniques.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Named after the Filipino word for intimate conversation or companionship, 
            Ulayaw embodies our goal of creating a safe, supportive space for mental health care.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "ABC Model (CBT)",
                description:
                  "Walk through Activating events, Beliefs, and Consequences to understand your thought patterns.",
                icon: "🧠",
              },
              {
                title: "Thought Diary",
                description:
                  "Record and analyze your thoughts to identify and challenge unhelpful thinking styles.",
                icon: "📝",
              },
              {
                title: "SBQR Assessment",
                description:
                  "Suicide Behaviors Questionnaire-Revised screening with crisis resource guidance.",
                icon: "🩺",
              },
              {
                title: "Bilingual Support",
                description:
                  "Full English and Filipino (Tagalog) language support throughout the experience.",
                icon: "🌐",
              },
              {
                title: "Unhelpful Thinking Styles",
                description:
                  "Learn to identify common cognitive distortions that affect your mental wellbeing.",
                icon: "💡",
              },
              {
                title: "AI-Powered Insights",
                description:
                  "GPT-4 powered reframing and analysis to provide personalized cognitive support.",
                icon: "🤖",
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-white p-6 rounded-xl shadow-sm">
                <span className="text-3xl mb-3 block">{feature.icon}</span>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-semibold text-amber-800 mb-2">Important Disclaimer</h3>
            <p className="text-sm text-amber-700">
              Ulayaw is not a replacement for professional mental health care. If you are experiencing 
              a mental health crisis, please contact the National Center for Mental Health Crisis Hotline 
              at <strong>0966-351-4518</strong> or <strong>1553</strong>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
