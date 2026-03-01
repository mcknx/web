"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { api } from "@/lib/api";

interface UserSummary {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
  last_chat?: string;
}

export default function AdminDashboard() {
  const { profile, session, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!authLoading && profile?.role !== "admin") {
      router.push("/");
    }
  }, [authLoading, profile, router]);

  useEffect(() => {
    if (profile?.role === "admin" && session?.access_token) {
      loadUsers();
    }
  }, [profile, session]);

  const loadUsers = async () => {
    try {
      const data = await api.admin.getUsers(session!.access_token);
      setUsers(data.users);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (authLoading || profile?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage users, view assessments, and monitor chat sessions
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/codes")}
            className="px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors"
          >
            Generate Codes
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Users", value: users.length, icon: "👥" },
            {
              label: "Active Today",
              value: users.filter(
                (u) => u.last_chat && new Date(u.last_chat).toDateString() === new Date().toDateString()
              ).length,
              icon: "💬",
            },
            { label: "Clients", value: users.filter((u) => u.role === "client").length, icon: "🧑" },
            { label: "Admins", value: users.filter((u) => u.role === "admin").length, icon: "🛡️" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{stat.icon}</span>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name or email..."
            className="w-full md:w-96 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none text-sm"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading users...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No users found</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    User
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Joined
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{user.full_name || "—"}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          user.role === "admin"
                            ? "bg-purple-50 text-purple-600"
                            : "bg-teal-50 text-teal-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => router.push(`/admin/users/${user.id}`)}
                        className="text-sm text-teal-600 hover:text-teal-800 font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
