// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { loginSuccess } from "../features/auth/authSlice";
// import apiClient from "../api/apiClient";
// import { useSnackbar } from "notistack";
// import {
//   Button,
//   TextField,
//   Box,
//   Typography,
//   Container,
//   CircularProgress,
//   Paper,
//   Avatar,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// // import apiClient from "../api/apiClient";

// const LoginPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     const data = new FormData(event.currentTarget);
//     const email = data.get("email");
//     const password = data.get("password");

//     try {
//       // --- THIS IS THE CORRECT AND FINAL API CALL SEQUENCE ---

//       // 1. Manually create the full, correct URL for the CSRF cookie request.
//       // We do this because it's outside our standard '/api' base path.
//       const csrfUrl = `${
//         import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
//       }/sanctum/csrf-cookie`;
//             // const baseUrl = apiClient.defaults.baseURL.replace(/\/api$/, "");
//             // const csrfUrl = `${baseUrl}/sanctum/csrf-cookie`;
//       await apiClient.get(csrfUrl);

//       // 2. Now that the cookie is set, attempt the actual login using the standard base URL.
//       const response = await apiClient.post("/login", { email, password });

//       if (response.data.token) {
//         localStorage.setItem("authToken", response.data.token);
//         dispatch(
//           loginSuccess({ user: response.data.user, token: response.data.token })
//         );
//         navigate("/dashboard");
//       } else {
//         enqueueSnackbar("Login failed: No token received.", {
//           variant: "error",
//         });
//       }
//     } catch (error) {
//       console.error(
//         "Login failed:",
//         error.response ? error.response.data : error.message
//       );
//       const message =
//         error.response?.data?.message || "Please check your credentials.";
//       enqueueSnackbar(`Login failed! ${message}`, { variant: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper
//         elevation={6}
//         sx={{
//           marginTop: 8,
//           p: 4,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           AK-Vistion Admin
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             defaultValue="admin@akvistion.com"
//             autoFocus
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             defaultValue="password"
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//             disabled={loading}
//           >
//             {loading ? (
//               <CircularProgress size={24} color="inherit" />
//             ) : (
//               "Sign In"
//             )}
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default LoginPage;


// ??
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../features/auth/authSlice";
import apiClient from "../api/apiClient"; // Use our configured client
import { useSnackbar } from "notistack";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  CircularProgress,
  Paper,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      // --- THIS IS THE FINAL, CORRECTE SEQUENCE ---
      // 1. Get the base API URL from our central client.
      const apiUrl = apiClient.defaults.baseURL;

      // 2. Construct the root domain URL for the CSRF cookie request.
      const rootUrl = new URL(apiUrl).origin;
      await apiClient.get(`${rootUrl}/sanctum/csrf-cookie`);

      // 3. Now, attempt the actual login using the relative path.
      const response = await apiClient.post("/login", { email, password });

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        dispatch(
          loginSuccess({ user: response.data.user, token: response.data.token })
        );
        navigate("/dashboard");
      } else {
        enqueueSnackbar("Login failed: No token received.", {
          variant: "error",
        });
      }
    } catch (error) {

      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      const message =
        error.response?.data?.message || "Please check your credentials.";
      enqueueSnackbar(`Login failed! ${message}`, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          AK-Vistion Admin
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;