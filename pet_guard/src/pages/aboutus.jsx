import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Heart, CalendarCheck, CheckCircle2, ArrowRight, Zap, Star } from "lucide-react";

const AboutUs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F8FAFC] text-slate-800 font-sans selection:bg-blue-100">
      
      {/* --- COMPACT HERO --- */}
      <section className="relative w-full h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden">
        <img
          src="/images/main.png"
          alt="Pet care"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-[#183D8B]/80" />
        <div className="relative z-10 text-center px-6">
          <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-[0.2em] text-white uppercase bg-white/20 backdrop-blur-md rounded-full border border-white/30">
            Est. 2025
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Safety Meets <span className="text-blue-300">Simplicity.</span>
          </h1>
          <p className="text-blue-100 max-w-xl mx-auto text-sm md:text-lg font-medium opacity-90">
            The trusted bridge between loving pet owners and verified professional shelters.
          </p>
        </div>
      </section>

      {/* --- THE CORE STORY: Split Grid --- */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Image with Decorative Elements */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-50 rounded-full -z-10" />
            <img
              src="/images/hpshelter.jpg"
              alt="Platform"
              className="w-full aspect-square object-cover rounded-[2.5rem] shadow-2xl"
            />
            <div className="absolute bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100">
               <div className="bg-green-100 p-2 rounded-lg text-green-600"><ShieldCheck size={20}/></div>
               <div>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter"></p>
                 <p className="text-sm font-bold text-slate-800">100% Secure Care</p>
               </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h2 className="text-blue-600 font-bold text-sm uppercase tracking-widest">The Platform</h2>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900">Who We Are</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-base">
              PetGuard is an innovative management ecosystem designed to eliminate the anxiety of finding temporary care for your pets. We provide a centralized, transparent system where owners book with confidence and shelters manage with ease.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <Zap className="text-orange-500 mb-2" size={20}/>
                <h4 className="font-bold text-slate-800 text-sm">Our Mission</h4>
                <p className="text-xs text-slate-500 mt-1">To enhance pet management through verified trust and modern tech.</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <Star className="text-yellow-500 mb-2" size={20}/>
                <h4 className="font-bold text-slate-800 text-sm">Our Vision</h4>
                <p className="text-xs text-slate-500 mt-1">To become the global gold-standard digital companion for pet safety.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES: Interactive Card Look --- */}
      <section className="bg-slate-900 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-blue-400 font-bold text-sm uppercase tracking-[0.3em] mb-2">Capabilities</h2>
            <h3 className="text-3xl font-bold text-white">How We Help You</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Owner Section */}
            <div className="group bg-slate-800/50 hover:bg-slate-800 p-8 rounded-[2rem] border border-slate-700 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl"><Heart size={28}/></div>
                <img src="/images/aboutus1.jpg" alt="Pet care" className="w-16 h-16 rounded-full object-cover border-2 border-slate-600 group-hover:border-blue-500 transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">For Pet Owners</h4>
              <ul className="grid grid-cols-1 gap-3">
                {["Digital Pet Profiles", "Smart Location Filters", "Instant Secure Bookings", "Live Status Updates"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-slate-400 text-sm">
                    <CheckCircle2 size={16} className="text-blue-400" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shelter Section */}
            <div className="group bg-[#183D8B] hover:bg-[#1e4ab3] p-8 rounded-[2rem] shadow-2xl transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/10 text-white rounded-xl"><CalendarCheck size={28}/></div>
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white font-black text-xl italic group-hover:rotate-12 transition-transform">PG</div>
              </div>
              <h4 className="text-xl font-bold text-white mb-4">For Shelters</h4>
              <ul className="grid grid-cols-1 gap-3">
                {["Dynamic Pricing Control", "Inventory Management", "Automated Scheduling", "Efficiency Analytics"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-blue-100 text-sm">
                    <CheckCircle2 size={16} className="text-blue-300" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST STATS --- */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <ValueCard 
            icon={<ShieldCheck size={32}/>} 
            title="Verified Security" 
            desc="Every shelter undergoes a strict verification process for safety."
          />
          <ValueCard 
            icon={<Zap size={32}/>} 
            title="Rapid Booking" 
            desc="Book a shelter in under 2 minutes with our streamlined UI."
          />
          <ValueCard 
            icon={<Heart size={32}/>} 
            title="Care First" 
            desc="Our platform prioritizes pet comfort over administrative ease."
          />
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#183D8B] to-blue-700 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Experience the future of pet care.</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate("/")}
                className="bg-white text-[#183D8B] px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group shadow-xl"
              >
                Get Started Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

const ValueCard = ({ icon, title, desc }) => (
  <div className="group text-center space-y-4 p-4 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300">
    <div className="w-16 h-16 mx-auto bg-blue-50 text-[#183D8B] rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[#183D8B] group-hover:text-white transition-all">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

export default AboutUs;