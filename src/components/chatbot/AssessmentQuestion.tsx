"use client";

const SBQR_QUESTIONS = [
  {
    id: 1,
    question: "Have you ever thought about or attempted to kill yourself?",
    question_tl: "Naisip mo na ba o sinubukan mong patayin ang iyong sarili?",
    options: [
      { label: "Never", label_tl: "Hindi kailanman", value: 1 },
      { label: "It was just a brief passing thought", label_tl: "Isang mabilis na naisip lang", value: 2 },
      { label: "I have had a plan at least once to kill myself but did not try", label_tl: "Nagkaroon ako ng plano kahit isang beses na patayin ang sarili ko pero hindi ko sinubukan", value: 3 },
      { label: "I have had a plan at least once and really wanted to die", label_tl: "Nagkaroon ako ng plano kahit isang beses at talagang gusto kong mamatay", value: 4 },
      { label: "I have attempted to kill myself, but did not want to die", label_tl: "Sinubukan kong patayin ang sarili ko, pero ayaw kong mamatay", value: 5 },
      { label: "I have attempted to kill myself, and really hoped to die", label_tl: "Sinubukan kong patayin ang sarili ko, at talagang umaasa akong mamatay", value: 6 },
    ],
  },
  {
    id: 2,
    question: "How often have you thought about killing yourself in the past year?",
    question_tl: "Gaano kadalas mong naisip na patayin ang iyong sarili sa nakaraang taon?",
    options: [
      { label: "Never", label_tl: "Hindi kailanman", value: 1 },
      { label: "Rarely (1 time)", label_tl: "Bihira (1 beses)", value: 2 },
      { label: "Sometimes (2 times)", label_tl: "Minsan (2 beses)", value: 3 },
      { label: "Often (3-4 times)", label_tl: "Madalas (3-4 na beses)", value: 4 },
      { label: "Very Often (5 or more times)", label_tl: "Napakadalas (5 o higit pang beses)", value: 5 },
    ],
  },
  {
    id: 3,
    question: "Have you ever told someone that you were going to commit suicide, or that you might do it?",
    question_tl: "Sinabi mo na ba sa sinuman na magpapakamatay ka, o maaari mong gawin ito?",
    options: [
      { label: "No", label_tl: "Hindi", value: 1 },
      { label: "Yes, at one time, but did not really want to die", label_tl: "Oo, isang beses, ngunit ayaw ko talagang mamatay", value: 2 },
      { label: "Yes, at one time, and really wanted to die", label_tl: "Oo, isang beses, at talaga akong gustong mamatay", value: 3 },
      { label: "Yes, more than once, but did not really want to do it", label_tl: "Oo, higit sa isang beses, ngunit hindi ko talaga gustong gawin", value: 4 },
      { label: "Yes, more than once, and really wanted to do it", label_tl: "Oo, higit sa isang beses, at talagang gusto kong gawin", value: 5 },
    ],
  },
  {
    id: 4,
    question: "How likely is it that you will attempt suicide someday?",
    question_tl: "Gaano mo kalamang na subukan ang pagpapakamatay balang araw?",
    options: [
      { label: "Never", label_tl: "Hindi kailanman", value: 0 },
      { label: "No chance at all", label_tl: "Walang pagkakataon", value: 1 },
      { label: "Rather unlikely", label_tl: "Medyo hindi malamang", value: 2 },
      { label: "Unlikely", label_tl: "Hindi malamang", value: 3 },
      { label: "Likely", label_tl: "Malamang", value: 4 },
      { label: "Rather likely", label_tl: "Medyo malamang", value: 5 },
      { label: "Very likely", label_tl: "Lubos na malamang", value: 6 },
    ],
  },
];

interface AssessmentQuestionProps {
  questionIndex: number;
  onAnswer: (value: number) => void;
  language?: "en" | "tl";
}

export function AssessmentQuestion({
  questionIndex,
  onAnswer,
  language = "en",
}: AssessmentQuestionProps) {
  const question = SBQR_QUESTIONS[questionIndex];
  if (!question) return null;

  const isTl = language === "tl";

  return (
    <div className="pl-11 space-y-3">
      <p className="text-sm font-medium text-gray-700">
        {isTl ? question.question_tl : question.question}
      </p>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.value)}
            className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-teal-50 hover:ring-2 hover:ring-teal-300 transition-all text-sm text-gray-700 hover:text-teal-800"
          >
            {isTl ? option.label_tl : option.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400 text-center">
        Question {questionIndex + 1} of {SBQR_QUESTIONS.length}
      </p>
    </div>
  );
}
