import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import { type ProductResponse } from 'src/intefaces';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------


export function ProductItem({ product }: { product: ProductResponse }) {

    const renderCategory = (
      <Label
        variant="inverted"
        color="success"
        sx={{
          zIndex: 9,
          top: 16,
          right: 16,
          position: 'absolute',
          textTransform: 'uppercase',
        }}
      >
        {product.category.toString()}
      </Label>
    );

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.imageUrl}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {product.price && fCurrency(product.price)}
      </Typography>
      &nbsp;
      {fCurrency(product.price)}
    </Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {product.category && renderCategory}
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          {renderPrice}
        </Box>
      </Stack>
    </Card>
  );
}
