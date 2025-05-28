import React, { useState, useEffect } from "react";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import Logo from "./logo.png";
import { jobListings } from "../jobListData";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import BusinessIcon from "@mui/icons-material/Business";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "@mui/material/Input";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import { Card, Grid, useMediaQuery } from "@mui/material";
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  MenuItem,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
} from "@mui/material";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const drawerWidth = 240;
export default function PermanentDrawerLeft(props: any) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const notify = () => toast.info("Applied! They will contact you soon.");
  const emailNotify = () => toast.success("Email Sent!");

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
  const [userData, setuserData] = useState<any>(null);

  const openAppliedJobDialog = () => {
    setOpenAppliedJobs(true);
  };
  const closeAppliedJobDialog = () => {
    setOpenAppliedJobs(false);
  };

  const openProfileDialog = () => {
    setOpenProfile(true);
  };
  const closeProfileDialog = () => {
    setOpenProfile(false);
  };

  const openContactDialog = () => {
    setOpenContact(true);
  };
  const closeContactDialog = () => {
    setOpenContact(false);
  };
  const openInfoDialog = () => {
    setOpenInfo(true);
  };
  const closeInfoDialog = () => {
    setOpenInfo(false);
  };
  const open = () => {
    setOpenDetails(true);
  };
  const close = () => {
    setOpenDetails(false);
  };

  useEffect(() => {
    const localStorageUserData = localStorage.getItem("userData");
    if (localStorageUserData) {
      setuserData(JSON.parse(localStorageUserData));
    }
  }, []);

  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <>
      <Toolbar />
      <div
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          marginTop: "-50px",
        }}
      >
        <h2>{userData && userData.fullName}</h2>
      </div>
      <Typography sx={{ textAlign: "center", lineHeight: "0.5" }}>
        <img
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: "5px solid gray",
          }}
          src={userData && userData.image}
          alt=""
        />
        <div style={{ marginTop: "10px" }}>
          <p style={{ marginTop: "10px", fontWeight: "bold" }}>
            {userData && userData.userName}
          </p>
          <p style={{ marginTop: "10px", marginBottom: "10px" }}>
            {userData && userData.industry}
          </p>
        </div>
      </Typography>
      <Divider />
      <Typography>
        <ListItemButton>
          <ListItem>
            <PersonIcon />
          </ListItem>
          <ListItem
            onClick={() => {
              openProfileDialog();
            }}
            sx={{ marginLeft: "-130px" }}
          >
            Profile
          </ListItem>
        </ListItemButton>
      </Typography>
      <Typography>
        <ListItemButton>
          <ListItem>
            <AccountCircleIcon />
          </ListItem>
          <ListItem sx={{ marginLeft: "-130px" }}> Account</ListItem>
        </ListItemButton>
      </Typography>
      <Typography>
        <ListItemButton onClick={openContactDialog}>
          <ListItem>
            <MailIcon />
          </ListItem>
          <ListItem sx={{ marginLeft: "-130px" }}> Contact</ListItem>
        </ListItemButton>
      </Typography>
      <Typography>
        <ListItemButton>
          <ListItem>
            <SettingsIcon />
          </ListItem>
          <ListItem sx={{ marginLeft: "-130px" }}> Settings</ListItem>
        </ListItemButton>
      </Typography>
      <Typography>
        <ListItemButton
          onClick={() => {
            openInfoDialog();
          }}
        >
          <ListItem>
            <InfoIcon />
          </ListItem>
          <ListItem sx={{ marginLeft: "-130px" }}>Info</ListItem>
        </ListItemButton>
      </Typography>
    </>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
            ml: isMobile ? 0 : `${drawerWidth}px`,
            backgroundColor: "#fff",
            boxShadow: "0",
          }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, color: "gray" }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: "#000",
                fontWeight: "bolder",
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Gabarito, sans-serif",
                  fontWeight: "bold",
                  fontSize: {
                    md: "2.5rem",
                  },
                  display: {
                    xs: "none", // hidden on phones
                    sm: "none", // hidden on tablets
                    md: "block", // visible on desktops and above
                  },
                  textAlign: "center",
                }}
              >
                Jobable
              </Typography>

              <Box
                sx={{
                  display: { xs: "block", sm: "block", md: "none" }, // Only visible on small screens
                  width: "100%", // full width on navbar
                  px: 2,
                }}
              >
                <input
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    paddingLeft: "10px",
                    padding: "5px",
                    border: "1px solid gray",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  autoComplete="off"
                  type="text"
                  name="search"
                  placeholder="Search here"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    if (e.target.value === "") {
                      setData(jobListings);
                    } else {
                      const finalResult = data.filter(
                        (items) =>
                          items.job_title &&
                          items.job_title
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase())
                      );
                      setData(finalResult);
                    }
                  }}
                />
              </Box>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          anchor="left"
        >
          {drawerContent}
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            backgroundColor: "#e6f3ff",
            padding: "60px",
            marginTop: "-30px",
          }}
        >
          <Toolbar />
          <Typography
            variant="h4"
            sx={{ fontFamily: "monospace", fontWeight: "bolder" }}
          >
            Job Board
          </Typography>
          <Typography
            sx={{
              display: {
                xs: "none", // Mobile pe hide hoga
                sm: "flex", // Small screen and above pe dikhega
              },
              justifyContent: "space-around",
            }}
          >
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ width: "16%", backgroundColor: "#fff" }}
            >
              <div>
                <TextField
                  select
                  label="Job Type"
                  variant="filled"
                  fullWidth
                  onChange={(e: any) => {
                    const filteredData = completeData.filter((val) =>
                      val.job_type
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    );
                    setData(filteredData);
                  }}
                >
                  {Array.from(
                    new Set(jobListings.map((val) => val.job_type))
                  ).map((jobType) => (
                    <MenuItem key={jobType} value={jobType}>
                      {jobType}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Box>

            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ width: "16%", backgroundColor: "#fff" }}
            >
              <div>
                <TextField
                  select
                  label="Company"
                  variant="filled"
                  fullWidth
                  onChange={(e: any) => {
                    const filteredData = completeData.filter((val) =>
                      val.company
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    );
                    setData(filteredData);
                  }}
                >
                  {Array.from(
                    new Set(jobListings.map((val) => val.company))
                  ).map((company) => (
                    <MenuItem key={company} value={company}>
                      {company}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Box>

            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ width: "16%", backgroundColor: "#fff" }}
            >
              <div>
                <TextField
                  select
                  label="Location"
                  variant="filled"
                  fullWidth
                  onChange={(e: any) => {
                    const filteredData = completeData.filter((val) =>
                      val.location
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    );
                    setData(filteredData);
                  }}
                >
                  {Array.from(
                    new Set(jobListings.map((val) => val.location))
                  ).map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Box>

            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ width: "16%", backgroundColor: "#fff" }}
            >
              <div>
                <TextField
                  select
                  label="Job Title"
                  variant="filled"
                  fullWidth
                  onChange={(e: any) => {
                    const filteredData = completeData.filter((val) =>
                      val.job_title
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    );
                    setData(filteredData);
                  }}
                >
                  {Array.from(
                    new Set(jobListings.map((val) => val.job_title))
                  ).map((jobTitle) => (
                    <MenuItem key={jobTitle} value={jobTitle}>
                      {jobTitle}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Box>

            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ width: "16%", backgroundColor: "#fff" }}
            >
              <div>
                <TextField
                  select
                  label="Industry"
                  variant="filled"
                  fullWidth
                  onChange={(e: any) => {
                    const filteredData = completeData.filter((val) =>
                      val.industry
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    );
                    setData(filteredData);
                  }}
                >
                  {Array.from(
                    new Set(jobListings.map((val) => val.industry))
                  ).map((industry) => (
                    <MenuItem key={industry} value={industry}>
                      {industry}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Box>

            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ width: "16%", backgroundColor: "#fff" }}
            >
              <div>
                <TextField
                  select
                  label="Salary"
                  variant="filled"
                  fullWidth
                  onChange={(e: any) => {
                    const filteredData = completeData.filter((val) =>
                      val.salary
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    );
                    setData(filteredData);
                  }}
                >
                  {Array.from(
                    new Set(jobListings.map((val) => val.salary))
                  ).map((salary) => (
                    <MenuItem key={salary} value={salary}>
                      {salary}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Box>
          </Typography>

          <Typography>
            <p
              style={{
                marginTop: "25px",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              We are Hiring!
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              {data.map((items, idx) => {
                return (
                  <div
                    onClick={() => {
                      open();
                      setCompleteDetails(items);
                    }}
                    className="content"
                    key={idx}
                    style={{
                      cursor: "pointer",
                      borderRadius: "15px",
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow =
                        "0px 6px 15px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0px 4px 10px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "20px",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "8px",
                        }}
                        src={items.logo}
                        alt=""
                      />
                      <div style={{ marginLeft: "15px" }}>
                        <h2 style={{ fontSize: "1.2rem", margin: "0" }}>
                          {items.job_title}
                        </h2>
                        <p
                          style={{
                            fontSize: "0.9rem",
                            color: "#666",
                            margin: "5px 0",
                          }}
                        >
                          {items.company}
                        </p>
                      </div>
                    </div>
                    <div style={{ padding: "20px" }}>
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: "#333",
                          margin: "0 0 10px",
                        }}
                      >
                        {items.requirements.slice(0, 65)}...
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "1rem",
                            fontWeight: "bold",
                            color: "#e60000",
                            margin: "0",
                          }}
                        >
                          {items.salary}
                        </p>
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "#999",
                            margin: "0",
                          }}
                        >
                          {items.posted_date}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Typography>
        </Box>
      </Box>
      {openDetails && completeDetails && (
        <React.Fragment>
          <BootstrapDialog
            aria-labelledby="customized-dialog-title"
            open={openDetails}
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
                fontSize: "25px",
                fontFamily: "Gabarito, sans-serif",
                fontWeight: "bold",
                display: "flex",
                padding: "10px 20px",
              }}
            >
              <div>
                <img
                  style={{ width: "35px" }}
                  src={completeDetails.logo}
                  alt=""
                />
              </div>
              <div style={{ marginLeft: "10px" }}>
                {completeDetails.job_title}
              </div>
            </div>
            <DialogContent dividers>
              <div style={{ padding: "10px 20px" }}>
                <Typography gutterBottom sx={{ fontFamily: "Kanit" }}>
                  <BusinessCenterIcon sx={{ fontSize: "20px" }} />
                  {completeDetails.company}
                </Typography>
                <Typography gutterBottom sx={{ fontFamily: "Kanit" }}>
                  <LocationOnIcon sx={{ fontSize: "20px" }} />
                  {completeDetails.location}
                </Typography>
                <Typography gutterBottom sx={{ fontFamily: "Kanit" }}>
                  <CurrencyRupeeIcon sx={{ fontSize: "20px" }} />
                  {completeDetails.salary}
                </Typography>

                <div>
                  <h3>Descriptions</h3>
                  <p>{completeDetails.description}</p>
                  <h3>Requirements</h3>
                  <p>{completeDetails.requirements}</p>
                </div>
                <Typography gutterBottom sx={{ fontFamily: "Kanit" }}>
                  <BusinessIcon sx={{ fontSize: "20px" }} />
                  {completeDetails.industry}
                </Typography>
                <Typography gutterBottom sx={{ fontFamily: "Kanit" }}>
                  <MergeTypeIcon sx={{ fontSize: "20px" }} />
                  {completeDetails.job_type}
                </Typography>
                <h3>About Company</h3>
                <p>
                  IT involves the use of computers, software, and networks to
                  store, process, and transmit data. It includes everything from
                  personal computers to cloud computing and artificial
                  intelligence.
                </p>
              </div>
            </DialogContent>
            <DialogActions>
              <button
                onClick={() => {
                  setTimeout(() => {
                    notify();
                  }, 1000);

                  close();
                  setAppliedJobs([...appliedJobs, completeDetails]);
                }}
                style={{
                  backgroundColor: "#1a75ff",
                  color: "#fff",
                  padding: "5px 20px",
                  fontSize: "20px",
                  border: "none",
                  borderRadius: "50px",
                  cursor: "pointer",
                  textAlign: "center",
                  fontFamily: "Kanit",
                }}
              >
                Apply
              </button>
            </DialogActions>
          </BootstrapDialog>
        </React.Fragment>
      )}
      {openInfo && (
        <React.Fragment>
          <Dialog open={openInfo} fullScreen>
            <IconButton
              onClick={closeInfoDialog}
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
                fontSize: "30px",
                fontFamily: "Gabarito, sans-serif",
                fontWeight: "bold",
                display: "flex",
                padding: "10px 20px",
              }}
            >
              <div>
                <img style={{ width: "27%" }} src={Logo} alt="" />
              </div>
            </div>
            <DialogContent dividers>
              <Typography sx={{ marginTop: "-20px" }}>
                <h3>About Us</h3>
                <p>
                  Welcome to Jobable, your trusted partner in the world of
                  employment and career growth. Our mission is to connect
                  talented individuals with the perfect job opportunities and
                  assist companies in finding the ideal candidates to fuel their
                  growth.
                </p>
              </Typography>
              <Typography>
                <h3>Our Vision</h3>
                <p>
                  At Jobable, we envision a world where the job search process
                  is transparent, efficient, and fulfilling for both job seekers
                  and employers. We strive to be the bridge that connects
                  ambition with opportunity, paving the way for meaningful and
                  prosperous careers.
                </p>
              </Typography>
              <Typography>
                <h3>Who We Are</h3>
                <p>
                  We are a dedicated team of professionals passionate about the
                  future of work. Our diverse backgrounds and experiences bring
                  a unique perspective to the challenges and opportunities in
                  the job market. With expertise in technology, HR, and user
                  experience, we've created an innovative platform designed to
                  make your job search or hiring process straightforward and
                  rewarding.
                </p>
              </Typography>
              <Typography>
                <h3>Our Commitment</h3>
                <p>
                  We are committed to facilitating your professional growth and
                  ensuring that every interaction with Jobable is a positive
                  one. Our values of transparency, integrity, and innovation
                  drive us to constantly improve and provide the best experience
                  for job seekers and employers alike.
                </p>
              </Typography>
              <Typography>
                <p>
                  Join Jobable today and take the next step towards a brighter
                  future. Your dream job or ideal candidate may be just a few
                  clicks away. Thank you for choosing Jobable to be a part of
                  your career journey.
                </p>
              </Typography>
            </DialogContent>
          </Dialog>
        </React.Fragment>
      )}
      {openContact && (
        <React.Fragment>
          <Dialog open={openContact} fullWidth maxWidth="sm">
            {/* Close Button */}
            <IconButton
              onClick={closeContactDialog}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Heading */}
            <Box sx={{ mt: 4, mb: 1, ml: 3 }}>
              <Typography
                variant="h5"
                sx={{ fontFamily: "Gabarito, sans-serif", fontWeight: 600 }}
              >
                Get in touch
              </Typography>
            </Box>

            {/* Form Fields */}
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="off"
                    required
                    autoFocus
                    fullWidth
                    label="Name"
                    type="text"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    type="email"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth variant="standard" required>
                    <InputLabel htmlFor="standard-adornment-password">
                      Password
                    </InputLabel>
                    <Input
                      id="standard-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography sx={{ mb: 1, mt: 2 }}>
                    Enter Your Message:
                  </Typography>
                  <TextField
                    placeholder="Message"
                    multiline
                    rows={5}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </DialogContent>

            {/* Send Button */}
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => {
                  closeContactDialog();
                  emailNotify();
                }}
              >
                Send
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
      {openProfile && (
        <Dialog open={openProfile} fullScreen>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "16px",
              position: "sticky",
              top: 0,
              backgroundColor: "#fff",
              zIndex: 1000,
            }}
          >
            <IconButton onClick={closeProfileDialog}>
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ marginLeft: "16px", fontWeight: "bold" }}
            >
              Profile
            </Typography>
          </Box>

          <DialogContent dividers>
            <Grid
              container
              spacing={4}
              sx={{ mt: 4, px: { xs: 1, sm: 4 }, py: 2 }}
              justifyContent="center"
            >
              {/* Left Profile Section */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    boxShadow: 3,
                  }}
                >
                  <img
                    src={userData?.image}
                    alt="Profile"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      border: "4px solid gray",
                      marginBottom: "10px",
                    }}
                  />
                  <h2 style={{ fontFamily: "Gabarito, sans-serif" }}>
                    {userData?.fullName}
                  </h2>
                  <h3 style={{ color: "gray", fontWeight: 400 }}>
                    @{userData?.userName}
                  </h3>
                  <h4 style={{ fontWeight: 500 }}>{userData?.role}</h4>
                  <Button
                    variant="outlined"
                    onClick={openAppliedJobDialog}
                    sx={{ mt: 2, fontFamily: "Kanit" }}
                    startIcon={<BusinessCenterIcon />}
                  >
                    Your Jobs
                  </Button>
                </Card>
              </Grid>

              {/* Right Info Section */}
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3, boxShadow: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <p>
                        <LocationOnIcon
                          sx={{ fontSize: "18px", color: "gray" }}
                        />{" "}
                        <strong>{userData?.location}</strong>
                      </p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <p>
                        Experience:{" "}
                        <strong>
                          {userData?.experience || "Not Provided"}
                        </strong>
                      </p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <p>
                        Company:{" "}
                        <strong>{userData?.company || "Not Provided"}</strong>
                      </p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <p>
                        Industry:{" "}
                        <strong>{userData?.industry || "Not Provided"}</strong>
                      </p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <p>
                        Education:{" "}
                        <strong>{userData?.education || "Not Provided"}</strong>
                      </p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <p>
                        Email: <strong>{userData?.email}</strong>
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <p>
                        Skills:{" "}
                        <strong>{userData?.skill || "No skills listed"}</strong>
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 2 }} />
                      <h3>About Me</h3>
                      <p style={{ lineHeight: 1.6 }}>
                        {userData?.about || "No about info provided."}
                      </p>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
      {openAppliedJobs && appliedJobs && (
        <React.Fragment>
          <Dialog open={openAppliedJobs} fullScreen>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "16px",
                position: "sticky",
                top: 0,
                backgroundColor: "#fff",
                zIndex: 1000,
              }}
            >
              <IconButton onClick={closeAppliedJobDialog}>
                <ArrowBackIcon />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ marginLeft: "16px", fontWeight: "bold" }}
              >
                Applied Jobs
              </Typography>
            </Box>

            <DialogContent dividers>
              <Grid container spacing={2}>
                {appliedJobs?.map((i, id) => (
                  <Grid item xs={12} md={6} key={id}>
                    <Card
                      sx={{
                        position: "relative",
                        padding: 2,
                        borderLeft: "5px solid #80bfff",
                        backgroundColor: "#e6e6e6",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                        boxShadow: 2,
                        minHeight: "120px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "90%",
                        }}
                      >
                        <img
                          src={i.logo}
                          alt="Company Logo"
                          style={{
                            width: "40px",
                            height: "40px",
                            marginRight: "20px",
                          }}
                        />
                        <Box>
                          <h3 style={{ margin: 0 }}>{i.job_title}</h3>
                          <p
                            style={{
                              color: "#3399ff",
                              marginTop: "8px",
                              marginBottom: 0,
                              fontSize: "14px",
                            }}
                          >
                            {userData?.userName} applied this job{" "}
                            {Math.ceil(Math.random() * 10)} min ago
                          </p>
                        </Box>
                      </Box>

                      <IconButton
                        onClick={() =>
                          setAppliedJobs(
                            appliedJobs.filter((val) => val.id !== i.id)
                          )
                        }
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          color: "red",
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
          </Dialog>
        </React.Fragment>
      )}
      <div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          limit={3}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          toastStyle={{
            fontSize: "1rem",
            fontFamily: "Gabarito, sans-serif",
            maxWidth: "70vw",
            textAlign: "center",
          }}
        />
      </div>
    </>
  );
}
