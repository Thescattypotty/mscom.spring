import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { EOrder, type OrderRequest, type ProductResponse } from "src/intefaces";


interface OrderFormProps {
    open: boolean;
    onClose: () => void;
    product: ProductResponse;
    onSubmit: (order: OrderRequest) => void;
}

export function MakeOrderForm({ open, onClose, product, onSubmit }: OrderFormProps) {
    const [formData, setFormData] = useState<OrderRequest>({
        productId: product.id,
        quantity: 1,
        status: EOrder.PENDING
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity' ? Number(value) : value
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
      <Modal open={open} onClose={onClose} aria-labelledby="order-form-title">
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
            Make Order for {product.name}
          </Typography>
          <Stack spacing={3}>
            <TextField
              name="quantity"
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'flex-end' }}>
            <Button onClick={onClose} variant="outlined" color="error">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Make Order
            </Button>
          </Stack>
        </Box>
      </Modal>
    );
};