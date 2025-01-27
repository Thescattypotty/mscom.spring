import type { UserRequest } from "src/intefaces";

import { useState, useEffect } from "react";

import {
  Box,
  Modal,
  Stack,
  Button,
  TextField,
  Typography
} from "@mui/material";


interface UserFormProps {
  open: boolean;
  onClose: () => void;
  user?: UserRequest;
  onSubmit: (user: UserRequest) => void;
}

export function UserForm({ open, onClose, user, onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState<UserRequest>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roles: [],
    birthday: new Date()
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-form-title"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" component="h2" sx={{ mb: 4 }}>
          {user ? "Modifier l'utilisateur" : "Créer un nouvel utilisateur"}
        </Typography>

        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Prénom"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Nom de famille"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Date de naissance"
            name="birthday"
            type="date"
            value={formData.birthday.toISOString().split("T")[0]}
            onChange={handleChange}
            required
          />
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: "flex-end" }}>
          <Button onClick={onClose} variant="outlined" color="error">
            Annuler
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {user ? "Mettre à jour" : "Créer"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}