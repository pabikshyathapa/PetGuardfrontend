import { LuCheck } from "react-icons/lu";

export default function StatusSelector({ status, setData, editMode }) {
  const handleChange = (value) => {
    if (!editMode) return;
    setData((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const options = [
    { 
      id: "available", 
      label: "Available", 
      activeClass: "bg-emerald-50 border-emerald-500 text-emerald-700",
      iconColor: "text-emerald-500"
    },
    { 
      id: "unavailable", 
      label: "Unavailable", 
      activeClass: "bg-rose-50 border-rose-500 text-rose-700",
      iconColor: "text-rose-500"
    },
  ];

  return (
    <div className="mt-8">
      {/* Header Section */}
      <div className="mb-4">
        {editMode && (
          <p className="text-[12px] text-gray-500 mt-0.5">
            Select the status of your shelter facility.
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {options.map((opt) => {
          const isActive = status === opt.id;
          
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleChange(opt.id)}
              disabled={!editMode}
              className={`
                flex items-center gap-2.5 px-2 py-2 rounded-full border-2 transition-all duration-200
                ${!editMode ? "cursor-default" : "cursor-pointer active:scale-95"}
                ${
                  isActive
                    ? `${opt.activeClass} shadow-sm`
                    : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
                }
              `}
            >
              <span className={isActive ? opt.iconColor : "text-gray-300"}>
                {opt.icon}
              </span>
              
              <span className="text-sm font-bold">{opt.label}</span>

              {isActive && (
                <LuCheck size={14} strokeWidth={4} className="ml-1 opacity-70" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}