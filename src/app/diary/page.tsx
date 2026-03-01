"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { api } from "@/lib/api";

interface DiaryEntry {
  id: string;
  situation: string;
  hot_thought: string;
  emotion: string;
  emotion_rating: number;
  evidence_for: string[];
  evidence_against: string[];
  alternative_thought: string;
  new_emotion_rating: number;
  uts_identified: string[];
  created_at: string;
}

export default function ThoughtDiaryPage() {
  const { user, session, isLoading: authLoading } = useAuth();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (user && session?.access_token) loadEntries();
  }, [user, session]);

  const loadEntries = async () => {
    try {
      const data = await api.thoughtDiary.getMy(session!.access_token);
      setEntries(data.thought_diaries as DiaryEntry[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user && !authLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <span className="text-5xl block mb-4">📝</span>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Thought Diary</h2>
          <p className="text-sm text-gray-500">Please sign in to view your thought diary.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Thought Diary</h1>
          <p className="text-teal-100">
            Track your thoughts, emotions, and cognitive patterns over time
          </p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-16 text-gray-400">Loading entries...</div>
          ) : entries.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-5xl block mb-4">📝</span>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No entries yet</h3>
              <p className="text-sm text-gray-500 mb-6">
                Start a chat session with Ulayaw to create your first thought diary entry.
              </p>
              <a
                href="/chat"
                className="inline-block px-6 py-2.5 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 transition-colors"
              >
                Start Chatting
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => {
                const isExpanded = expandedId === entry.id;
                return (
                  <div key={entry.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                      className="w-full p-5 text-left flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {entry.situation?.slice(0, 80) || "Untitled"}
                          {entry.situation?.length > 80 ? "..." : ""}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          {entry.emotion && (
                            <span className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full">
                              {entry.emotion}
                            </span>
                          )}
                          <span className="text-xs text-gray-400">
                            {new Date(entry.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4">
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">
                            Situation
                          </h4>
                          <p className="text-sm text-gray-700">{entry.situation}</p>
                        </div>

                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">
                            Hot Thought
                          </h4>
                          <p className="text-sm text-gray-700">{entry.hot_thought}</p>
                        </div>

                        <div className="flex gap-4">
                          <div className="flex-1">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">
                              Emotion
                            </h4>
                            <p className="text-sm text-gray-700">{entry.emotion}</p>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">
                              Rating
                            </h4>
                            <p className="text-sm text-gray-700">{entry.emotion_rating}%</p>
                          </div>
                        </div>

                        {entry.evidence_for?.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">
                              Evidence For
                            </h4>
                            <ul className="text-sm text-gray-700 list-disc list-inside">
                              {entry.evidence_for.map((e, i) => (
                                <li key={i}>{e}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {entry.evidence_against?.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">
                              Evidence Against
                            </h4>
                            <ul className="text-sm text-gray-700 list-disc list-inside">
                              {entry.evidence_against.map((e, i) => (
                                <li key={i}>{e}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {entry.alternative_thought && (
                          <div>
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">
                              Alternative Thought
                            </h4>
                            <p className="text-sm text-gray-700">{entry.alternative_thought}</p>
                          </div>
                        )}

                        {entry.uts_identified?.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">
                              UTS Identified
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {entry.uts_identified.map((uts) => (
                                <span
                                  key={uts}
                                  className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full"
                                >
                                  {uts}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
