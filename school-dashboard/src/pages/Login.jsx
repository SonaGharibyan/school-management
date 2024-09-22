import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Assuming react-router-dom is being used

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { email, password } });

      localStorage.setItem("token", data.login);
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
        Login
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Login
        </Button>
        <Button
          variant="text"
          color="secondary"
          fullWidth
          onClick={() => navigate("/signup")}
          style={{ marginTop: "16px" }}
        >
          Don't have an account? Sign Up
        </Button>
      </form>
    </Box>
  );
};

export { Login };
