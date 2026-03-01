interface ChatMessageProps {
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

export function ChatMessage({ sender, text, timestamp }: ChatMessageProps) {
  const isBot = sender === "bot";
  const time = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex items-start gap-3 ${isBot ? "" : "flex-row-reverse"}`}>
      {isBot && (
        <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-bold">U</span>
        </div>
      )}

      <div className={`max-w-[80%] ${isBot ? "" : "text-right"}`}>
        <div
          className={`inline-block px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
            isBot
              ? "bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none"
              : "bg-teal-600 text-white rounded-2xl rounded-tr-none"
          }`}
        >
          {text}
        </div>
        <p className="text-xs text-gray-400 mt-1 px-1">{time}</p>
      </div>
    </div>
  );
}
