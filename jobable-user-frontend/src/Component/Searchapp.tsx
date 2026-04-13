import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Mail,
  User,
  Settings,
  Info,
  MapPin,
  Briefcase,
  IndianRupee,
  X,
  Building,
  Eye,
  EyeOff,
  ArrowLeft,
  Menu,
  LogOut,
  Award,
  Clock,
  TrendingUp,
  Users,
  Zap,
  Search,
} from "lucide-react";
import { jobListings } from "../jobListData";

export default function Dashboard() {
  const [showPassword, setShowPassword] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(jobListings);
  const [completeData] = useState(jobListings);
  const [openDetails, setOpenDetails] = useState(false);
  const [completeDetails, setCompleteDetails] = useState<any>(null);
  const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
  const [openAppliedJobs, setOpenAppliedJobs] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filters, setFilters] = useState({
    jobType: "",
    company: "",
    location: "",
    jobTitle: "",
    industry: "",
    salary: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const localStorageUserData = localStorage.getItem("userData");
    if (localStorageUserData) {
      setUserData(JSON.parse(localStorageUserData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/"), 1500);
  };

  const handleApply = (job: any) => {
    setAppliedJobs([...appliedJobs, job]);
    toast.success(`Applied to ${job.job_title}! 🎉`);
    setOpenDetails(false);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters({ ...filters, [filterName]: value });
    if (!value) {
      setData(completeData);
      return;
    }
    const filtered = completeData.filter((job) =>
      job[filterName]?.toLowerCase().includes(value.toLowerCase())
    );
    setData(filtered);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    if (!value) {
      setData(completeData);
    } else {
      const filtered = completeData.filter(
        (job) =>
          job.job_title?.toLowerCase().includes(value.toLowerCase()) ||
          job.company?.toLowerCase().includes(value.toLowerCase())
      );
      setData(filtered);
    }
  };

  const stats = [
    { icon: TrendingUp, label: "Active Jobs", value: "1,234", color: "purple" },
    { icon: Users, label: "Companies", value: "856", color: "red" },
    { icon: Zap, label: "Matches", value: "89%", color: "pink" },
    { icon: Award, label: "Placements", value: "12.5K", color: "orange" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-red-900">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900/95 backdrop-blur-xl border-r border-purple-500/30 z-50 transform transition-transform duration-300 lg:translate-x-0 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-purple-500/30">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-red-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">
                Jobable
              </h2>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-6 text-center border-b border-purple-500/30">
            <div className="relative inline-block">
              <img
                className="w-24 h-24 rounded-full border-4 border-purple-500 object-cover mx-auto"
                src={userData?.image || "https://via.placeholder.com/96"}
                alt="Profile"
              />
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <h3 className="text-white font-semibold mt-3">{userData?.fullName || "User"}</h3>
            <p className="text-gray-400 text-sm">@{userData?.userName || "username"}</p>
            <p className="text-purple-400 text-xs mt-1">{userData?.industry || "Professional"}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {[
              { icon: User, label: "Profile", onClick: () => setOpenProfile(true) },
              { icon: Briefcase, label: "My Jobs", onClick: () => setOpenAppliedJobs(true) },
              { icon: Mail, label: "Contact", onClick: () => setOpenContact(true) },
              { icon: Settings, label: "Settings", onClick: () => { } },
              { icon: Info, label: "About", onClick: () => setOpenInfo(true) },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  item.onClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-600/20 rounded-xl transition-all duration-200 group"
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-purple-500/30">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-600/20 rounded-xl transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-xl border-b border-purple-500/30">
          <div className="px-4 py-3">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-white hover:bg-purple-600/20 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Search Bar - Mobile */}
              <div className="flex-1 lg:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchText}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-purple-500/30 rounded-xl focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Welcome Text */}
              <div className="hidden lg:block flex-1">
                <h1 className="text-2xl font-bold text-white">
                  Welcome back, <span className="text-transparent bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text">{userData?.fullName?.split(' ')[0] || "User"}</span>
                </h1>
                <p className="text-gray-400 text-sm">Find your dream job today</p>
              </div>

              {/* Stats Icons */}
              <div className="flex gap-2">
                {stats.slice(0, 2).map((stat, idx) => (
                  <div key={idx} className="hidden sm:flex items-center gap-2 px-3 py-1 bg-purple-600/20 rounded-full">
                    <stat.icon className={`w-4 h-4 text-${stat.color}-400`} />
                    <span className="text-white text-sm font-semibold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30 hover:border-purple-500 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters - Desktop */}
        <div className="hidden lg:block px-4 mb-6">
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Job Type", key: "jobType", options: [...new Set(jobListings.map(j => j.job_type))] },
              { label: "Company", key: "company", options: [...new Set(jobListings.map(j => j.company))] },
              { label: "Location", key: "location", options: [...new Set(jobListings.map(j => j.location))] },
              { label: "Job Title", key: "jobTitle", options: [...new Set(jobListings.map(j => j.job_title))] },
              { label: "Industry", key: "industry", options: [...new Set(jobListings.map(j => j.industry))] },
              { label: "Salary", key: "salary", options: [...new Set(jobListings.map(j => j.salary))] },
            ].map((filter, idx) => (
              <select
                key={idx}
                value={filters[filter.key as keyof typeof filters]}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-purple-500/30 rounded-xl focus:outline-none focus:border-purple-500 text-white text-sm cursor-pointer"
              >
                <option value="">All {filter.label}</option>
                {filter.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            ))}
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:block px-4 mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs by title or company..."
              value={searchText}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-purple-500/30 rounded-xl focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
            />
          </div>
        </div>

        {/* Job Listings */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Available Positions</h2>
            <p className="text-gray-400 text-sm">{data.length} jobs found</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((job, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setCompleteDetails(job);
                  setOpenDetails(true);
                }}
                className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/30 hover:border-purple-500 transition-all duration-300 cursor-pointer hover:transform hover:scale-105"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg group-hover:text-purple-400 transition-colors">
                        {job.job_title}
                      </h3>
                      <p className="text-gray-400 text-sm">{job.company}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <IndianRupee className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.job_type}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-300 text-sm line-clamp-2">
                    {job.requirements}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-500">{job.posted_date}</span>
                    <button className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-red-600 rounded-lg text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {data.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No jobs found matching your criteria</p>
            </div>
          )}
        </div>
      </main>

      {/* Job Details Dialog */}
      {openDetails && completeDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-purple-500/30 max-h-[90vh] overflow-hidden animate-slideUp">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-red-600 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={completeDetails.logo} alt="" className="w-8 h-8 rounded-lg" />
                  <h2 className="text-xl font-bold text-white">{completeDetails.job_title}</h2>
                </div>
                <button onClick={() => setOpenDetails(false)} className="p-1 hover:bg-white/10 rounded-lg">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto p-6 space-y-4 max-h-[calc(90vh-80px)] custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Building className="w-4 h-4 text-purple-400" />
                  <span>{completeDetails.company}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>{completeDetails.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <IndianRupee className="w-4 h-4 text-purple-400" />
                  <span>{completeDetails.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                  <span>{completeDetails.job_type}</span>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Description</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{completeDetails.description}</p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Requirements</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{completeDetails.requirements}</p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">About Company</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  IT involves the use of computers, software, and networks to store, process, and transmit data.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-purple-500/30">
              <button
                onClick={() => handleApply(completeDetails)}
                className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Dialog */}
      {openProfile && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="min-h-screen p-4">
            <div className="relative max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-purple-500/30">
              <div className="sticky top-0 bg-gray-900/95 p-4 border-b border-purple-500/30 flex items-center gap-4">
                <button onClick={() => setOpenProfile(false)} className="p-2 hover:bg-purple-600/20 rounded-lg">
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <h2 className="text-xl font-bold text-white">Profile</h2>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Profile Card */}
                  <div className="bg-gray-800/50 rounded-xl p-6 text-center border border-purple-500/30">
                    <img
                      src={userData?.image || "https://via.placeholder.com/128"}
                      alt="Profile"
                      className="w-32 h-32 rounded-full mx-auto border-4 border-purple-500 object-cover"
                    />
                    <h3 className="text-white text-xl font-semibold mt-4">{userData?.fullName}</h3>
                    <p className="text-purple-400">@{userData?.userName}</p>
                    <p className="text-gray-400 text-sm mt-2">{userData?.role}</p>
                    <button
                      onClick={() => {
                        setOpenProfile(false);
                        setOpenAppliedJobs(true);
                      }}
                      className="mt-4 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg text-sm transition-colors"
                    >
                      View Applied Jobs
                    </button>
                  </div>

                  {/* Details */}
                  <div className="md:col-span-2 bg-gray-800/50 rounded-xl p-6 border border-purple-500/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Location</p>
                        <p className="text-white">{userData?.location || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Experience</p>
                        <p className="text-white">{userData?.experience || "0"} years</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Company</p>
                        <p className="text-white">{userData?.company || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Industry</p>
                        <p className="text-white">{userData?.industry || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Education</p>
                        <p className="text-white">{userData?.education || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white">{userData?.email}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-gray-400 text-sm">Skills</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {userData?.skill?.split(',').map((skill: string, idx: number) => (
                            <span key={idx} className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded-lg text-xs">
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-gray-400 text-sm">About Me</p>
                        <p className="text-gray-300 mt-1">{userData?.about || "No description provided"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Applied Jobs Dialog */}
      {openAppliedJobs && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="min-h-screen p-4">
            <div className="relative max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-purple-500/30">
              <div className="sticky top-0 bg-gray-900/95 p-4 border-b border-purple-500/30 flex items-center gap-4">
                <button onClick={() => setOpenAppliedJobs(false)} className="p-2 hover:bg-purple-600/20 rounded-lg">
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <h2 className="text-xl font-bold text-white">Applied Jobs</h2>
              </div>

              <div className="p-6">
                {appliedJobs.length === 0 ? (
                  <div className="text-center py-12">
                    <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No jobs applied yet</p>
                    <button
                      onClick={() => setOpenAppliedJobs(false)}
                      className="mt-4 px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg"
                    >
                      Browse Jobs
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appliedJobs.map((job, idx) => (
                      <div key={idx} className="bg-gray-800/50 rounded-xl p-4 border border-purple-500/30 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <img src={job.logo} alt="" className="w-12 h-12 rounded-lg" />
                          <div>
                            <h3 className="text-white font-semibold">{job.job_title}</h3>
                            <p className="text-gray-400 text-sm">{job.company}</p>
                            <p className="text-purple-400 text-xs mt-1 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Applied recently
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setAppliedJobs(appliedJobs.filter((_, i) => i !== idx))}
                          className="p-2 hover:bg-red-600/20 rounded-lg text-red-400"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Dialog */}
      {openInfo && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="min-h-screen p-4">
            <div className="relative max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-purple-500/30">
              <div className="sticky top-0 bg-gray-900/95 p-4 border-b border-purple-500/30 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">About Jobable</h2>
                <button onClick={() => setOpenInfo(false)} className="p-2 hover:bg-purple-600/20 rounded-lg">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-purple-400 font-semibold mb-2">Our Mission</h3>
                  <p className="text-gray-300">
                    To connect talented individuals with perfect job opportunities and assist companies in finding ideal candidates.
                  </p>
                </div>
                <div>
                  <h3 className="text-purple-400 font-semibold mb-2">Our Vision</h3>
                  <p className="text-gray-300">
                    A world where job search is transparent, efficient, and fulfilling for both job seekers and employers.
                  </p>
                </div>
                <div>
                  <h3 className="text-purple-400 font-semibold mb-2">Our Commitment</h3>
                  <p className="text-gray-300">
                    We are committed to facilitating your professional growth with transparency, integrity, and innovation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Dialog */}
      {openContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-purple-500/30 animate-slideUp">
            <div className="p-4 border-b border-purple-500/30 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Contact Us</h2>
              <button onClick={() => setOpenContact(false)} className="p-1 hover:bg-purple-600/20 rounded-lg">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 bg-gray-800 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 bg-gray-800 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-2 bg-gray-800 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 pr-10"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-2 bg-gray-800 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 resize-none"
              />
              <button
                onClick={() => {
                  setOpenContact(false);
                  toast.success("Message sent successfully!");
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-semibold py-2 rounded-xl transition-all duration-300"
              >
                Send Message
              </button>
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
        toastStyle={{
          background: "#1f2937",
          color: "#fff",
          border: "1px solid #9333ea",
        }}
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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}