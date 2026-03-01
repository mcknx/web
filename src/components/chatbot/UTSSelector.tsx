"use client";

import { useState } from "react";

// UTS (Unhelpful Thinking Styles) data
const UTS_TYPES = [
  {
    id: "mental_filtering",
    name: "Mental Filtering",
    name_tl: "Mental na Pagsala",
    description: "Focusing only on the negative aspects while ignoring positives",
    description_tl: "Pagtuon lamang sa mga negatibong aspeto habang binabalewala ang mga positibo",
    emoji: "🔍",
  },
  {
    id: "jumping_to_conclusions",
    name: "Jumping to Conclusions",
    name_tl: "Pagtalon sa Konklusyon",
    description: "Making negative interpretations without evidence",
    description_tl: "Paggawa ng negatibong interpretasyon nang walang ebidensya",
    emoji: "🦘",
  },
  {
    id: "personalization",
    name: "Personalization",
    name_tl: "Personalisasyon",
    description: "Blaming yourself for events outside your control",
    description_tl: "Sinisisi ang sarili sa mga pangyayaring wala sa iyong kontrol",
    emoji: "👉",
  },
  {
    id: "black_and_white",
    name: "Black & White Thinking",
    name_tl: "Itim at Puting Pag-iisip",
    description: "Seeing things as all-or-nothing with no middle ground",
    description_tl: "Pagtingin sa mga bagay na lahat-o-wala na walang gitnang lupa",
    emoji: "⬛",
  },
  {
    id: "catastrophizing",
    name: "Catastrophizing",
    name_tl: "Pagkatakot sa Pinakamalala",
    description: "Expecting the worst possible outcome",
    description_tl: "Pag-asam ng pinakamasamang posibleng resulta",
    emoji: "🌋",
  },
  {
    id: "overgeneralizing",
    name: "Overgeneralizing",
    name_tl: "Sobrang Paglahat",
    description: "Drawing broad conclusions from a single event",
    description_tl: "Paggawa ng malawak na konklusyon mula sa isang pangyayari",
    emoji: "🌐",
  },
  {
    id: "labelling",
    name: "Labelling",
    name_tl: "Paglalabel",
    description: "Assigning global negative labels to yourself or others",
    description_tl: "Paglalagay ng pangkalahatang negatibong label sa sarili o iba",
    emoji: "🏷️",
  },
  {
    id: "should_statements",
    name: "Should Statements",
    name_tl: "Mga Pahayag na Dapat",
    description: 'Using "should/must/ought" statements that set unrealistic expectations',
    description_tl: 'Paggamit ng "dapat/kailangan" na mga pahayag na naglalabas ng hindi makatotohanang inaasahan',
    emoji: "📋",
  },
  {
    id: "emotional_reasoning",
    name: "Emotional Reasoning",
    name_tl: "Emosyonal na Pangangatwiran",
    description: "Believing something is true because you feel it strongly",
    description_tl: "Paniniwala na totoo ang isang bagay dahil malakas ang nararamdaman mo",
    emoji: "💭",
  },
  {
    id: "magnification_minimization",
    name: "Magnification / Minimization",
    name_tl: "Pagpapalaki / Pagpapaliit",
    description: "Exaggerating negatives or minimizing positives",
    description_tl: "Exaherasyong mga negatibo o pagpapaliit ng mga positibo",
    emoji: "🔎",
  },
];

interface UTSSelectorProps {
  onSelect: (selected: string[]) => void;
  language?: "en" | "tl";
}

export function UTSSelector({ onSelect, language = "en" }: UTSSelectorProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const isTl = language === "tl";

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleConfirm = () => {
    if (selected.size > 0) {
      onSelect(Array.from(selected));
    }
  };

  return (
    <div className="pl-11 space-y-3">
      <p className="text-sm text-gray-500">
        {isTl
          ? "Pumili ng isa o higit pang Unhelpful Thinking Styles:"
          : "Select one or more Unhelpful Thinking Styles:"}
      </p>

      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {UTS_TYPES.map((uts) => {
          const isSelected = selected.has(uts.id);
          return (
            <button
              key={uts.id}
              onClick={() => toggle(uts.id)}
              className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 ${
                isSelected
                  ? "bg-teal-50 ring-2 ring-teal-400"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <span className="text-xl flex-shrink-0 mt-0.5">{uts.emoji}</span>
              <div className="min-w-0">
                <p className={`text-sm font-medium ${isSelected ? "text-teal-700" : "text-gray-700"}`}>
                  {isTl ? uts.name_tl : uts.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {isTl ? uts.description_tl : uts.description}
                </p>
              </div>
              <div className="flex-shrink-0 ml-auto">
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                    isSelected
                      ? "bg-teal-500 border-teal-500 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleConfirm}
        disabled={selected.size === 0}
        className="w-full py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {isTl ? `Kumpirmahin (${selected.size})` : `Confirm (${selected.size})`}
      </button>
    </div>
  );
}
