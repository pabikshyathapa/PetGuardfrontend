import ShelterSidebar from "../../components/Shelter/shelterSidebar";
import ShelterHeader from "../../components/Shelter/shelterHeader";


export default function ShelterLayout({ children }) {
return (
<div className="flex h-screen">
<ShelterSidebar />
<div className="flex-1 bg-gray-50">
<ShelterHeader />
<main className="p-6">{children}</main>
</div>
</div>
);
}