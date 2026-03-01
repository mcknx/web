"use client";

import { useState } from "react";

interface EmotionRateSliderProps {
  emotion: string;
  onRate: (value: number) => void;
  language?: "en" | "tl";
}

export function EmotionRateSlider({
  emotion,
  onRate,
  language = "en",
}: EmotionRateSliderProps) {
  const [value, setValue] = useState(50);
  const isTl = language === "tl";

  const getLabel = (v: number) => {
    if (v <= 20) return isTl ? "Bahagya" : "Minimal";
    if (v <= 40) return isTl ? "Kaunti" : "Mild";
    if (v <= 60) return isTl ? "Katamtaman" : "Moderate";
    if (v <= 80) return isTl ? "Matindi" : "Strong";
    return isTl ? "Sobrang Matindi" : "Extreme";
  };

  const getColor = (v: number) => {
    if (v <= 20) return "text-green-500";
    if (v <= 40) return "text-lime-500";
    if (v <= 60) return "text-yellow-500";
    if (v <= 80) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="pl-11">
      <div className="bg-gray-50 rounded-xl p-4 space-y-4">
        <p className="text-sm text-gray-700">
          {isTl
            ? `Gaano katindi ang iyong nararamdamang "${emotion}"?`
            : `How intensely do you feel "${emotion}"?`}
        </p>

        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className={`text-3xl font-bold ${getColor(value)}`}>{value}%</span>
            <span className={`text-sm font-medium ${getColor(value)}`}>{getLabel(value)}</span>
          </div>

          <input
            type="range"
            min={1}
            max={100}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-green-300 via-yellow-300 to-red-400 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-teal-400"
          />

          <div className="flex justify-between text-[10px] text-gray-400">
            <span>1%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        <button
          onClick={() => onRate(value)}
          className="w-full py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors"
        >
          {isTl ? "Kumpirmahin" : "Confirm"}
        </button>
      </div>
    </div>
  );
}
