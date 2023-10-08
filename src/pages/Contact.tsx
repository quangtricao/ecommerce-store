import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div>
      <h2>Tell us what you think</h2>
      <Box sx={{ display: "flex", flexDirection: "column", width: "75%", mt: "10px" }}>
        <TextField
          required
          label="Name"
          sx={{ mb: 2 }}
          fullWidth
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          required
          type="email"
          label="Email"
          sx={{ mb: 2 }}
          fullWidth
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label="Message"
          multiline
          minRows={6}
          sx={{ mb: 2 }}
          fullWidth
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <div>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => {
              setName("");
              setEmail("");
              setMessage("");
            }}
          >
            Delete
          </Button>{" "}
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              alert("Thank you for your message");
              setName("");
              setEmail("");
              setMessage("");
            }}
          >
            Contact
          </Button>
        </div>
      </Box>
    </div>
  );
};
export default Contact;
