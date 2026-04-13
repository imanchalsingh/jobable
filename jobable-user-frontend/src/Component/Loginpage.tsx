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
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-red-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative flex justify-center items-center min-h-screen p-4">
        <div className="max-w-md w-full">
          {/* Main Card */}
          <div className="backdrop-blur-xl bg-gray-900/80 rounded-2xl shadow-2xl border border-purple-500/30 transform transition-all duration-500 hover:scale-105 hover:shadow-purple-500/20">
            <div className="p-6 sm:p-8">
              {/* Logo Section */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-purple-500 to-red-500 rounded-2xl mb-4 shadow-lg animate-pulse">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                  Jobable
                </h1>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">
                  Your gateway to dream careers
                </p>
              </div>

              {/* Welcome Text */}
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                  Welcome Back!
                </h2>
                <p className="text-gray-400 text-sm">
                  Join thousands of professionals finding their perfect role
                </p>
              </div>

              {/* Sign In Button */}
              <button
                onClick={() => setLoginDialogOpen(true)}
                className="w-full bg-linear-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/25"
              >
                <LogIn className="w-5 h-5" />
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Social Login Options */}
              <div className="mt-6">
                <p className="text-center text-gray-500 text-sm mb-4">Or continue with</p>
                <div className="flex gap-3 justify-center">
                  {[].map((Icon, idx) => (
                    <button
                      key={idx}
                      className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-purple-500/30"
                    >
                      <Icon className="w-5 h-5 text-gray-400 hover:text-purple-400" />
                    </button>
                  ))}
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-gray-500">
                By signing in, you agree to our{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sign In Dialog */}
      {loginDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-purple-500/30 max-h-[90vh] overflow-hidden animate-slideUp">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-linear-to-r from-purple-600 to-red-600 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-bold text-white">Create Account</h2>
                </div>
                <button
                  onClick={() => setLoginDialogOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="overflow-y-auto p-6 space-y-6 max-h-[calc(90vh-80px)] custom-scrollbar">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Photo */}
                <div className="text-center">
                  <h3 className="text-white font-semibold mb-3">Profile Photo</h3>
                  <div
                    onClick={handleImageClick}
                    className="inline-block cursor-pointer group"
                  >
                    <div className="relative">
                      {image ? (
                        <img
                          className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 group-hover:border-purple-400 transition-all duration-300"
                          src={image}
                          alt="Profile"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-linear-to-br from-purple-600 to-red-600 flex items-center justify-center border-4 border-purple-500 group-hover:border-purple-400 transition-all duration-300">
                          <UserCircle className="w-12 h-12 text-white" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Upload className="w-6 h-6 text-white" />
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
                  <h3 className="text-purple-400 font-semibold flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={userData.fullName}
                      onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
                    />
                    <input
                      type="text"
                      placeholder="Username *"
                      value={userData.userName}
                      onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="email"
                        placeholder="Email *"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="password"
                        placeholder="Password *"
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Location *"
                      value={userData.location}
                      onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-3">
                  <h3 className="text-purple-400 font-semibold flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Professional Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Role/Position *"
                      value={userData.role}
                      onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
                    />
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="number"
                        placeholder="Experience (Years) *"
                        value={userData.experience}
                        onChange={(e) => setUserData({ ...userData, experience: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Company *"
                      value={userData.company}
                      onChange={(e) => setUserData({ ...userData, company: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
                    />
                  </div>
                  <select
                    value={userData.industry}
                    onChange={(e) => setUserData({ ...userData, industry: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                  >
                    <option value="">Select Industry *</option>
                    {industries.map((ind) => (
                      <option key={ind.value} value={ind.value}>{ind.label}</option>
                    ))}
                  </select>
                </div>

                {/* Educational Information */}
                <div className="space-y-3">
                  <h3 className="text-purple-400 font-semibold flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Educational Information
                  </h3>
                  <input
                    type="text"
                    placeholder="Education *"
                    value={userData.education}
                    onChange={(e) => setUserData({ ...userData, education: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
                  />
                  <div className="relative">
                    <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Skills (comma separated) *"
                      value={userData.skill}
                      onChange={(e) => setUserData({ ...userData, skill: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* About */}
                <div className="space-y-3">
                  <h3 className="text-purple-400 font-semibold">About You</h3>
                  <textarea
                    placeholder="Tell us about your experience, skills, and career goals..."
                    value={userData.about}
                    onChange={(e) => setUserData({ ...userData, about: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 resize-none"
                  />
                </div>

                {/* Robot Check */}
                <div className="flex items-center gap-3 py-2">
                  <button
                    type="button"
                    onClick={() => setIsRobotChecked(!isRobotChecked)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isRobotChecked
                      ? "bg-purple-600 border-purple-600"
                      : "border-gray-600 hover:border-purple-500"
                      }`}
                  >
                    {isRobotChecked && <CheckCircle className="w-4 h-4 text-white" />}
                  </button>
                  <span className="text-gray-300 text-sm">I'm not a robot</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-linear-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
      />

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
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
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #9333ea, #ef4444);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7e22ce, #dc2626);
        }
      `}</style>
    </div>
  );
}