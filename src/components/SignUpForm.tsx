import { Button, TextField, Grid, Box, Typography, Container } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

type SignUpFormProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setSignIn: Dispatch<SetStateAction<boolean>>;
};

const SignUpFom = ({ handleSubmit, setSignIn }: SignUpFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/);
  const passwordRegex = new RegExp(/^(?=.*[!@#$%^&*.])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoFocus
          />
          <TextField
            value={email}
            onChange={(event) => setEmail(event?.target.value)}
            error={email.length === 0 ? false : !emailRegex.test(email)}
            helperText={email.length === 0 ? "" : "Please provide correct email format"}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            value={password}
            onChange={(event) => setPassword(event?.target.value)}
            error={password.length === 0 ? false : !passwordRegex.test(password)}
            helperText={
              password.length === 0
                ? ""
                : "Password must have at least 6 characters and include 1 uppercase, 1 lowercase, 1 number and 1 special characters"
            }
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="avatar"
            label="Avatar link"
            id="avatar"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button type="button" onClick={() => setSignIn(true)}>
                Already have an account? Sign in
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpFom;
