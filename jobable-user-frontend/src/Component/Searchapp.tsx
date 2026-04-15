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

// Type definitions
interface Job {
  job_title: string;
  company: string;
  location: string;
  salary: string;
  job_type: string;
  requirements: string;
  description: string;
  posted_date: string;
  logo: string;
  industry: string;
}

interface UserData {
  fullName: string;
  userName: string;
  email: string;
  image?: string;
  role?: string;
  location?: string;
  experience?: string;
  company?: string;
  industry?: string;
  education?: string;
  skill?: string;
  about?: string;
}

interface Filters {
  jobType: string;
  company: string;
  location: string;
  jobTitle: string;
  industry: string;
  salary: string;
}

interface Stat {
  icon: React.FC<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string;
  color: string;
}

interface FilterConfig {
  label: string;
  key: keyof Filters;
  options: string[];
}

export default function Dashboard(): React.ReactElement {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [data, setData] = useState<Job[]>(jobListings);
  const [completeData] = useState<Job[]>(jobListings);
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [completeDetails, setCompleteDetails] = useState<Job | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [openAppliedJobs, setOpenAppliedJobs] = useState<boolean>(false);
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [openContact, setOpenContact] = useState<boolean>(false);
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    jobType: "",
    company: "",
    location: "",
    jobTitle: "",
    industry: "",
    salary: ""
  });

  const navigate = useNavigate();

  useEffect((): void => {
    const localStorageUserData = localStorage.getItem("userData");
    if (localStorageUserData) {
      setUserData(JSON.parse(localStorageUserData) as UserData);
    }
  }, []);

  const handleLogout = (): void => {
    localStorage.removeItem("userData");
    toast.success("Logged out successfully!");
    setTimeout((): void => navigate("/"), 1500);
  };

  const handleApply = (job: Job): void => {
    setAppliedJobs([...appliedJobs, job]);
    toast.success(`Applied to ${job.job_title}! 🎉`);
    setOpenDetails(false);
  };

  const handleFilterChange = (filterName: keyof Filters, value: string): void => {
    setFilters({ ...filters, [filterName]: value });
    if (!value) {
      setData(completeData);
      return;
    }
    const filtered: Job[] = completeData.filter((job: Job): boolean =>
      job[filterName as keyof Job]?.toLowerCase().includes(value.toLowerCase())
    );
    setData(filtered);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    setSearchText(value);
    if (!value) {
      setData(completeData);
    } else {
      const filtered: Job[] = completeData.filter(
        (job: Job): boolean =>
          job.job_title?.toLowerCase().includes(value.toLowerCase()) ||
          job.company?.toLowerCase().includes(value.toLowerCase())
      );
      setData(filtered);
    }
  };

  const stats: Stat[] = [
    { icon: TrendingUp, label: "Active Jobs", value: "1,234", color: "#d4a373" },
    { icon: Users, label: "Companies", value: "856", color: "#d4a373" },
    { icon: Zap, label: "Matches", value: "89%", color: "#d4a373" },
    { icon: Award, label: "Placements", value: "12.5K", color: "#d4a373" },
  ];

  const navItems: Array<{
    icon: React.FC<{ className?: string }>;
    label: string;
    onClick: () => void;
  }> = [
    { icon: User, label: "Profile", onClick: (): void => setOpenProfile(true) },
    { icon: Briefcase, label: "My Jobs", onClick: (): void => setOpenAppliedJobs(true) },
    { icon: Mail, label: "Contact", onClick: (): void => setOpenContact(true) },
    { icon: Settings, label: "Settings", onClick: (): void => {} },
    { icon: Info, label: "About", onClick: (): void => setOpenInfo(true) },
  ];

  const filterConfigs: FilterConfig[] = [
    { label: "Job Type", key: "jobType", options: [...new Set(jobListings.map((j: Job): string => j.job_type))] },
    { label: "Company", key: "company", options: [...new Set(jobListings.map((j: Job): string => j.company))] },
    { label: "Location", key: "location", options: [...new Set(jobListings.map((j: Job): string => j.location))] },
    { label: "Job Title", key: "jobTitle", options: [...new Set(jobListings.map((j: Job): string => j.job_title))] },
    { label: "Industry", key: "industry", options: [...new Set(jobListings.map((j: Job): string => j.industry))] },
    { label: "Salary", key: "salary", options: [...new Set(jobListings.map((j: Job): string => j.salary))] },
  ];

  return (
    <div className="min-h-screen bg-[#1a120b]">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={(): void => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#1e1610] border-r border-[#d4a373]/20 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-[#d4a373]/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#d4a373] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-[#1a120b]" />
              </div>
              <h2 className="text-xl font-semibold text-[#d4a373] tracking-tight">
                Jobable
              </h2>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-6 text-center border-b border-[#d4a373]/20">
            <div className="relative inline-block">
              <img
                className="w-24 h-24 rounded-full border-2 border-[#d4a373] object-cover mx-auto"
                src={userData?.image || "https://via.placeholder.com/96"}
                alt="Profile"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-600 rounded-full border-2 border-[#1e1610]"></div>
            </div>
            <h3 className="text-[#f0e6d8] font-medium mt-3">{userData?.fullName || "User"}</h3>
            <p className="text-[#a68a6b] text-sm">@{userData?.userName || "username"}</p>
            <p className="text-[#d4a373] text-xs mt-1">{userData?.industry || "Professional"}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item, idx: number) => (
              <button
                key={idx}
                onClick={(): void => {
                  item.onClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-[#a68a6b] hover:text-[#d4a373] hover:bg-[#d4a373]/10 rounded-lg transition-all duration-200 group"
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-[#d4a373]/20">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#1a120b]/95 backdrop-blur-sm border-b border-[#d4a373]/20">
          <div className="px-4 py-3">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={(): void => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-[#a68a6b] hover:text-[#d4a373] hover:bg-[#d4a373]/10 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Search Bar - Mobile */}
              <div className="flex-1 lg:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b5a4a]" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchText}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-2 bg-[#241a13] border border-[#d4a373]/20 rounded-lg focus:outline-none focus:border-[#d4a373] text-[#f0e6d8] placeholder-[#6b5a4a] text-sm"
                  />
                </div>
              </div>

              {/* Welcome Text */}
              <div className="hidden lg:block flex-1">
                <h1 className="text-xl font-medium text-[#f0e6d8]">
                  Welcome back, <span className="text-[#d4a373]">{userData?.fullName?.split(' ')[0] || "User"}</span>
                </h1>
                <p className="text-[#a68a6b] text-sm">Find your dream job today</p>
              </div>

              {/* Stats Icons */}
              <div className="flex gap-2">
                {stats.slice(0, 2).map((stat: Stat, idx: number) => (
                  <div key={idx} className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#d4a373]/10 rounded-full">
                    <stat.icon className="w-3 h-3" style={{ color: stat.color }} />
                    <span className="text-[#f0e6d8] text-xs font-medium">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {stats.map((stat: Stat, idx: number) => (
            <div
              key={idx}
              className="bg-[#241a13] rounded-xl p-4 border border-[#d4a373]/20 hover:border-[#d4a373]/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                <span className="text-xl font-semibold text-[#f0e6d8]">{stat.value}</span>
              </div>
              <p className="text-[#a68a6b] text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters - Desktop */}
        <div className="hidden lg:block px-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {filterConfigs.map((filter: FilterConfig, idx: number) => (
              <select
                key={idx}
                value={filters[filter.key]}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
                  handleFilterChange(filter.key, e.target.value)
                }
                className="px-3 py-1.5 bg-[#241a13] border border-[#d4a373]/20 rounded-lg focus:outline-none focus:border-[#d4a373] text-[#f0e6d8] text-sm cursor-pointer"
              >
                <option value="">All {filter.label}</option>
                {filter.options.map((opt: string, i: number) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:block px-4 mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b5a4a]" />
            <input
              type="text"
              placeholder="Search jobs by title or company..."
              value={searchText}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 bg-[#241a13] border border-[#d4a373]/20 rounded-lg focus:outline-none focus:border-[#d4a373] text-[#f0e6d8] placeholder-[#6b5a4a] text-sm"
            />
          </div>
        </div>

        {/* Job Listings */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-[#f0e6d8]">Available Positions</h2>
            <p className="text-[#a68a6b] text-sm">{data.length} jobs found</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.map((job: Job, idx: number) => (
              <div
                key={idx}
                onClick={(): void => {
                  setCompleteDetails(job);
                  setOpenDetails(true);
                }}
                className="group bg-[#241a13] rounded-xl overflow-hidden border border-[#d4a373]/20 hover:border-[#d4a373]/40 transition-all duration-300 cursor-pointer hover:shadow-lg"
              >
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-[#f0e6d8] font-medium group-hover:text-[#d4a373] transition-colors">
                        {job.job_title}
                      </h3>
                      <p className="text-[#a68a6b] text-sm">{job.company}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center gap-2 text-[#a68a6b] text-xs">
                      <MapPin className="w-3 h-3" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#a68a6b] text-xs">
                      <IndianRupee className="w-3 h-3" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#a68a6b] text-xs">
                      <Briefcase className="w-3 h-3" />
                      <span>{job.job_type}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-[#c4b5a0] text-xs line-clamp-2">
                    {job.requirements}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[#6b5a4a] text-xs">{job.posted_date}</span>
                    <button className="px-3 py-1 bg-[#d4a373] hover:bg-[#c49a6c] rounded-lg text-[#1a120b] text-xs font-medium transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {data.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#a68a6b]">No jobs found matching your criteria</p>
            </div>
          )}
        </div>
      </main>

      {/* Job Details Dialog */}
      {openDetails && completeDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#1e1610] rounded-xl border border-[#d4a373]/30 max-h-[90vh] overflow-hidden animate-slideUp">
            <div className="sticky top-0 bg-[#d4a373] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={completeDetails.logo} alt="" className="w-8 h-8 rounded-lg" />
                  <h2 className="text-lg font-medium text-[#1a120b]">{completeDetails.job_title}</h2>
                </div>
                <button onClick={(): void => setOpenDetails(false)} className="p-1 hover:bg-black/10 rounded-lg">
                  <X className="w-5 h-5 text-[#1a120b]" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto p-6 space-y-4 max-h-[calc(90vh-80px)] custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-[#a68a6b] text-sm">
                  <Building className="w-4 h-4 text-[#d4a373]" />
                  <span>{completeDetails.company}</span>
                </div>
                <div className="flex items-center gap-2 text-[#a68a6b] text-sm">
                  <MapPin className="w-4 h-4 text-[#d4a373]" />
                  <span>{completeDetails.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[#a68a6b] text-sm">
                  <IndianRupee className="w-4 h-4 text-[#d4a373]" />
                  <span>{completeDetails.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-[#a68a6b] text-sm">
                  <Briefcase className="w-4 h-4 text-[#d4a373]" />
                  <span>{completeDetails.job_type}</span>
                </div>
              </div>

              <div>
                <h3 className="text-[#f0e6d8] font-medium mb-2 text-sm">Description</h3>
                <p className="text-[#c4b5a0] text-sm leading-relaxed">{completeDetails.description}</p>
              </div>

              <div>
                <h3 className="text-[#f0e6d8] font-medium mb-2 text-sm">Requirements</h3>
                <p className="text-[#c4b5a0] text-sm leading-relaxed">{completeDetails.requirements}</p>
              </div>

              <div>
                <h3 className="text-[#f0e6d8] font-medium mb-2 text-sm">About Company</h3>
                <p className="text-[#c4b5a0] text-sm leading-relaxed">
                  IT involves the use of computers, software, and networks to store, process, and transmit data.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-[#d4a373]/20">
              <button
                onClick={(): void => handleApply(completeDetails)}
                className="w-full bg-[#d4a373] hover:bg-[#c49a6c] text-[#1a120b] font-medium py-2.5 rounded-lg transition-all duration-300 text-sm"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Dialog */}
      {openProfile && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="min-h-screen p-4">
            <div className="relative max-w-4xl mx-auto bg-[#1e1610] rounded-xl border border-[#d4a373]/30">
              <div className="sticky top-0 bg-[#1e1610] p-4 border-b border-[#d4a373]/20 flex items-center gap-4">
                <button onClick={(): void => setOpenProfile(false)} className="p-2 hover:bg-[#d4a373]/10 rounded-lg">
                  <ArrowLeft className="w-5 h-5 text-[#a68a6b]" />
                </button>
                <h2 className="text-lg font-medium text-[#f0e6d8]">Profile</h2>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Profile Card */}
                  <div className="bg-[#241a13] rounded-xl p-6 text-center border border-[#d4a373]/20">
                    <img
                      src={userData?.image || "https://via.placeholder.com/128"}
                      alt="Profile"
                      className="w-28 h-28 rounded-full mx-auto border-2 border-[#d4a373] object-cover"
                    />
                    <h3 className="text-[#f0e6d8] font-medium mt-4">{userData?.fullName}</h3>
                    <p className="text-[#d4a373] text-sm">@{userData?.userName}</p>
                    <p className="text-[#a68a6b] text-xs mt-2">{userData?.role}</p>
                    <button
                      onClick={(): void => {
                        setOpenProfile(false);
                        setOpenAppliedJobs(true);
                      }}
                      className="mt-4 px-4 py-1.5 bg-[#d4a373]/10 hover:bg-[#d4a373]/20 text-[#d4a373] rounded-lg text-xs transition-colors"
                    >
                      View Applied Jobs
                    </button>
                  </div>

                  {/* Details */}
                  <div className="md:col-span-2 bg-[#241a13] rounded-xl p-6 border border-[#d4a373]/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-[#a68a6b] text-xs">Location</p>
                        <p className="text-[#f0e6d8] text-sm mt-0.5">{userData?.location || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-[#a68a6b] text-xs">Experience</p>
                        <p className="text-[#f0e6d8] text-sm mt-0.5">{userData?.experience || "0"} years</p>
                      </div>
                      <div>
                        <p className="text-[#a68a6b] text-xs">Company</p>
                        <p className="text-[#f0e6d8] text-sm mt-0.5">{userData?.company || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-[#a68a6b] text-xs">Industry</p>
                        <p className="text-[#f0e6d8] text-sm mt-0.5">{userData?.industry || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-[#a68a6b] text-xs">Education</p>
                        <p className="text-[#f0e6d8] text-sm mt-0.5">{userData?.education || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-[#a68a6b] text-xs">Email</p>
                        <p className="text-[#f0e6d8] text-sm mt-0.5">{userData?.email}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-[#a68a6b] text-xs">Skills</p>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {userData?.skill?.split(',').map((skill: string, idx: number) => (
                            <span key={idx} className="px-2 py-0.5 bg-[#d4a373]/10 text-[#d4a373] rounded text-xs">
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-[#a68a6b] text-xs">About Me</p>
                        <p className="text-[#c4b5a0] text-sm mt-1">{userData?.about || "No description provided"}</p>
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
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="min-h-screen p-4">
            <div className="relative max-w-4xl mx-auto bg-[#1e1610] rounded-xl border border-[#d4a373]/30">
              <div className="sticky top-0 bg-[#1e1610] p-4 border-b border-[#d4a373]/20 flex items-center gap-4">
                <button onClick={(): void => setOpenAppliedJobs(false)} className="p-2 hover:bg-[#d4a373]/10 rounded-lg">
                  <ArrowLeft className="w-5 h-5 text-[#a68a6b]" />
                </button>
                <h2 className="text-lg font-medium text-[#f0e6d8]">Applied Jobs</h2>
              </div>

              <div className="p-6">
                {appliedJobs.length === 0 ? (
                  <div className="text-center py-12">
                    <Briefcase className="w-12 h-12 text-[#6b5a4a] mx-auto mb-3" />
                    <p className="text-[#a68a6b] text-sm">No jobs applied yet</p>
                    <button
                      onClick={(): void => setOpenAppliedJobs(false)}
                      className="mt-4 px-4 py-1.5 bg-[#d4a373]/10 text-[#d4a373] rounded-lg text-xs"
                    >
                      Browse Jobs
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {appliedJobs.map((job: Job, idx: number) => (
                      <div key={idx} className="bg-[#241a13] rounded-lg p-4 border border-[#d4a373]/20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={job.logo} alt="" className="w-10 h-10 rounded-lg" />
                          <div>
                            <h3 className="text-[#f0e6d8] font-medium text-sm">{job.job_title}</h3>
                            <p className="text-[#a68a6b] text-xs">{job.company}</p>
                            <p className="text-[#d4a373] text-xs mt-0.5 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Applied recently
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={(): void => setAppliedJobs(appliedJobs.filter((_: Job, i: number): boolean => i !== idx))}
                          className="p-1.5 hover:bg-red-500/10 rounded-lg text-red-400"
                        >
                          <X className="w-4 h-4" />
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
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="min-h-screen p-4">
            <div className="relative max-w-2xl mx-auto bg-[#1e1610] rounded-xl border border-[#d4a373]/30">
              <div className="sticky top-0 bg-[#1e1610] p-4 border-b border-[#d4a373]/20 flex items-center justify-between">
                <h2 className="text-lg font-medium text-[#f0e6d8]">About Jobable</h2>
                <button onClick={(): void => setOpenInfo(false)} className="p-2 hover:bg-[#d4a373]/10 rounded-lg">
                  <X className="w-5 h-5 text-[#a68a6b]" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <h3 className="text-[#d4a373] font-medium mb-1 text-sm">Our Mission</h3>
                  <p className="text-[#c4b5a0] text-sm">
                    To connect talented individuals with perfect job opportunities and assist companies in finding ideal candidates.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#d4a373] font-medium mb-1 text-sm">Our Vision</h3>
                  <p className="text-[#c4b5a0] text-sm">
                    A world where job search is transparent, efficient, and fulfilling for both job seekers and employers.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#d4a373] font-medium mb-1 text-sm">Our Commitment</h3>
                  <p className="text-[#c4b5a0] text-sm">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#1e1610] rounded-xl border border-[#d4a373]/30 animate-slideUp">
            <div className="p-4 border-b border-[#d4a373]/20 flex items-center justify-between">
              <h2 className="text-lg font-medium text-[#f0e6d8]">Contact Us</h2>
              <button onClick={(): void => setOpenContact(false)} className="p-1 hover:bg-[#d4a373]/10 rounded-lg">
                <X className="w-5 h-5 text-[#a68a6b]" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 bg-[#241a13] border border-[#d4a373]/20 rounded-lg focus:outline-none focus:border-[#d4a373] text-[#f0e6d8] placeholder-[#6b5a4a] text-sm"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 bg-[#241a13] border border-[#d4a373]/20 rounded-lg focus:outline-none focus:border-[#d4a373] text-[#f0e6d8] placeholder-[#6b5a4a] text-sm"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-2 bg-[#241a13] border border-[#d4a373]/20 rounded-lg focus:outline-none focus:border-[#d4a373] text-[#f0e6d8] placeholder-[#6b5a4a] text-sm pr-10"
                />
                <button
                  onClick={(): void => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6b5a4a]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-2 bg-[#241a13] border border-[#d4a373]/20 rounded-lg focus:outline-none focus:border-[#d4a373] text-[#f0e6d8] placeholder-[#6b5a4a] text-sm resize-none"
              />
              <button
                onClick={(): void => {
                  setOpenContact(false);
                  toast.success("Message sent successfully!");
                }}
                className="w-full bg-[#d4a373] hover:bg-[#c49a6c] text-[#1a120b] font-medium py-2 rounded-lg transition-all duration-300 text-sm"
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
          background: "#1e1610",
          color: "#f0e6d8",
          border: "1px solid #d4a373",
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
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #241a13;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4a373;
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