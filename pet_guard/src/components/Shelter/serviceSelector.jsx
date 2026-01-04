// export default function ServicesSelector({ services = [], setData, editMode }) {
// const toggle = (service) => {
// setData((prev) => ({
// ...prev,
// services: prev.services.includes(service)
// ? prev.services.filter((s) => s !== service)
// : [...prev.services, service],
// }));
// };


// return (
// <div className="mt-4">
// <h4 className="font-semibold">Services</h4>
// {["Boarding", "Daycare"].map((s) => (
// <label key={s} className="block">
// <input
// type="checkbox"
// disabled={!editMode}
// checked={services?.includes(s)}
// onChange={() => toggle(s)}
// />
// {s}
// </label>
// ))}
// </div>
// );
// }

import { LuMoon, LuSun, LuCheck } from "react-icons/lu";

export default function ServicesSelector({ services = [], setData, editMode }) {
  const options = [
    { id: "Boarding", icon: <LuMoon size={16} /> },
    { id: "Daycare", icon: <LuSun size={18} /> },

  ];

  const toggle = (service) => {
    // Only allow changes if in editMode
    if (!editMode) return;
    
    setData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  return (
    <div className="mt-6">
      {/* Dynamic Header Text */}
      <div className="mb-4">
        {editMode && (
          <p className="text-xs text-gray-500 mt-1">
            Select the services offered by your shelter facility.
          </p>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3">
        {options.map((s) => {
          const isSelected = services?.includes(s.id);
          
          return (
            <button
              key={s.id}
              type="button"
              // Logic remains functional only in editMode, but styling is consistent
              onClick={() => toggle(s.id)}
              className={`
                flex items-center gap-2.5 px-5 py-2.5 rounded-full border transition-all duration-200
                ${!editMode ? "cursor-default" : "cursor-pointer active:scale-95"}
                ${isSelected 
                  ? "bg-[#183D8B] border-[#183D8B] text-white shadow-sm" 
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }
              `}
            >
              {/* Icon color changes based on selection, not editMode */}
              <span className={isSelected ? "text-white" : "text-[#183D8B]"}>
                {s.icon}
              </span>
              
              <span className="text-sm font-semibold tracking-tight">
                {s.id}
              </span>

              {/* Checkmark shows for selected items in both modes */}
              {isSelected && (
                <LuCheck size={14} strokeWidth={4} className="ml-1 animate-in zoom-in duration-300" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}