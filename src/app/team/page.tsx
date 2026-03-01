export default function TeamPage() {
  const team = [
    {
      name: "Ulayaw Team",
      role: "Capstone Project",
      institution: "University of the Immaculate Conception",
      description:
        "Developed as a capstone project to provide accessible mental health support for Filipino users using CBT techniques.",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Our Team</h1>
          <p className="text-lg text-teal-100">
            The people behind Ulayaw mental health chatbot
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              University of the Immaculate Conception
            </h2>
            <p className="text-gray-600">
              Ulayaw was created as a capstone project with the mission of making
              mental health support more accessible to Filipino communities through
              technology and evidence-based approaches.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Placeholder team members - update with actual team data */}
            {["Researcher", "Developer", "Advisor"].map((role, i) => (
              <div
                key={i}
                className="text-center p-6 bg-gray-50 rounded-xl"
              >
                <div className="w-24 h-24 bg-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl text-teal-600">👤</span>
                </div>
                <h3 className="font-semibold text-gray-900">Team Member</h3>
                <p className="text-sm text-teal-600">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
