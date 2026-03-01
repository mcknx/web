"use client";

import { useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";

export default function FeedbackPage() {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !feedback.trim()) return;

    setLoading(true);
    try {
      // TODO: Connect to API endpoint
      await new Promise((r) => setTimeout(r, 1000)); // Simulated
      setSubmitted(true);
    } catch {
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <span className="text-5xl block mb-4">🎉</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600">
            Your feedback helps us improve Ulayaw. Salamat sa iyong tulong!
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Feedback</h1>
          <p className="text-lg text-teal-100">
            Help us improve your Ulayaw experience
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you rate your experience?
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl transition-transform hover:scale-110 ${
                      star <= rating ? "grayscale-0" : "grayscale opacity-30"
                    }`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your feedback
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none resize-none text-sm"
                placeholder="What did you like? What could we improve? / Ano ang gusto mo? Ano ang mapapabuti namin?"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !rating || !feedback.trim()}
              className="w-full py-3 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
