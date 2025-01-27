import type { ProductRequest } from "src/intefaces";

import { useState, useEffect } from "react";

import {
  Box,
  Modal,
  Stack,
  Button,
  MenuItem,
  TextField,
  Typography,
  InputAdornment
} from "@mui/material";

import { ECategory } from "src/intefaces";

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  product?: ProductRequest;
  onSubmit: (product: ProductRequest) => void;
}

export function ProductForm({ open, onClose, product, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductRequest>({
    name: "",
    description: "",
    category: ECategory.BURGERS,
    imageUrl: "",
    price: 0
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="product-form-title"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" component="h2" sx={{ mb: 4 }}>
          {product ? 'Modifie Product' : 'Add new Product'}
        </Typography>

        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Nom du produit"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            required
          />

          <TextField
            select
            fullWidth
            label="Catégorie"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {Object.values(ECategory).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="URL de l'image"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Prix"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
          />
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'flex-end' }}>
          <Button onClick={onClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {product ? 'Update' : 'Create'}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}