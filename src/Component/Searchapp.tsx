import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import Logo from "./logo.png";
import { Badge, Dialog, MenuItem, TextField } from "@mui/material";
import { jobListings } from "../jobListData";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { styled } from "@mui/material/styles";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
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
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  const notify = () =>
    toast.info("Applied! They will contact you soon.", {
      position: toast.POSITION.TOP_CENTER,
    });
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

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            backgroundColor: "#fff",
            boxShadow: "0",
          }}
        >
          <Toolbar>
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
              <img style={{ width: "20%" }} src={Logo} alt="" />
              <input
                autoComplete="off"
                className="searchbar"
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
                          .includes(searchText.toLowerCase())
                    );
                    setData(finalResult);
                  }
                }}
              />
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <div
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              marginTop: "-70px",
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
            <p>{userData && userData.userName}</p>
            <p>{userData && userData.industry}</p>
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
          <Typography sx={{ display: "flex", justifyContent: "space-around" }}>
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
            </Box>{" "}
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
            </Box>{" "}
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
            </Box>{" "}
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
            </Box>{" "}
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
            </Box>{" "}
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
            <p style={{ marginTop: "25px" }}>We are Hiring!</p>
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
                    marginTop: "20px",
                    display: "flex",
                    backgroundColor: "#fff",
                    boxShadow: "0px 0px 5px 0px gray",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "30px",
                    }}
                  >
                    <img style={{ width: "40px" }} src={items.logo} alt="" />
                  </div>
                  <div style={{ lineHeight: "0.5", width: "100%" }}>
                    <h2>{items.job_title}</h2>
                    <p>{items.company}</p>
                    <p>{items.requirements.slice(0, 65)}..</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "right",
                      lineHeight: "0.5",
                      textAlign: "right",

                      width: "100%",
                    }}
                  >
                    <p style={{ padding: "0 20px", color: "#e60000" }}>
                      {items.salary}
                    </p>
                    <p style={{ padding: "0 20px" }}> {items.posted_date}</p>
                  </div>
                </div>
              );
            })}
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
          <Dialog open={openContact}>
            <IconButton
              onClick={closeContactDialog}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <h2
              style={{ marginLeft: "20px", fontFamily: "Gabarito, sans-serif" }}
            >
              Get in touch
            </h2>
            <DialogContent dividers>
              <TextField
                autoComplete="off"
                required
                autoFocus
                fullWidth
                margin="dense"
                id="name"
                label="Name"
                type="text"
                variant="standard"
              />
              <TextField
                required
                fullWidth
                autoFocus
                margin="dense"
                id="email"
                label="Email"
                type="text"
                variant="standard"
              />
              <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
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
              <h3>Enter Your Message here:</h3>
              <textarea
                placeholder="Message"
                style={{ width: "546px", height: "184px" }}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button
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
        <React.Fragment>
          <Dialog open={openProfile} fullScreen>
            <IconButton
              onClick={closeProfileDialog}
              sx={{
                position: "absolute",
                left: 8,
                top: 20,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <div style={{ marginLeft: "40px" }}>
              <h2
                style={{
                  marginLeft: "20px",
                  fontFamily: "Gabarito, sans-serif",
                }}
              >
                <p>{userData && userData.fullName}</p>
              </h2>
            </div>

            <DialogContent dividers>
              <div style={{ display: "flex", lineHeight: "0.5" }}>
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
                <div style={{ marginLeft: "30px" }}>
                  <h3>{userData && userData.userName}</h3>
                  <h3 style={{ color: "gray" }}>{userData && userData.role}</h3>
                  <Button
                    style={{ fontFamily: "Kanit" }}
                    onClick={openAppliedJobDialog}
                  >
                    <BusinessCenterIcon
                      sx={{ fontSize: "18px", marginLeft: "-5px" }}
                    />{" "}
                    Your Jobs
                  </Button>
                </div>
              </div>
              <div>
                <p>
                  <LocationOnIcon sx={{ fontSize: "15px", color: "gray" }} />
                  {userData && userData.location}
                </p>
                <p>
                  Experience:
                  <b style={{ marginLeft: "10px" }}>
                    {userData && userData.experience}
                  </b>
                </p>
                <div style={{ display: "flex" }}>
                  <p>
                    Which company do you work for?
                    <b style={{ marginLeft: "10px" }}>
                      {userData && userData.company}
                    </b>
                  </p>
                </div>
                <div style={{ display: "flex" }}>
                  <p>
                    Which industry is yours?
                    <b style={{ marginLeft: "10px" }}>
                      -{userData && userData.industry}
                    </b>
                  </p>
                </div>

                <div style={{ display: "flex" }}>
                  <p>
                    Education:
                    <b style={{ marginLeft: "10px" }}>
                      {userData && userData.education}
                    </b>
                  </p>
                </div>
                <p>
                  Email:
                  <b style={{ marginLeft: "10px" }}>
                    {" "}
                    {userData && userData.email}
                  </b>
                </p>
                <p>
                  Skill of yours?
                  <b style={{ marginLeft: "10px" }}>
                    {userData && userData.skill}
                  </b>
                </p>
                <Divider />
                <h3>About Me</h3>
                <p>{userData && userData.about}</p>
              </div>
            </DialogContent>
          </Dialog>
        </React.Fragment>
      )}
      {openAppliedJobs && appliedJobs && (
        <React.Fragment>
          <Dialog open={openAppliedJobs} fullScreen>
            <IconButton
              onClick={closeAppliedJobDialog}
              sx={{
                position: "absolute",
                left: 8,
                top: 10,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <div>
              <img
                style={{ width: "15%", marginLeft: "50px" }}
                src={Logo}
                alt=""
              />
            </div>
            <DialogContent dividers>
              {appliedJobs &&
                appliedJobs.map((i, id) => {
                  return (
                    <div
                      style={{
                        marginTop: "20px",
                        padding: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                        backgroundColor: "#e6e6e6",
                        borderLeft: "5px solid #80bfff",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "90%",
                        }}
                      >
                        <img
                          style={{ width: "40px", height: "40px" }}
                          src={i.logo}
                          alt=""
                        />
                        <div style={{ lineHeight: "0.8" }}>
                          <h1 style={{ marginLeft: "20px" }}>{i.job_title}</h1>
                          <p style={{ marginLeft: "20px", color: "#3399ff" }}>
                            {userData && userData.userName} applied this job{" "}
                            {Math.ceil(Math.random() * 10)} min ago
                          </p>
                        </div>
                      </div>
                      <div>
                        <Badge
                          sx={{ marginTop: "-15px" }}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              setAppliedJobs(
                                appliedJobs.filter((val) => val.id !== i.id)
                              );
                            }}
                            sx={{ color: "red" }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Badge>
                      </div>
                    </div>
                  );
                })}
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
