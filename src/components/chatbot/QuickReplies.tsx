interface QuickRepliesProps {
  replies: { label: string; label_tl?: string; value: string }[];
  language: "en" | "tl";
  onSelect: (value: string) => void;
}

export function QuickReplies({ replies, language, onSelect }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2 pl-11">
      {replies.map((reply) => (
        <button
          key={reply.value}
          onClick={() => onSelect(reply.value)}
          className="px-4 py-2 text-sm font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-full hover:bg-teal-100 hover:border-teal-300 transition-colors"
        >
          {language === "tl" && reply.label_tl ? reply.label_tl : reply.label}
        </button>
      ))}
    </div>
  );
}
