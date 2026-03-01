"use client";

import { ChatContainer } from "@/components/chatbot/ChatContainer";
import { useAuth } from "@/components/providers/AuthProvider";
import { useState } from "react";
import { LoginModal } from "@/components/ui/LoginModal";

export default function ChatPage() {
  const { user, isLoading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
          <span className="text-sm text-gray-500">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="text-5xl mb-6">💬</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Start Your Session</h1>
          <p className="text-gray-600 mb-8">
            Sign in to begin a guided conversation with Ulayaw. Your progress and thought diaries will be saved securely.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="px-8 py-4 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200"
          >
            Sign In to Chat
          </button>
        </div>
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      </>
    );
  }

  return <ChatContainer />;
}
