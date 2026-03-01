"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { api } from "@/lib/api";

interface UserDetail {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
  location?: { lat: number; lng: number } | null;
}

interface ChatMessage {
  id: string;
  role: "bot" | "user";
  content: string;
  created_at: string;
}

interface ThoughtDiaryEntry {
  id: string;
  situation: string;
  hot_thought: string;
  emotion: string;
  created_at: string;
}

type Tab = "chat" | "diary" | "assessment";

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  const { profile, session, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [user, setUser] = useState<UserDetail | null>(null);
  const [tab, setTab] = useState<Tab>("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [diaries, setDiaries] = useState<ThoughtDiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && profile?.role !== "admin") {
      router.push("/");
    }
  }, [authLoading, profile, router]);

  useEffect(() => {
    if (profile?.role === "admin" && userId && session?.access_token) {
      loadUser();
    }
  }, [profile, userId, session]);

  useEffect(() => {
    if (profile?.role === "admin" && userId && session?.access_token) {
      if (tab === "chat") loadChat();
      else if (tab === "diary") loadDiary();
    }
  }, [tab, profile, userId, session]);

  const loadUser = async () => {
    try {
      const data = await api.admin.getUser(session!.access_token, userId);
      setUser(data as UserDetail);
    } catch (err) {
      console.error("Failed to load user:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadChat = async () => {
    try {
      const data = await api.admin.getUserChat(session!.access_token, userId);
      setMessages(data.messages);
    } catch (err) {
      console.error(err);
    }
  };

  const loadDiary = async () => {
    try {
      const data = await api.admin.getUserThoughtDiary(session!.access_token, userId);
      setDiaries(data.thought_diaries as ThoughtDiaryEntry[]);
    } catch (err) {
      console.error(err);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Back */}
        <button
          onClick={() => router.push("/admin")}
          className="text-sm text-gray-500 hover:text-gray-700 mb-6 flex items-center gap-1"
        >
          ← Back to Dashboard
        </button>

        {/* User Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{user.full_name || "Unknown"}</h1>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                user.role === "admin" ? "bg-purple-50 text-purple-600" : "bg-teal-50 text-teal-600"
              }`}
            >
              {user.role}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Joined {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6">
          {(["chat", "diary", "assessment"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
                tab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t === "diary" ? "Thought Diary" : t}
            </button>
          ))}
        </div>

        {/* Chat Tab */}
        {tab === "chat" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            {messages.length === 0 ? (
              <p className="text-center text-gray-400 py-8">No chat messages</p>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                        msg.role === "user"
                          ? "bg-teal-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {msg.content}
                      <p className="text-[10px] opacity-60 mt-1">
                        {new Date(msg.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Diary Tab */}
        {tab === "diary" && (
          <div className="space-y-4">
            {diaries.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">
                No thought diary entries
              </div>
            ) : (
              diaries.map((entry) => (
                <div key={entry.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs text-gray-400">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </span>
                    {entry.emotion && (
                      <span className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full">
                        {entry.emotion}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Situation</h3>
                  <p className="text-sm text-gray-600 mb-3">{entry.situation}</p>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Hot Thought</h3>
                  <p className="text-sm text-gray-600">{entry.hot_thought}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Assessment Tab */}
        {tab === "assessment" && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">
            Assessment details will load from the API
          </div>
        )}
      </div>
    </main>
  );
}
