import React, { useState, useRef } from "react";
import Logo from "./logo.png";
import Halflogo from "./halflogo.png";
import {
  Button,
  Card,
  CardContent,
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const industries = [
  { value: "Technology", label: "Technology" },
  { value: "Software Engineer", label: "Software Engineer" },
  { value: "Mechanical", label: "Mechanical" },
  { value: "Electronic", label: "Electronic" },
];

export default function Loginpage(props: any) {
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
  
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const notify = () => toast("Welcome to Jobable!");
  const history = useNavigate();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const open = () => setLoginDialogOpen(true);
  const close = () => setLoginDialogOpen(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<any>("");

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (): void => {
      const img: HTMLImageElement = new Image();
      img.src = reader.result as string;
      if (reader.result) {
        setImage(img.src);
        setUserData({ ...userData, image: img.src });
      }
    };
  };
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
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

    notify();
    localStorage.setItem("userData", JSON.stringify(userData));
    setTimeout(() => {
      history("/job-description");
    }, 2000);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card
          sx={{
            maxWidth: 400,
            width: "100%",
            textAlign: "center",
            borderRadius: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            backgroundColor: "#ffffff",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
            },
          }}
          className="px-3 py-4 sm:px-6 sm:py-8"
        >
          <img
            src={Logo}
            alt="Jobable Logo"
            className={`mx-auto mb-5 ${isMobile ? "w-3/4" : "w-48"} transition-all duration-300`}
          />

          <CardContent className="pt-2">
            <h1 className={`font-bold text-gray-800 mb-2 ${isMobile ? "text-2xl" : "text-3xl"}`}>
              Welcome to Jobable.com
            </h1>
            <p className={`text-gray-500 mb-6 ${isMobile ? "text-xs" : "text-sm"}`}>
              Your trusted platform for job search and career growth.
            </p>

            <Button
              onClick={open}
              variant="contained"
              startIcon={<LoginIcon />}
              sx={{
                py: "8px",
                px: "24px",
                fontSize: "14px",
                fontFamily: "Kanit",
                borderRadius: "12px",
                backgroundColor: "#008ae6",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#0066b3",
                  transform: "scale(1.02)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Sign In
            </Button>

            <p className="mt-4 text-xs text-gray-400">
              Don't have an account?{" "}
              <a href="/" className="text-blue-500 hover:text-blue-600 transition-colors">
                Login
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      {loginDialogOpen && (
        <Dialog
          sx={{
            "& .MuiDialog-paper": {
              width: isMobile ? "90%" : "550px",
              maxWidth: "100%",
              margin: "0 auto",
              borderRadius: "24px",
            },
          }}
          open={loginDialogOpen}
          aria-labelledby="customized-dialog-title"
        >
          <IconButton
            onClick={close}
            aria-label="close"
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
              color: (theme) => theme.palette.grey[500],
              zIndex: 1,
              backgroundColor: "rgba(0,0,0,0.05)",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.1)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          
          <div className="flex items-center gap-3 p-5 border-b border-gray-100">
            <img
              className={`${isMobile ? "w-6" : "w-8"} object-contain`}
              src={Halflogo}
              alt=""
            />
            <div className={`font-semibold text-gray-800 ${isMobile ? "text-xl" : "text-2xl"}`}>
              Sign In
            </div>
          </div>
          
          <DialogContent dividers className="max-h-[70vh] overflow-y-auto">
            <FormControl sx={{ width: "100%" }}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-center">
                  <h3 className="text-base font-semibold text-gray-700 mb-2">
                    Upload your Profile Photo
                  </h3>
                  <div
                    onClick={handleImageClick}
                    className="mt-2 flex justify-center cursor-pointer group"
                  >
                    <div className="relative">
                      {image ? (
                        <img
                          className={`w-24 h-24 rounded-full object-cover border-4 border-blue-100 group-hover:border-blue-300 transition-all duration-300 ${isMobile ? "w-20 h-20" : "w-24 h-24"}`}
                          src={image}
                          alt="Profile"
                        />
                      ) : (
                        <img
                          className={`w-24 h-24 rounded-full object-cover border-4 border-gray-200 group-hover:border-blue-300 transition-all duration-300 ${isMobile ? "w-20 h-20" : "w-24 h-24"}`}
                          src="https://static.thenounproject.com/png/396915-200.png"
                          alt="Default profile"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full transition-all duration-300">
                        <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to change
                        </span>
                      </div>
                    </div>
                    <input
                      type="file"
                      ref={inputRef}
                      style={{ display: "none" }}
                      defaultValue={userData.image}
                      onChange={(e) => {
                        setUserData({ ...userData, image: e.target.value });
                        handleImageChange(e);
                      }}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-700 mb-3 mt-2">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <TextField
                      autoComplete="off"
                      fullWidth
                      required
                      margin="dense"
                      label="Full Name"
                      type="text"
                      variant="outlined"
                      size="small"
                      name="fullName"
                      defaultValue={userData.fullName}
                      onChange={(e) => {
                        setUserData({ ...userData, fullName: e.target.value });
                      }}
                    />
                    <TextField
                      required
                      margin="dense"
                      label="User Name"
                      type="text"
                      variant="outlined"
                      size="small"
                      name="userName"
                      defaultValue={userData.userName}
                      onChange={(e) => {
                        setUserData({ ...userData, userName: e.target.value });
                      }}
                    />
                  </div>
                  
                  <TextField
                    required
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="email"
                    defaultValue={userData.email}
                    onChange={(e) => {
                      setUserData({ ...userData, email: e.target.value });
                    }}
                  />
                  
                  <TextField
                    required
                    margin="dense"
                    label="Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    fullWidth
                    name="password"
                  />
                  
                  <TextField
                    required
                    margin="dense"
                    label="Location"
                    type="text"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="location"
                    defaultValue={userData.location}
                    onChange={(e) => {
                      setUserData({ ...userData, location: e.target.value });
                    }}
                  />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-700 mb-3">
                    Educational Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <TextField
                      required
                      margin="dense"
                      label="Role"
                      type="text"
                      variant="outlined"
                      size="small"
                      name="role"
                      defaultValue={userData.role}
                      onChange={(e) => {
                        setUserData({ ...userData, role: e.target.value });
                      }}
                    />
                    <TextField
                      required
                      margin="dense"
                      label="Experience (Years)"
                      type="number"
                      variant="outlined"
                      size="small"
                      name="experience"
                      defaultValue={userData.experience}
                      onChange={(e) => {
                        setUserData({ ...userData, experience: e.target.value });
                      }}
                    />
                  </div>
                  
                  <TextField
                    required
                    margin="dense"
                    label="Company"
                    fullWidth
                    type="text"
                    variant="outlined"
                    size="small"
                    name="company"
                    defaultValue={userData.company}
                    onChange={(e) => {
                      setUserData({ ...userData, company: e.target.value });
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    select
                    label="Industry"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    name="industry"
                    defaultValue={userData.industry}
                    onChange={(e) => {
                      setUserData({ ...userData, industry: e.target.value });
                    }}
                  >
                    {industries.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  
                  <TextField
                    required
                    margin="dense"
                    label="Education"
                    fullWidth
                    type="text"
                    variant="outlined"
                    size="small"
                    name="education"
                    defaultValue={userData.education}
                    onChange={(e) => {
                      setUserData({ ...userData, education: e.target.value });
                    }}
                  />
                  
                  <TextField
                    required
                    margin="dense"
                    fullWidth
                    label="Skills"
                    type="text"
                    variant="outlined"
                    size="small"
                    name="skill"
                    placeholder="e.g., React, Python, AWS"
                    defaultValue={userData.skill}
                    onChange={(e) => {
                      setUserData({ ...userData, skill: e.target.value });
                    }}
                  />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-700 mb-2">
                    Tell us about yourself
                  </h3>
                  <textarea
                    placeholder="You can write here about your education, skills, experience and previous company experiences..."
                    defaultValue={userData.about}
                    onChange={(e) => {
                      setUserData({ ...userData, about: e.target.value });
                    }}
                    className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 py-2">
                  <Checkbox {...label} />
                  <span className="text-sm text-gray-600">I'm not a robot</span>
                </div>

                <DialogActions className="pt-4">
                  <button
                    type="submit"
                    className={`bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${
                      isMobile ? "w-1/2 text-base" : "w-1/3 text-lg"
                    }`}
                  >
                    Sign In
                  </button>
                </DialogActions>
              </form>
            </FormControl>
          </DialogContent>
        </Dialog>
      )}
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}