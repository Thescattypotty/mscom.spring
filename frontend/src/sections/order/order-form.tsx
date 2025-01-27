import { EOrder, type OrderRequest } from 'src/intefaces';

import { useState, useEffect } from 'react';

import { Box, Modal, Stack, Button, TextField, Typography, MenuItem } from '@mui/material';


interface OrderFormProps {
  open: boolean;
  onClose: () => void;
  order?: OrderRequest;
  onSubmit: (order: OrderRequest) => void;
}

export function OrderForm({ open, onClose, order, onSubmit }: OrderFormProps) {
    const [formData, setFormData] = useState<OrderRequest>({
        productId: '',
        quantity: 0,
        status: EOrder.PENDING
    });

    useEffect(() => {
        if (order) {
            setFormData(order);
        }
    }, [order]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
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
            Update Order Status
          </Typography>
          <Stack spacing={3}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              {Object.values(EOrder).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'flex-end' }}>
            <Button onClick={onClose} variant="outlined" color="error">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </Stack>

        </Box>
      </Modal>
    );

}