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
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const industries = [
  {
    value: "Technology",
    label: "Technology",
  },
  {
    value: "Software Engineer",
    label: "Software Engineer",
  },
  {
    value: "Mechanical",
    label: "Mechanical",
  },
  {
    value: "Electronic",
    label: "Electronic",
  },
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
  const open = () => {
    setLoginDialogOpen(true);
  };
  const close = () => {
    setLoginDialogOpen(false);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const [image, setImage] = useState<any>("");

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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screens

  interface UserData {
    image: string;
    fullName: string;
    userName: string;
    email: string;
    location: string;
    role: string;
    company: string;
    industry: string;
    experience: string;
    education: string;
    skill: string;
    about: string;
  }

  interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = (e: HandleSubmitEvent): void => {
    e.preventDefault();

    // Basic validation
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
    }: UserData = userData;

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
      alert("Please fill all required fields.");
      return;
    }

    // Save and redirect
    notify();
    localStorage.setItem("userData", JSON.stringify(userData));
    setTimeout(() => {
      history("/job-description");
    }, 2000);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          padding: "16px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Card
          sx={{
            maxWidth: 400,
            width: "100%",
            textAlign: "center",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            backgroundColor: "#ffffff",
            px: 3,
            py: 4,
          }}
        >
          <img
            src={Logo}
            alt="Jobable Logo"
            style={{
              width: isMobile ? "70%" : "200px",
              margin: "0 auto 20px",
            }}
          />

          <CardContent>
            <h1
              style={{
                fontSize: isMobile ? "22px" : "30px",
                fontFamily: "Gabarito, sans-serif",
                marginBottom: "8px",
              }}
            >
              Welcome to Jobable.com
            </h1>
            <p
              style={{
                fontSize: isMobile ? "13px" : "15px",
                color: "#555",
                marginBottom: "24px",
              }}
            >
              Your trusted platform for job search and career growth.
            </p>

            <Button
              onClick={open}
              variant="contained"
              startIcon={<LoginIcon />}
              sx={{
                py: "5px",
                fontSize: "14px",
                fontFamily: "Kanit",
                borderRadius: "8px",
                backgroundColor: "#008ae6",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#007acc",
                },
              }}
            >
              Sign In
            </Button>

            <p
              style={{
                marginTop: "16px",
                fontSize: "13px",
                color: "gray",
                fontFamily: "Kanit",
              }}
            >
              Don’t have an account? <a href="/">Login</a>
            </p>
          </CardContent>
        </Card>
      </div>
      {loginDialogOpen && (
        <React.Fragment>
          <Dialog
            sx={{
              padding: isMobile ? "20px 5px" : "50px 10px",
              "& .MuiDialog-paper": {
                width: isMobile ? "90%" : "500px",
                maxWidth: "100%", // Prevent dialog from exceeding screen width
                margin: "0 auto", // Center the dialog
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
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <div
              style={{
                fontSize: isMobile ? "20px" : "30px",
                fontFamily: "Gabarito, sans-serif",
                fontWeight: "bold",
                display: "flex",
                padding: "10px 20px",
                maxWidth: "100%", // Prevent content from exceeding the dialog width
              }}
            >
              <div>
                <img
                  style={{
                    width: isMobile ? "25px" : "35px",
                    maxWidth: "100%", // Ensure the image doesn't exceed the container width
                  }}
                  src={Halflogo}
                  alt=""
                />
              </div>
              <div
                style={{
                  marginLeft: "10px",
                  fontFamily: "Kanit",
                  fontSize: isMobile ? "18px" : "inherit",
                }}
              >
                Sign In
              </div>
            </div>
            <DialogContent dividers>
              <FormControl
                sx={{
                  marginTop: isMobile ? "0" : "-20px",
                  width: "100%",
                }}
              >
                <h3 style={{ fontSize: isMobile ? "16px" : "inherit" }}>
                  Upload your Profile Photo here
                </h3>
                <div
                  onClick={handleImageClick}
                  style={{
                    marginTop: "5px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {image ? (
                    <img
                      style={{
                        width: isMobile ? "80px" : "100px",
                        height: isMobile ? "80px" : "100px",
                        borderRadius: "50%",
                        maxWidth: "100%", // Ensure the image doesn't exceed the container width
                      }}
                      src={image}
                      alt=""
                    />
                  ) : (
                    <img
                      style={{
                        width: isMobile ? "80px" : "100px",
                        height: isMobile ? "80px" : "100px",
                        borderRadius: "50%",
                        maxWidth: "100%", // Ensure the image doesn't exceed the container width
                      }}
                      src="https://static.thenounproject.com/png/396915-200.png"
                      alt=""
                    />
                  )}
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
                <h3 style={{ fontSize: isMobile ? "16px" : "inherit" }}>
                  Personal Informations
                </h3>
                <div style={{ marginTop: "-10px" }}>
                  <TextField
                    autoComplete="off"
                    fullWidth
                    required
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Full Name"
                    type="text"
                    variant="standard"
                    name="fullName"
                    defaultValue={userData.fullName}
                    onChange={(e) => {
                      setUserData({ ...userData, fullName: e.target.value });
                    }}
                  />
                  <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="name"
                    label="User Name"
                    type="text"
                    variant="standard"
                    name="userName"
                    defaultValue={userData.userName}
                    onChange={(e) => {
                      setUserData({ ...userData, userName: e.target.value });
                    }}
                  />
                </div>
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  variant="standard"
                  name="email"
                  defaultValue={userData.email}
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                />
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Password"
                  type="password"
                  variant="standard"
                  name="password"
                />
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Location"
                  type="text"
                  fullWidth
                  variant="standard"
                  name="location"
                  defaultValue={userData.location}
                  onChange={(e) => {
                    setUserData({ ...userData, location: e.target.value });
                  }}
                />
                <h3>Educational Informations</h3>
                <div style={{ marginTop: "-10px" }}>
                  <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Role"
                    type="text"
                    variant="standard"
                    name="role"
                    defaultValue={userData.role}
                    onChange={(e) => {
                      setUserData({ ...userData, role: e.target.value });
                    }}
                  />
                  <TextField
                    sx={{ marginLeft: "30px" }}
                    required
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Experience"
                    type="number"
                    variant="standard"
                    name="experience"
                    defaultValue={userData.experience}
                    onChange={(e) => {
                      setUserData({ ...userData, experience: e.target.value });
                    }}
                  />
                </div>
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Company"
                  fullWidth
                  type="text"
                  variant="standard"
                  name="company"
                  defaultValue={userData.company}
                  onChange={(e) => {
                    setUserData({ ...userData, company: e.target.value });
                  }}
                />
                <Box component="form" noValidate autoComplete="off">
                  <div>
                    <TextField
                      fullWidth
                      id="standard-select-currency"
                      select
                      label="Industry"
                      variant="standard"
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
                  </div>
                </Box>
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Education"
                  fullWidth
                  type="text"
                  variant="standard"
                  name="education"
                  defaultValue={userData.education}
                  onChange={(e) => {
                    setUserData({ ...userData, education: e.target.value });
                  }}
                />
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="name"
                  fullWidth
                  label="Skills"
                  type="text"
                  variant="standard"
                  name="skill"
                  defaultValue={userData.skill}
                  onChange={(e) => {
                    setUserData({ ...userData, skill: e.target.value });
                  }}
                />
                <h3>Tell us about yourself</h3>
                <textarea
                  placeholder="You can write here, about your education, skills, experience and previous company experiences...."
                  defaultValue={userData.about}
                  onChange={(e) => {
                    setUserData({ ...userData, about: e.target.value });
                  }}
                  style={{
                    width: isMobile ? "100%" : "500px",
                    height: "184px",
                    maxWidth: "100%", // Prevent textarea from exceeding the container width
                  }}
                ></textarea>
                <div>
                  <Checkbox {...label} />
                  I'm a robot.
                </div>
                <DialogActions>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(e as unknown as HandleSubmitEvent);
                    }}
                    type="submit"
                    style={{
                      width: isMobile ? "50%" : "25%",
                      padding: "5px 10px",
                      backgroundColor: "#001433",
                      fontSize: isMobile ? "16px" : "20px",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      color: "#fff",
                      fontFamily: "Kanit",
                    }}
                  >
                    Sign In
                  </button>
                </DialogActions>
              </FormControl>
            </DialogContent>
          </Dialog>
        </React.Fragment>
      )}
      <div>
        <ToastContainer />
      </div>
    </>
  );
}
