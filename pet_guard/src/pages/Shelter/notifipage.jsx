// import React, { useEffect, useState } from "react";
// import { notificationService } from "../../services/Shelter/notifiservice";
// import ShelterLayout from "../../layouts/Shelter/shelterLayout";

// export default function ShelterNotifications() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadData = async () => {
//     try {
//       const data = await notificationService.getNotifications();
//       setNotifications(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const handleMarkRead = async (id) => {
//     try {
//       await notificationService.markAsRead(id);
//       // Update UI locally
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === id ? { ...n, read: true } : n))
//       );
//     } catch (err) {
//       console.error("Update failed", err);
//     }
//   };

//   if (loading) {
//     return (
//       <ShelterLayout>
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
//         </div>
//       </ShelterLayout>
//     );
//   }

//   return (
//     <ShelterLayout>
//       <div className="max-w-4xl mx-auto p-6">
//         <h1 className="text-3xl font-bold text-blue-950 mb-8 border-b pb-4">
//           Shelter Notifications
//         </h1>

//         {notifications.length === 0 ? (
//           <div className="bg-white p-16 rounded-2xl text-center shadow-sm border border-dashed border-gray-300">
//             <span className="text-5xl mb-4 block">🐾</span>
//             <p className="text-gray-500 text-lg">No reviews or notifications yet!</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {notifications.map((n) => (
//               <div
//                 key={n._id}
//                 onClick={() => !n.read && handleMarkRead(n._id)}
//                 className={`group p-6 rounded-2xl border-l-8 transition-all duration-300 shadow-sm ${
//                   !n.read
//                     ? "bg-white border-blue-600 cursor-pointer hover:shadow-md hover:translate-x-1"
//                     : "bg-gray-50 border-gray-200 opacity-80"
//                 }`}
//               >
//                 <div className="flex justify-between items-start">
//                   <div className="flex-1">
//                     <p
//                       className={`text-lg leading-snug ${
//                         !n.read ? "text-blue-950 font-semibold" : "text-gray-600"
//                       }`}
//                     >
//                       {n.message}
//                     </p>
//                     <div className="flex items-center mt-4 space-x-4">
//                       <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
//                         {new Date(n.createdAt).toLocaleDateString()}
//                       </span>
//                       <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
//                         {new Date(n.createdAt).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                     </div>
//                   </div>

//                   {!n.read && (
//                     <span className="relative flex h-3 w-3">
//                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
//                       <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
//                     </span>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </ShelterLayout>
//   );
// }

import React, { useEffect, useState } from "react";
import { notificationService } from "../../services/Shelter/notifiservice";
import ShelterLayout from "../../layouts/Shelter/shelterLayout";

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
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (loading) {
    return (
      <ShelterLayout>
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600"></div>
          <p className="text-blue-900 font-medium animate-pulse">Fetching your updates...</p>
        </div>
      </ShelterLayout>
    );
  }

  return (
    <ShelterLayout>
      <div className="max-w-4xl mx-auto p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-950 tracking-tight">
              Notifications
            </h1>
            <p className="text-gray-500 mt-1">Stay updated with your latest shelter activity</p>
          </div>
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
            {notifications.filter(n => !n.read).length} New
          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="bg-white p-20 rounded-3xl text-center shadow-xl border border-gray-100 flex flex-col items-center">
            <div className="bg-gray-50 p-6 rounded-full mb-6">
               <span className="text-6xl block">🔔</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">All caught up!</h3>
            <p className="text-gray-500 text-lg mt-2">No new reviews or notifications at the moment.</p>
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
                            System Alert
                         </span>
                    </div>
                    
                    <p className={`text-xl leading-relaxed ${
                        !n.read ? "text-blue-950 font-bold" : "text-gray-600 font-medium"
                      }`}
                    >
                      {n.message}
                    </p>

                    <div className="flex items-center mt-6 space-x-6 text-gray-400">
                      <div className="flex items-center text-sm font-medium">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(n.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center text-sm font-medium">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {new Date(n.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
    </ShelterLayout>
  );
}