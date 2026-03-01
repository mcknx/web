"use client";

import { useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { api } from "@/lib/api";

export default function AssessmentPage() {
  const { user, session } = useAuth();
  const [step, setStep] = useState<"code" | "assessment" | "complete">("code");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [loading, setLoading] = useState(false);

  // SBQR questions
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleClaimCode = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setCodeError("");
    try {
      await api.assessment.claimCode(session!.access_token, code.trim());
      setStep("assessment");
    } catch (err: any) {
      setCodeError(err.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (value: number) => {
    const next = [...answers, value];
    setAnswers(next);
    if (currentQ < 3) {
      setCurrentQ(currentQ + 1);
    } else {
      submitAssessment(next);
    }
  };

  const submitAssessment = async (allAnswers: number[]) => {
    setLoading(true);
    try {
      await api.assessment.submit(session!.access_token, { answers: allAnswers });
      setStep("complete");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <span className="text-5xl block mb-4">🩺</span>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Assessment</h2>
          <p className="text-sm text-gray-500">Please sign in first.</p>
        </div>
      </main>
    );
  }

  if (step === "complete") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="text-center max-w-md">
          <span className="text-5xl block mb-4">✅</span>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Assessment Complete</h2>
          <p className="text-sm text-gray-600 mb-6">
            Thank you for completing the assessment. You can now start chatting with Ulayaw.
          </p>
          <a
            href="/chat"
            className="inline-block px-6 py-2.5 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600"
          >
            Start Chatting
          </a>
        </div>
      </main>
    );
  }

  if (step === "code") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <span className="text-4xl block mb-3">🔑</span>
            <h1 className="text-2xl font-bold text-gray-900">Enter Assessment Code</h1>
            <p className="text-sm text-gray-500 mt-1">
              Enter the code provided by your administrator
            </p>
          </div>

          <div className="space-y-4">
            {codeError && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{codeError}</div>
            )}
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none text-center text-lg font-mono tracking-widest"
              placeholder="XXXXXX"
              maxLength={10}
            />
            <button
              onClick={handleClaimCode}
              disabled={loading || !code.trim()}
              className="w-full py-3 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 disabled:opacity-40 transition-colors"
            >
              {loading ? "Verifying..." : "Continue"}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Assessment questions
  const questions = [
    {
      q: "Have you ever thought about or attempted to kill yourself?",
      opts: [
        { label: "Never", value: 1 },
        { label: "It was just a brief passing thought", value: 2 },
        { label: "I have had a plan at least once but did not try", value: 3 },
        { label: "I have had a plan and really wanted to die", value: 4 },
        { label: "I have attempted, but did not want to die", value: 5 },
        { label: "I have attempted, and really hoped to die", value: 6 },
      ],
    },
    {
      q: "How often have you thought about killing yourself in the past year?",
      opts: [
        { label: "Never", value: 1 },
        { label: "Rarely (1 time)", value: 2 },
        { label: "Sometimes (2 times)", value: 3 },
        { label: "Often (3-4 times)", value: 4 },
        { label: "Very Often (5+)", value: 5 },
      ],
    },
    {
      q: "Have you ever told someone that you were going to commit suicide?",
      opts: [
        { label: "No", value: 1 },
        { label: "Yes, once, but did not want to die", value: 2 },
        { label: "Yes, once, and really wanted to die", value: 3 },
        { label: "Yes, more than once, but didn't want to", value: 4 },
        { label: "Yes, more than once, and really wanted to", value: 5 },
      ],
    },
    {
      q: "How likely is it that you will attempt suicide someday?",
      opts: [
        { label: "Never", value: 0 },
        { label: "No chance at all", value: 1 },
        { label: "Rather unlikely", value: 2 },
        { label: "Unlikely", value: 3 },
        { label: "Likely", value: 4 },
        { label: "Rather likely", value: 5 },
        { label: "Very likely", value: 6 },
      ],
    },
  ];

  const current = questions[currentQ];

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-lg w-full">
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Question {currentQ + 1} of 4</span>
            <span>{Math.round(((currentQ + 1) / 4) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-teal-500 rounded-full transition-all"
              style={{ width: `${((currentQ + 1) / 4) * 100}%` }}
            />
          </div>
        </div>

        <h2 className="text-lg font-medium text-gray-900 mb-6">{current.q}</h2>

        <div className="space-y-3">
          {current.opts.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              disabled={loading}
              className="w-full text-left px-5 py-4 bg-white rounded-xl shadow-sm hover:ring-2 hover:ring-teal-300 transition-all text-sm text-gray-700 hover:text-teal-800"
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-xs text-amber-700">
            If you are in crisis, contact the National Center for Mental Health Crisis Hotline:{" "}
            <strong>0966-351-4518</strong> or <strong>1553</strong>
          </p>
        </div>
      </div>
    </main>
  );
}
