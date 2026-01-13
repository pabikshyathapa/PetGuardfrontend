import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Home, History, ArrowRight, ShieldCheck } from "lucide-react";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref");
  
  // Real-time countdown state
  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    // Actual countdown logic
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Redirect logic
    const redirect = setTimeout(() => {
      navigate("/bookinghistory");
    }, 20000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F1EE] p-4 overflow-hidden relative">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/5 p-10 text-center border border-white relative z-10">
        
        {/* Animated Success Icon Container */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto animate-bounce shadow-inner">
            <CheckCircle2 size={48} className="text-emerald-500" />
          </div>
          {/* Subtle ring animation */}
          <div className="absolute inset-0 w-24 h-24 border-4 border-emerald-200 rounded-full mx-auto animate-ping opacity-20" />
        </div>

        {/* Success Message */}
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Sweet!
          </h1>
          <h2 className="text-xl font-bold text-emerald-600">
            Payment Successful
          </h2>
          <p className="text-slate-500 font-medium px-4">
            Your pet's stay has been confirmed. 
          </p>
        </div>

        {/* Transaction Card */}
        {ref && (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-8 flex items-center justify-between group">
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Reference ID
              </p>
              <p className="font-mono text-sm font-bold text-slate-700">{ref}</p>
            </div>
            <ShieldCheck className="text-emerald-400 group-hover:scale-110 transition-transform" size={24} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/bookinghistory")}
            className="w-full flex items-center justify-center gap-3 bg-[#183D8B] text-white py-4 rounded-2xl font-bold hover:bg-[#112d66] transition-all hover:shadow-xl hover:shadow-blue-900/20 active:scale-95"
          >
            <History size={20} />
            View Booking History
            <ArrowRight size={18} className="opacity-50" />
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
          >
            <Home size={20} />
            Back to Home
          </button>
        </div>

        {/* Progress Countdown Bar */}
        <div className="mt-10 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-tighter mb-2">
            <span>Automatic Redirect</span>
            <span>{countdown}s</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#183D8B] transition-all duration-1000 ease-linear"
              style={{ width: `${(countdown / 20) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}