"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { api } from "@/lib/api";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { QuickReplies } from "./QuickReplies";
import { MoodSelector } from "./MoodSelector";
import { AssessmentQuestion } from "./AssessmentQuestion";
import { CompanionForm } from "./CompanionForm";
import { UTSSelector } from "./UTSSelector";
import { EmotionRateSlider } from "./EmotionRateSlider";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  text_tl?: string;
  timestamp: string;
}

interface BotResponse {
  messages: { text: string; text_tl?: string; delay?: number }[];
  quickReplies?: { label: string; label_tl?: string; value: string }[];
  component?: { type: string; [key: string]: any };
  nextState?: string;
}

export function ChatContainer() {
  const { session } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentState, setCurrentState] = useState<string>("welcome");
  const [quickReplies, setQuickReplies] = useState<BotResponse["quickReplies"]>([]);
  const [activeComponent, setActiveComponent] = useState<BotResponse["component"] | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<"en" | "tl">("tl");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Start or resume session
  useEffect(() => {
    const initSession = async () => {
      if (!session?.access_token) return;
      const token = session.access_token;

      try {
        // Try to resume active session
        const { session: activeSession } = await api.chat.getActiveSession(token);
        if (activeSession) {
          setSessionId(activeSession.id);
          setCurrentState(activeSession.state);
          // Load existing messages
          const { messages: existingMessages } = await api.chat.getMessages(token, activeSession.id);
          setMessages(
            existingMessages.map((m: any) => ({
              id: m.id,
              sender: m.sender,
              text: m.message,
              text_tl: m.message_tl,
              timestamp: m.created_at,
            }))
          );
          return;
        }
      } catch {
        // No active session, create new
      }

      try {
        const { session: newSession, response } = await api.chat.startSession(token, language);
        setSessionId(newSession.id);
        setCurrentState(newSession.state);
        handleBotResponse(response);
      } catch (err) {
        console.error("Failed to start session:", err);
      }
    };

    initSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.access_token]);

  const handleBotResponse = (response: BotResponse) => {
    setQuickReplies([]);
    setActiveComponent(null);

    // Add bot messages with typing delay
    response.messages.forEach((msg, i) => {
      const delay = msg.delay || i * 800;
      if (i > 0) setIsTyping(true);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}-${i}`,
            sender: "bot",
            text: msg.text,
            text_tl: msg.text_tl,
            timestamp: new Date().toISOString(),
          },
        ]);
        if (i === response.messages.length - 1) {
          setIsTyping(false);
          // Show quick replies and components after all messages
          if (response.quickReplies?.length) {
            setQuickReplies(response.quickReplies);
          }
          if (response.component) {
            setActiveComponent(response.component);
          }
        }
      }, delay);
    });

    if (response.messages.length === 0) {
      if (response.quickReplies?.length) setQuickReplies(response.quickReplies);
      if (response.component) setActiveComponent(response.component);
    }
  };

  const sendMessage = async (text: string) => {
    if (!sessionId || !session?.access_token) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: "user",
        text,
        timestamp: new Date().toISOString(),
      },
    ]);

    setQuickReplies([]);
    setActiveComponent(null);
    setIsTyping(true);

    try {
      const { response, session: updatedSession } = await api.chat.sendMessage(
        session.access_token,
        sessionId,
        text
      );
      setCurrentState(updatedSession.state);
      handleBotResponse(response);
    } catch (err) {
      console.error("Send message failed:", err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
          text_tl: "Paumanhin, may nangyaring mali. Pakisubukan ulit.",
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  };

  const handleQuickReply = (value: string) => {
    sendMessage(value);
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">U</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Ulayaw</h2>
            <p className="text-xs text-gray-500">Mental Health Companion</p>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              language === "en" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("tl")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              language === "tl" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            TL
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            sender={msg.sender}
            text={language === "tl" && msg.text_tl ? msg.text_tl : msg.text}
            timestamp={msg.timestamp}
          />
        ))}

        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">U</span>
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {/* Active Component */}
        {activeComponent && (
          <div className="py-2">
            {activeComponent.type === "mood_selector" && (
              <MoodSelector onSelect={(mood) => sendMessage(mood)} />
            )}
            {activeComponent.type === "multiple_choice" && (
              <AssessmentQuestion
                questionIndex={activeComponent.questionIndex ?? 0}
                language={language}
                onAnswer={(value) => sendMessage(String(value))}
              />
            )}
            {activeComponent.type === "companion_form" && (
              <CompanionForm onSubmit={(data) => sendMessage(JSON.stringify(data))} />
            )}
            {activeComponent.type === "uts_selector" && (
              <UTSSelector onSelect={(selected) => sendMessage(selected.join(","))} />
            )}
            {activeComponent.type === "emotion_rate_slider" && (
              <EmotionRateSlider
                emotion={activeComponent.emotion ?? ""}
                onRate={(rate) => sendMessage(String(rate))}
                language={language}
              />
            )}
            {activeComponent.type === "text_input" && (
              <ChatInput
                onSend={sendMessage}
                placeholder={activeComponent.placeholder}
                multiline
              />
            )}
          </div>
        )}

        {/* Quick Replies */}
        {quickReplies && quickReplies.length > 0 && (
          <QuickReplies
            replies={quickReplies}
            language={language}
            onSelect={handleQuickReply}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area (always visible for free text) */}
      {!activeComponent?.type || activeComponent.type !== "text_input" ? (
        <div className="border-t border-gray-100 p-4">
          <ChatInput onSend={sendMessage} />
        </div>
      ) : null}
    </div>
  );
}
