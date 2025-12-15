export default function ServicesSelector({ services = [], setData, editMode }) {
const toggle = (service) => {
setData((prev) => ({
...prev,
services: prev.services.includes(service)
? prev.services.filter((s) => s !== service)
: [...prev.services, service],
}));
};


return (
<div className="mt-4">
<h4 className="font-semibold">Services</h4>
{["Boarding", "Daycare"].map((s) => (
<label key={s} className="block">
<input
type="checkbox"
disabled={!editMode}
checked={services?.includes(s)}
onChange={() => toggle(s)}
/>
{s}
</label>
))}
</div>
);
}