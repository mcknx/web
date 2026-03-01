"use client";

import { useState } from "react";

interface CompanionFormProps {
  onSubmit: (data: { first_name: string; last_name: string; contact_no: string }) => void;
  language?: "en" | "tl";
}

export function CompanionForm({ onSubmit, language = "en" }: CompanionFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isTl = language === "tl";

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.first_name = isTl ? "Kinakailangan" : "Required";
    if (!lastName.trim()) errs.last_name = isTl ? "Kinakailangan" : "Required";
    if (!contactNo.trim()) errs.contact_no = isTl ? "Kinakailangan" : "Required";
    else if (!/^[\d+\-() ]{7,15}$/.test(contactNo.trim()))
      errs.contact_no = isTl ? "Di-wastong numero" : "Invalid number";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        contact_no: contactNo.trim(),
      });
    }
  };

  return (
    <div className="pl-11">
      <form onSubmit={handleSubmit} className="space-y-3 bg-gray-50 rounded-xl p-4">
        <p className="text-sm font-medium text-gray-700 mb-2">
          {isTl
            ? "Paki-provide ang impormasyon ng iyong companion:"
            : "Please provide your companion's information:"}
        </p>

        <div>
          <label className="block text-xs text-gray-500 mb-1">
            {isTl ? "Pangalan" : "First Name"}
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition-all"
            placeholder={isTl ? "Juan" : "Juan"}
          />
          {errors.first_name && (
            <p className="text-xs text-red-500 mt-1">{errors.first_name}</p>
          )}
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">
            {isTl ? "Apelyido" : "Last Name"}
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition-all"
            placeholder={isTl ? "Dela Cruz" : "Dela Cruz"}
          />
          {errors.last_name && (
            <p className="text-xs text-red-500 mt-1">{errors.last_name}</p>
          )}
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">
            {isTl ? "Numero ng Telepono" : "Contact Number"}
          </label>
          <input
            type="tel"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition-all"
            placeholder="+63 912 345 6789"
          />
          {errors.contact_no && (
            <p className="text-xs text-red-500 mt-1">{errors.contact_no}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors"
        >
          {isTl ? "Isumite" : "Submit"}
        </button>
      </form>
    </div>
  );
}
