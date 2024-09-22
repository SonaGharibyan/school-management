import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../graphql/mutations";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router-dom

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [signup, { loading, error }] = useMutation(SIGNUP_USER);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signup({
        variables: {
          email,
          password,
          role,
        },
      });

      localStorage.setItem("token", data.signup);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={5}
    >
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 360 }}>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <Select
          fullWidth
          value={role}
          onChange={(e) => setRole(e.target.value)}
          margin="normal"
          variant="outlined"
        >
          <MenuItem value="ADMIN">Admin</MenuItem>
          <MenuItem value="TEACHER">Teacher</MenuItem>
          <MenuItem value="PUPIL">Pupil</MenuItem>
        </Select>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Sign Up
        </Button>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">Error: {error.message}</Typography>}
        <Button
          variant="text"
          color="secondary"
          fullWidth
          onClick={() => navigate("/login")}
          style={{ marginTop: "16px" }}
        >
          Already have an account? Go to Login
        </Button>
      </form>
    </Box>
  );
};

export { Signup };
