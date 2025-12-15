export default function ShelterSidebar() {
return (
<aside className="w-64 bg-blue-900 text-white p-5">
<h2 className="text-xl font-bold mb-6">Shelters Panel</h2>
<ul className="space-y-4">
<li className="font-semibold">Profile</li>
<li>Requests</li>
<li>Notifications</li>
<li>Settings</li>
</ul>
<button className="mt-10 bg-white text-blue-900 px-4 py-2 rounded">
Logout
</button>
</aside>
);
}