"use client";

import { useState } from "react";

// Moods data inline to avoid shared package import issues in client components
const MOODS = [
  { name: "Happy", name_tl: "Masaya", emoji: "😊", category: "positive" },
  { name: "Sad", name_tl: "Malungkot", emoji: "😢", category: "negative" },
  { name: "Angry", name_tl: "Galit", emoji: "😠", category: "negative" },
  { name: "Anxious", name_tl: "Balisa", emoji: "😰", category: "negative" },
  { name: "Fearful", name_tl: "Takot", emoji: "😨", category: "negative" },
  { name: "Disgusted", name_tl: "Nasusuklam", emoji: "🤢", category: "negative" },
  { name: "Surprised", name_tl: "Nagulat", emoji: "😲", category: "neutral" },
  { name: "Ashamed", name_tl: "Nahihiya", emoji: "😳", category: "negative" },
  { name: "Guilty", name_tl: "Nagkasala", emoji: "😔", category: "negative" },
  { name: "Hurt", name_tl: "Nasaktan", emoji: "💔", category: "negative" },
  { name: "Lonely", name_tl: "Malungkot", emoji: "🥺", category: "negative" },
  { name: "Frustrated", name_tl: "Bigo", emoji: "😤", category: "negative" },
  { name: "Confused", name_tl: "Naguguluhan", emoji: "😕", category: "neutral" },
  { name: "Hopeless", name_tl: "Walang pag-asa", emoji: "😞", category: "negative" },
  { name: "Overwhelmed", name_tl: "Nababagabag", emoji: "😵", category: "negative" },
  { name: "Content", name_tl: "Kontento", emoji: "😌", category: "positive" },
  { name: "Grateful", name_tl: "Nagpapasalamat", emoji: "🙏", category: "positive" },
  { name: "Calm", name_tl: "Kalmado", emoji: "😊", category: "positive" },
  { name: "Hopeful", name_tl: "Puno ng pag-asa", emoji: "🤩", category: "positive" },
  { name: "Excited", name_tl: "Nasasabik", emoji: "🤗", category: "positive" },
];

interface MoodSelectorProps {
  onSelect: (mood: string) => void;
}

export function MoodSelector({ onSelect }: MoodSelectorProps) {
  const [page, setPage] = useState(0);
  const perPage = 8;
  const totalPages = Math.ceil(MOODS.length / perPage);
  const visible = MOODS.slice(page * perPage, (page + 1) * perPage);

  return (
    <div className="pl-11">
      <div className="grid grid-cols-4 gap-2 mb-3">
        {visible.map((mood) => (
          <button
            key={mood.name}
            onClick={() => onSelect(mood.name)}
            className="flex flex-col items-center gap-1 p-3 rounded-xl bg-gray-50 hover:bg-teal-50 hover:ring-2 hover:ring-teal-300 transition-all group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">{mood.emoji}</span>
            <span className="text-xs text-gray-600 group-hover:text-teal-700 font-medium">{mood.name}</span>
            <span className="text-[10px] text-gray-400">{mood.name_tl}</span>
          </button>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-3 py-1 text-xs text-gray-500 disabled:opacity-30 hover:text-teal-600"
          >
            Previous
          </button>
          <span className="text-xs text-gray-400">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="px-3 py-1 text-xs text-gray-500 disabled:opacity-30 hover:text-teal-600"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
