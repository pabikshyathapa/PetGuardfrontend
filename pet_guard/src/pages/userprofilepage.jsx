import { useEffect, useState, useRef } from "react";
import { useAuth } from "../auth/AuthProvider";
import { updateUser, changePassword } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaEdit,
  FaCheck,
  FaShieldAlt,
  FaHistory,
  FaLock,
  FaPlusCircle
} from "react-icons/fa";

const Profile = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const securityRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const scrollToSecurity = () => {
    securityRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleProfileUpdate = async () => {
    try {
      const res = await updateUser(form, token);
      if (res.data.success) {
        login(res.data.data, token);
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleCancel = () => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
    setIsEditing(false);
    toast.info("Changes discarded");
  };

  const handlePasswordChange = async () => {
    if (!passwords.oldPassword || !passwords.newPassword) {
      return toast.warn("Please fill both password fields");
    }
    try {
      await changePassword(passwords, token);
      toast.success("Password changed successfully");
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F3F1EE] pt-28 pb-16 px-4">
        {/* Reverted to max-w-5xl to prevent stretching */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
          
          {/* Sidebar / Navigation Column */}
          <div className="w-full md:w-64 space-y-2 flex-shrink-0">
            <button
              className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border-2 border-[#183D8B] text-[#183D8B] font-bold shadow-sm"
            >
              <FaUser /> Profile Settings
            </button>

            {/* Added Change Password Button */}
            <button
              onClick={scrollToSecurity}
              className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/50 border-2 border-transparent text-slate-500 hover:bg-white hover:text-[#183D8B] hover:border-[#183D8B]/20 transition-all font-bold shadow-sm group"
            >
              <FaLock className="group-hover:scale-110 transition-transform" /> 
              Change Password
            </button>
            
            <button
              onClick={() => navigate("/bookinghistory")}
              className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/50 border-2 border-transparent text-slate-500 hover:bg-white hover:text-[#183D8B] hover:border-[#183D8B]/20 transition-all font-bold shadow-sm group"
            >
              <FaHistory className="group-hover:scale-110 transition-transform" /> 
              Booking History
            </button>
            <button
              onClick={() => navigate("/petprofile")}
              className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/50 border-2 border-transparent text-slate-500 hover:bg-white hover:text-[#183D8B] hover:border-[#183D8B]/20 transition-all font-bold shadow-sm group"
            >
              <FaPlusCircle className="group-hover:scale-110 transition-transform" /> 
              Add pet
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            
            {/* Section: Profile Information */}
            <div className="bg-white rounded-2xl shadow-[0_15px_35px_-5px_rgba(0,0,0,0.08)] border-2 border-white overflow-hidden">
              <div className="px-8 py-6 bg-[#183D8B] flex justify-between items-center shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
                    <FaUser className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Account Profile</h2>
                    <p className="text-blue-100/80 text-xs font-medium">Manage your personal information</p>
                  </div>
                </div>

                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-white text-[#183D8B] text-sm font-bold px-5 py-2 rounded-xl hover:shadow-xl transition-all flex items-center gap-2 active:scale-95"
                  >
                    <FaEdit size={14} /> Edit Profile
                  </button>
                ) : (
                  <div className="flex items-center gap-4">
                    <button onClick={handleCancel} className="text-black hover:text-gray-600 text-sm font-semibold transition-colors">
                      Discard
                    </button>
                    <button
                      onClick={handleProfileUpdate}
                      className="bg-emerald-500 text-white text-sm font-bold px-5 py-2 rounded-xl shadow-lg hover:bg-emerald-400 transition-all flex items-center gap-2 active:scale-95"
                    >
                      <FaCheck size={14} /> Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Full name</label>
                    <div className="relative group">
                      <FaUser className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isEditing ? "text-[#183D8B]" : "text-slate-300"}`} />
                      <input
                        disabled={!isEditing}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={`w-full pl-12 pr-4 py-3 text-sm font-medium rounded-xl border-2 transition-all outline-none ${
                          isEditing
                            ? "border-[#183D8B] bg-white shadow-[0_4px_20px_rgba(24,61,139,0.08)]"
                            : "bg-slate-50 border-slate-100 text-slate-500 cursor-not-allowed"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email address</label>
                    <div className="relative group">
                      <FaEnvelope className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isEditing ? "text-[#183D8B]" : "text-slate-300"}`} />
                      <input
                        disabled={!isEditing}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={`w-full pl-12 pr-4 py-3 text-sm font-medium rounded-xl border-2 transition-all outline-none ${
                          isEditing
                            ? "border-[#183D8B] bg-white shadow-[0_4px_20px_rgba(24,61,139,0.08)]"
                            : "bg-slate-50 border-slate-100 text-slate-500 cursor-not-allowed"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Phone number</label>
                    <div className="relative group">
                      <FaPhone className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isEditing ? "text-[#183D8B]" : "text-slate-300"}`} />
                      <input
                        disabled={!isEditing}
                        placeholder="e.g. +1 234 567 890"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={`w-full pl-12 pr-4 py-3 text-sm font-medium rounded-xl border-2 transition-all outline-none ${
                          isEditing
                            ? "border-[#183D8B] bg-white shadow-[0_4px_20px_rgba(24,61,139,0.08)]"
                            : "bg-slate-50 border-slate-100 text-slate-500 cursor-not-allowed"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Security */}
            <div ref={securityRef} className="bg-white rounded-2xl shadow-[0_15px_35px_-5px_rgba(0,0,0,0.08)] border-2 border-white overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FaShieldAlt className="text-[#183D8B] text-lg" />
                </div>
                <h3 className="text-lg font-bold text-[#183D8B] tracking-tight">Security Credentials</h3>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Current password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={passwords.oldPassword}
                        onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                        className="w-full pl-5 pr-12 py-3 text-sm font-medium rounded-xl border-2 border-slate-200 focus:border-[#183D8B] focus:shadow-[0_4_20px_rgba(24,61,139,0.08)] transition-all outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#183D8B] transition-colors"
                      >
                        {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">New password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                        className="w-full pl-5 pr-12 py-3 text-sm font-medium rounded-xl border-2 border-slate-200 focus:border-[#183D8B] focus:shadow-[0_4_20px_rgba(24,61,139,0.08)] transition-all outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#183D8B] transition-colors"
                      >
                        {showNewPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end border-t border-slate-50 pt-6">
                  <button
                    onClick={handlePasswordChange}
                    className="bg-[#183D8B] text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-800 transition-all shadow-[0_10px_20px_rgba(24,61,139,0.15)] active:scale-95"
                  >
                    Update password
                  </button>
                </div>
              </div>
            </div>

            <p className="text-center text-slate-400 text-[11px] font-medium tracking-wide">
              Your data is encrypted and stored securely.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;