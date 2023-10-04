import { Button, TextField, Grid, Box, Typography, Container } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

type SignInFormProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setSignIn: Dispatch<SetStateAction<boolean>>;
};

const SignInForm = ({ handleSubmit, setSignIn }: SignInFormProps) => {
  const [email, setEmail] = useState("");
  const emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/);

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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button type="button" onClick={() => setSignIn(false)}>
                Don't have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignInForm;
