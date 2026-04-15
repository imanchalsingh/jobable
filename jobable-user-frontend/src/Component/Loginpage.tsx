import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LogIn,
  X,
  Upload,
  User,
  Mail,
  Lock,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Building,
  Calendar,
  UserCircle,
  CheckCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const industries = [
  { value: "Technology", label: "Technology" },
  { value: "Software Engineer", label: "Software Engineer" },
  { value: "Mechanical", label: "Mechanical" },
  { value: "Electronic", label: "Electronic" },
];

export default function Loginpage() {
  const [userData, setUserData] = useState({
    image: "",
    fullName: "",
    userName: "",
    email: "",
    location: "",
    role: "",
    company: "",
    industry: "",
    experience: "",
    education: "",
    skill: "",
    about: "",
  });

  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRobotChecked, setIsRobotChecked] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string>("");
  const navigate = useNavigate();

  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        setUserData({ ...userData, image: result });
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      fullName,
      userName,
      email,
      location,
      role,
      experience,
      company,
      industry,
      education,
      skill,
    } = userData;

    if (
      !fullName ||
      !userName ||
      !email ||
      !location ||
      !role ||
      !experience ||
      !company ||
      !industry ||
      !education ||
      !skill
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!isRobotChecked) {
      toast.error("Please verify you're not a robot.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("userData", JSON.stringify(userData));
      toast.success("Welcome to Jobable! 🎉");
      setTimeout(() => {
        navigate("/job-description");
      }, 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a120b] via-[#2c1a0e] to-[#1f140c] relative overflow-hidden">
      <div className="relative flex justify-center items-center min-h-screen p-4">
        <div className="max-w-md w-full">
          {/* Main Card - refined, less flashy */}
          <div className="bg-[#241a13] rounded-2xl shadow-xl border border-[#d4a373]/20 transition-all duration-300 hover:shadow-[#d4a373]/10">
            <div className="p-6 sm:p-8">
              {/* Logo Section - more subtle */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-[#d4a373] rounded-xl mb-4 shadow-md">
                  <Sparkles className="w-7 h-7 text-[#1a120b]" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#d4a373] tracking-tight">
                  Jobable
                </h1>
                <p className="text-[#a68a6b] mt-2 text-sm sm:text-base">
                  Your gateway to dream careers
                </p>
              </div>

              {/* Welcome Text */}
              <div className="text-center mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#f0e6d8] mb-2">
                  Welcome Back
                </h2>
                <p className="text-[#a68a6b] text-sm">
                  Join thousands of professionals finding their perfect role
                </p>
              </div>

              {/* Sign In Button */}
              <button
                onClick={() => setLoginDialogOpen(true)}
                className="w-full bg-[#d4a373] hover:bg-[#c49a6c] text-[#1a120b] font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group"
              >
                <LogIn className="w-5 h-5" />
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              
              <p className="mt-8 text-center text-xs text-[#6b5a4a]">
                By signing in, you agree to our{" "}
                <a href="#" className="text-[#d4a373] hover:text-[#c49a6c] transition-colors">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#d4a373] hover:text-[#c49a6c] transition-colors">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sign In Dialog - refined design */}
      {loginDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#1e1610] rounded-2xl shadow-2xl border border-[#d4a373]/30 max-h-[90vh] overflow-hidden animate-slideUp">
            {/* Header - subtle gradient */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-[#d4a373] to-[#b88b5f] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#1a120b]" />
                  <h2 className="text-lg font-semibold text-[#1a120b]">Create Account</h2>
                </div>
                <button
                  onClick={() => setLoginDialogOpen(false)}
                  className="p-1 hover:bg-black/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#1a120b]" />
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="overflow-y-auto p-6 space-y-6 max-h-[calc(90vh-80px)] custom-scrollbar">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Photo */}
                <div className="text-center">
                  <h3 className="text-[#f0e6d8] font-medium mb-3 text-sm">Profile Photo</h3>
                  <div
                    onClick={handleImageClick}
                    className="inline-block cursor-pointer group"
                  >
                    <div className="relative">
                      {image ? (
                        <img
                          className="w-24 h-24 rounded-full object-cover border-2 border-[#d4a373] group-hover:border-[#c49a6c] transition-all duration-300"
                          src={image}
                          alt="Profile"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-[#2c221b] flex items-center justify-center border-2 border-[#d4a373] group-hover:border-[#c49a6c] transition-all duration-300">
                          <UserCircle className="w-12 h-12 text-[#a68a6b]" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Upload className="w-5 h-5 text-[#d4a373]" />
                      </div>
                    </div>
                    <input
                      type="file"
                      ref={inputRef}
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-3">
                  <h3 className="text-[#d4a373] font-medium flex items-center gap-2 text-sm uppercase tracking-wide">
                    <User className="w-4 h-4" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={userData.fullName}
                      onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                      className="px-4 py-2.5 bg-[#2c221b] border border-[#3a2d24] rounded-lg focus:outline-none focus:border-[#d4a373] text-[#f0e6d8] placeholder-[#6b5a4a] text-sm transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Username *"
                      value={userData.userName}
                      onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
                      className="px-4 py-2.5 bg-[#2c221b] border border-[#3a2d24] rounded-lg focus:outline-none focus:border-[#d4a373] text-[#f0e6d8] placeholder-[#6b5a4a] text-sm transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b5a4a]" />
                      <input
                        type="email"
                        placeholder="Email *"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#2c221b] border border-[#3a2d24] rounded-lg focus:outline-none focus:border-[#d4a373] text-[#f0e6d8] placeholder-[#6b5a4a] text-sm transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b5a4a]" />
                      <input
                        type="password"
                        placeholder="Password *"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#2c221b] border border-[#3a2d24] rounded-lg focus:outline-none focus:border-[#d4a373] text-[#f0e6d8] placeholder-[#6b5a4a] text-sm transition-colors"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b5a4a]" />
                    <input
                      type="text"
                      placeholder="Location *"
                      value={userData.location}
                      onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#2c221b] border border-[#3a2d24] rounded-lg focus:outline-none focus:border-[#d4a373] text-[#f0e6d8] placeholder-[#6b5a4a] text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-3">
                  <h3 className="text-[#d4a373] font-medium flex items-center gap-2 text-sm uppercase tracking-wide">
                    <Briefcase className="w-4 h-4" />
                    Professional Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Role/Position *"
                      value={userData.role}
                      onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                      className="px-4 py-2.5 bg-[#2c221b] border border-[#3a2d24] rounded-lg focus:outline-none focus:border-[#d4a373] text-[#f0e6d8] placeholder-[#6b5a4a] text-sm transition-colors"
                    />
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b5a4a]" />
                      <input
                        type="number"
                        placeholder="Experience (Years) *"
                        value={userData.experience}
                        onChange={(e) => setUserData({ ...userData, experience: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#2c221b] border border-[#3a2d24] rounded-lg focus:outline-none focus:border-[#d4a373] text-[#f0e6d8] placeholder-[#6b5a4a] text-sm transition-colors"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b5a4a]" />
                    <input
                      type="text"
                      placeholder="Company *"
                      value={userData.company}
                      onChange={(e) => setUserData({ ...userData, company: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#2c221b] border border-[#3a2d24] rounded-lg focus:outline-none focus:border-[#d4a373] text-[#f0e6d8] placeholder-[#6b5a4a] text-sm transition-colors"
                    />
                  </div>
                  <select
                    value={userData.industry}
                    onChange={(e) => setUserData({ ...userData, industry: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#2c221b] border border-[#3a2d24] rounded-lg focus:outline-none focus:border-[#d4a373] text-[#f0e6d8] text-sm"
                  >
                    <option value="">Select Industry *</option>
                    {industries.map((ind) => (
                      <option key={ind.value} value={ind.value}>{ind.label}</option>
                    ))}
                  </select>
                </div>

                {/* Educational Information */}
                <div className="space-y-3">
                  <h3 className="text-[#d4a373] font-medium flex items-center gap-2 text-sm uppercase tracking-wide">
                    <GraduationCap className="w-4 h-4" />
                    Educational Information
                  </h3>
                  <input
                    type="text"
                    placeholder="Education *"
                    value={userData.education}
                    onChange={(e) => setUserData({ ...userData, education: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#2c221b] border border-[#3a2d24] rounded-lg focus:outline-none focus:border-[#d4a373] text-[#f0e6d8] placeholder-[#6b5a4a] text-sm transition-colors"
                  />
                  <div className="relative">
                    <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b5a4a]" />
                    <input
                      type="text"
                      placeholder="Skills (comma separated) *"
                      value={userData.skill}
                      onChange={(e) => setUserData({ ...userData, skill: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#2c221b] border border-[#3a2d24] rounded-lg focus:outline-none focus:border-[#d4a373] text-[#f0e6d8] placeholder-[#6b5a4a] text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* About */}
                <div className="space-y-3">
                  <h3 className="text-[#d4a373] font-medium text-sm uppercase tracking-wide">About You</h3>
                  <textarea
                    placeholder="Tell us about your experience, skills, and career goals..."
                    value={userData.about}
                    onChange={(e) => setUserData({ ...userData, about: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2.5 bg-[#2c221b] border border-[#3a2d24] rounded-lg focus:outline-none focus:border-[#d4a373] text-[#f0e6d8] placeholder-[#6b5a4a] text-sm resize-none transition-colors"
                  />
                </div>

                {/* Robot Check */}
                <div className="flex items-center gap-3 py-2">
                  <button
                    type="button"
                    onClick={() => setIsRobotChecked(!isRobotChecked)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isRobotChecked
                      ? "bg-[#d4a373] border-[#d4a373]"
                      : "border-[#6b5a4a] hover:border-[#d4a373]"
                      }`}
                  >
                    {isRobotChecked && <CheckCircle className="w-4 h-4 text-[#1a120b]" />}
                  </button>
                  <span className="text-[#a68a6b] text-sm">I'm not a robot</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#d4a373] hover:bg-[#c49a6c] text-[#1a120b] font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#1a120b] border-t-transparent rounded-full animate-spin" />
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        closeOnClick
        pauseOnHover
        toastStyle={{ backgroundColor: '#1e1610', color: '#f0e6d8' }}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #2c221b;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4a373;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #c49a6c;
        }
      `}</style>
    </div>
  );
}