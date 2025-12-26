import React, { useEffect, useState } from "react";
import { notificationService } from "../../services/Shelter/notifiservice";
import ShelterSidebar from "../../components/Shelter/shelterSidebar";

export default function ShelterNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await notificationService.getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      // Update UI locally
      setNotifications(prev => 
        prev.map(n => n._id === id ? { ...n, read: true } : n)
      );
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar remains fixed on the left */}
      <ShelterSidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-950 mb-8 border-b pb-4">
            Shelter Notifications
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="bg-white p-16 rounded-2xl text-center shadow-sm border border-dashed border-gray-300">
              <span className="text-5xl mb-4 block">🐾</span>
              <p className="text-gray-500 text-lg">No reviews or notifications yet!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((n) => (
                <div
                  key={n._id}
                  onClick={() => !n.read && handleMarkRead(n._id)}
                  className={`group p-6 rounded-2xl border-l-8 transition-all duration-300 shadow-sm ${
                    !n.read
                      ? "bg-white border-blue-600 cursor-pointer hover:shadow-md hover:translate-x-1"
                      : "bg-gray-50 border-gray-200 opacity-80"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className={`text-lg leading-snug ${!n.read ? "text-blue-950 font-semibold" : "text-gray-600"}`}>
                        {n.message}
                      </p>
                      <div className="flex items-center mt-4 space-x-4">
                        <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
                          {new Date(n.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
                          {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    {!n.read && (
                      <span className="flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}