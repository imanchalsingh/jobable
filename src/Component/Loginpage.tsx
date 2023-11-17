import React, { useState } from "react";
import Logo from "./logo.png";
import Halflogo from "./halflogo.png";
import { DialogContent, IconButton } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import DialogActions from "@mui/material/DialogActions";

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
  const notify = () => toast("Welcome to Jobable!");
  const history = useNavigate();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const open = () => {
    setLoginDialogOpen(true);
  };
  const close = () => {
    setLoginDialogOpen(false);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
          textAlign: "center",
          alignItems: "center",
          marginTop: "-2%",
        }}
      >
        <div>
          <img src={Logo} alt="logo" />
        </div>
        <div>
          <h1>Welcome to Jobable.com</h1>
          <p>This is our official website for job search</p>
          <button
            onClick={open}
            style={{
              width: "38%",
              padding: "10px 20px",
              backgroundColor: "#008ae6",
              fontSize: "20px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Login
            <LoginIcon />
          </button>
        </div>
        <p style={{ color: "gray" }}>
          Don't have an account?<a href="/">sign in</a>
        </p>
      </div>
      {loginDialogOpen && (
        <React.Fragment>
          <Dialog
            sx={{ padding: "50px 10px 50px 10px" }}
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
                fontSize: "30px",
                fontFamily: "Gabarito, sans-serif",
                fontWeight: "bold",
                display: "flex",
                padding: "10px 20px",
              }}
            >
              <div>
                <img style={{ width: "35px" }} src={Halflogo} alt="" />
              </div>
              <div style={{ marginLeft: "10px" }}>Login</div>
            </div>
            <DialogContent dividers>
              <form>
                <div>
                  <TextField
                    autoComplete="off"
                    required
                    autoFocus
                    margin="dense"
                    id="name"
                    label="First Name"
                    type="text"
                    variant="standard"
                    
                  />
                  <TextField
                    sx={{ marginLeft: "30px" }}
                    autoComplete="off"
                    required
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Last Name"
                    type="text"
                    variant="standard"
                  />
                </div>
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email"
                  type="email"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoComplete="off"
                  required
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Location"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <h5>Educational Informations</h5>
                <div>
                  <TextField
                    autoComplete="off"
                    required
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Role"
                    type="text"
                    variant="standard"
                  />
                  <TextField
                    sx={{ marginLeft: "30px" }}
                    autoComplete="off"
                    required
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Experience"
                    type="number"
                    variant="standard"
                  />
                </div>
                <TextField
                  autoComplete="off"
                  required
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Company"
                  fullWidth
                  type="text"
                  variant="standard"
                />

                <Box component="form" noValidate autoComplete="off">
                  <div>
                    <TextField
                      fullWidth
                      id="standard-select-currency"
                      select
                      label="Industry"
                      variant="standard"
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
                  autoComplete="off"
                  required
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Education"
                  fullWidth
                  type="text"
                  variant="standard"
                />
                <TextField
                  autoComplete="off"
                  required
                  autoFocus
                  margin="dense"
                  id="name"
                  fullWidth
                  label="Skills"
                  type="text"
                  variant="standard"
                />
              </form>
            </DialogContent>
            <DialogActions>
              <button
                onClick={() => {
                  close();
                  notify();
                  setTimeout(() => {
                    history("/job-description");
                  }, 2000);
                }}
                style={{
                  width: "25%",
                  padding: "8px 20px",
                  backgroundColor: "#00cc7a",
                  fontSize: "20px",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginLeft: "71%",
                }}
              >
                Save
              </button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
      <div>
        <ToastContainer />
      </div>
    </>
  );
}
