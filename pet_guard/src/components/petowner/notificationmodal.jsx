// import React, { useEffect, useState } from "react";
// import { notificationService } from "../../services/Shelter/notifiservice";

// export default function PetOwnerNotificationModal({ isOpen, onClose }) {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadData = async () => {
//     try {
//       const data = await notificationService.getNotifications();
//       setNotifications(
//         data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       );
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isOpen) {
//       setLoading(true);
//       loadData();
//     }
//   }, [isOpen]);

//   const handleMarkRead = async (id) => {
//     try {
//       await notificationService.markAsRead(id);
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === id ? { ...n, read: true } : n))
//       );
//     } catch (err) {
//       console.error("Update failed", err);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity"
//         onClick={onClose}
//       ></div>

//       {/* Modal */}
//       <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
//         <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden pointer-events-auto">
//           {/* Header */}
//           <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
//             <div>
//               <h2 className="text-3xl font-extrabold text-blue-950 tracking-tight">
//                 Notifications
//               </h2>
//               <p className="text-gray-500 mt-1">
//                 Stay updated with your bookings and activities
//               </p>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
//                 {notifications.filter((n) => !n.read).length} New
//               </div>
//               <button
//                 onClick={onClose}
//                 className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-8">
//             {loading ? (
//               <div className="flex flex-col justify-center items-center h-64 space-y-4">
//                 <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600"></div>
//                 <p className="text-blue-900 font-medium animate-pulse">
//                   Fetching your updates...
//                 </p>
//               </div>
//             ) : notifications.length === 0 ? (
//               <div className="bg-gray-50 p-16 rounded-3xl text-center border border-gray-100 flex flex-col items-center">
//                 <div className="bg-white p-6 rounded-full mb-6">
//                   <span className="text-6xl block">🔔</span>
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-800">
//                   All caught up!
//                 </h3>
//                 <p className="text-gray-500 text-lg mt-2">
//                   No new notifications at the moment.
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {notifications.map((n) => (
//                   <div
//                     key={n._id}
//                     onClick={() => !n.read && handleMarkRead(n._id)}
//                     className={`group relative p-7 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-xl ${
//                       !n.read
//                         ? "bg-white border-l-[10px] border-blue-600 cursor-pointer transform hover:-translate-y-1"
//                         : "bg-gray-50/50 border-l-[10px] border-gray-300 opacity-90"
//                     }`}
//                   >
//                     <div className="flex justify-between items-start">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           {!n.read && (
//                             <span className="bg-blue-600 text-[10px] text-white font-bold px-2 py-0.5 rounded uppercase tracking-wider">
//                               New
//                             </span>
//                           )}
//                           <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
//                             Booking Alert
//                           </span>
//                         </div>

//                         <p
//                           className={`text-xl leading-relaxed ${
//                             !n.read
//                               ? "text-blue-950 font-bold"
//                               : "text-gray-600 font-medium"
//                           }`}
//                         >
//                           {n.message}
//                         </p>

//                         <div className="flex items-center mt-6 space-x-6 text-gray-400">
//                           <div className="flex items-center text-sm font-medium">
//                             <svg
//                               className="w-4 h-4 mr-2"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                               />
//                             </svg>
//                             {new Date(n.createdAt).toLocaleDateString(
//                               undefined,
//                               {
//                                 month: "short",
//                                 day: "numeric",
//                                 year: "numeric",
//                               }
//                             )}
//                           </div>
//                           <div className="flex items-center text-sm font-medium">
//                             <svg
//                               className="w-4 h-4 mr-2"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                               />
//                             </svg>
//                             {new Date(n.createdAt).toLocaleTimeString([], {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </div>
//                         </div>
//                       </div>

//                       {!n.read && (
//                         <div className="flex h-4 w-4">
//                           <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-blue-400 opacity-75"></span>
//                           <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600 shadow-sm shadow-blue-200"></span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import { notificationService } from "../../services/Shelter/notifiservice";

export default function PetOwnerNotificationModal({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await notificationService.getNotifications();
      setNotifications(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      loadData();
    }
  }, [isOpen]);

  const handleMarkRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  /* ✅ NEW: Mark all as read */
  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true }))
      );
    } catch (err) {
      console.error("Mark all failed", err);
    }
  };

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden pointer-events-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-blue-950 tracking-tight">
                Notifications
              </h2>
              <p className="text-gray-500 mt-1">
                Stay updated with your bookings and activities
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
                {unreadCount} New
              </div>

              {/* ✅ Mark all as read */}
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                >
                  Mark all as read
                </button>
              )}

              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-8">
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64 space-y-4">
                <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600"></div>
                <p className="text-blue-900 font-medium animate-pulse">
                  Fetching your updates...
                </p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="bg-gray-50 p-16 rounded-3xl text-center border border-gray-100 flex flex-col items-center">
                <div className="bg-white p-6 rounded-full mb-6">
                  <span className="text-6xl block">🔔</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  All caught up!
                </h3>
                <p className="text-gray-500 text-lg mt-2">
                  No new notifications at the moment.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {notifications.map((n) => (
                  <div
                    key={n._id}
                    onClick={() => !n.read && handleMarkRead(n._id)}
                    className={`group relative p-7 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-xl ${
                      !n.read
                        ? "bg-white border-l-[10px] border-blue-600 cursor-pointer transform hover:-translate-y-1"
                        : "bg-gray-50/50 border-l-[10px] border-gray-300 opacity-90"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {!n.read && (
                            <span className="bg-blue-600 text-[10px] text-white font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                              New
                            </span>
                          )}
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Booking Alert
                          </span>
                        </div>

                        <p
                          className={`text-xl leading-relaxed ${
                            !n.read
                              ? "text-blue-950 font-bold"
                              : "text-gray-600 font-medium"
                          }`}
                        >
                          {n.message}
                        </p>

                        <div className="flex items-center mt-6 space-x-6 text-gray-400">
                          <div className="flex items-center text-sm font-medium">
                            {new Date(n.createdAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                          <div className="flex items-center text-sm font-medium">
                            {new Date(n.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>

                      {!n.read && (
                        <div className="flex h-4 w-4">
                          <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600 shadow-sm shadow-blue-200"></span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
