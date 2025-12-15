export default function StatusSelector({ status, setData, editMode }) {
  const handleChange = (value) => {
    setData((prev) => ({
      ...prev,
      status: value,
    }));
  };

  return (
    <div className="mt-6">
      <h4 className="font-semibold mb-2">Status</h4>

      <div className="flex items-center gap-6">
        {/* Available */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            disabled={!editMode}
            checked={status === "available"}
            onChange={() => handleChange("available")}
            className="accent-green-600"
          />
          <span className="text-green-600 font-medium">Available</span>
        </label>

        {/* Unavailable */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            disabled={!editMode}
            checked={status === "unavailable"}
            onChange={() => handleChange("unavailable")}
            className="accent-red-600"
          />
          <span className="text-red-500 font-medium">Unavailable</span>
        </label>
      </div>
    </div>
  );
}
