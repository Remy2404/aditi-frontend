"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (loading) {
        return;
      }

      if (!user) {
        // Not logged in, redirect to login
        router.push("/login");
        return;
      }

      try {
        // Fetch user role from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const role = userData.role;

          if (role === "admin") {
            setUserRole(role);
            setChecking(false);
          } else {
            // Not admin, redirect to home
            router.push("/");
          }
        } else {
          // No user profile, redirect to home
          router.push("/");
        }
      } catch (error) {
        console.error("Error checking admin access:", error);
        router.push("/");
      }
    };

    checkAdminAccess();
  }, [user, loading, router]);

  // Show loading state
  if (loading || checking) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-ping mx-auto opacity-20"></div>
          </div>
          <p className="text-gray-700 font-medium mt-6">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Only render if user is admin
  if (userRole !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, <span className="font-semibold">{user?.displayName || "Admin"}</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg">
              <p className="text-sm font-medium">Role</p>
              <p className="text-lg font-bold">Administrator</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-gray-900">$0</p>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p className="text-lg text-gray-900 mt-1">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">User ID</label>
              <p className="text-lg text-gray-900 mt-1 font-mono text-sm break-all">{user?.uid}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold">
              Manage Users
            </button>
            <button className="px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold">
              View Orders
            </button>
            <button className="px-6 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
