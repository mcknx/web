"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { api } from "@/lib/api";

export default function GenerateCodesPage() {
  const { profile, session, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [count, setCount] = useState(10);
  const [codes, setCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  if (!authLoading && profile?.role !== "admin") {
    router.push("/");
    return null;
  }

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await api.admin.generateCodes(session!.access_token, count);
      setCodes(data.codes || []);
    } catch (err) {
      console.error(err);
      alert("Failed to generate codes");
    } finally {
      setLoading(false);
    }
  };

  const copyAll = () => {
    navigator.clipboard.writeText(codes.join("\n"));
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <button
          onClick={() => router.push("/admin")}
          className="text-sm text-gray-500 hover:text-gray-700 mb-6 flex items-center gap-1"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Generate Assessment Codes</h1>
        <p className="text-sm text-gray-500 mb-8">
          Create one-time assessment codes for new users to claim and begin their SBQR assessment.
        </p>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of codes
              </label>
              <input
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none text-sm"
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="px-6 py-2.5 bg-teal-500 text-white text-sm font-medium rounded-xl hover:bg-teal-600 disabled:opacity-50 transition-colors"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>

        {codes.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Generated Codes ({codes.length})</h3>
              <button
                onClick={copyAll}
                className="text-sm text-teal-600 hover:text-teal-800 font-medium"
              >
                Copy All
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {codes.map((code) => (
                <div
                  key={code}
                  className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 font-mono text-center"
                >
                  {code}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
