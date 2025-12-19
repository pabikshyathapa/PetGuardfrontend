import React from "react";

export default function PetCard({ pet, onSelect }) {
  return (
    <div
      onClick={() => onSelect(pet)}
      style={{
        padding: 10,
        background: "#fff",
        borderRadius: 6,
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        cursor: "pointer",
        minWidth: 150,
      }}
    >
      {pet.photo && (
        <img
          src={`http://localhost:5050/uploads/${pet.photo}`}
          alt={pet.petName}
          style={{ width: "100%", borderRadius: 6, marginBottom: 8 }}
        />
      )}
      <div style={{ fontWeight: "bold", color: "#183D8B" }}>{pet.petName}</div>
      <div style={{ fontSize: 12 }}>{pet.type}</div>
    </div>
  );
}
