import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { listProducts } from 'src/services/product.service';
import { ECategory, PeagableResponse, type Pageable, type ProductResponse } from 'src/intefaces';

import { ProductItem } from '../product-item';
import { ProductSort } from '../product-sort';
import { CartIcon } from '../product-cart-widget';
import { ProductFilters } from '../product-filters';

import type { FiltersProps } from '../product-filters';

// ----------------------------------------------------------------------


const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  ...Object.values(ECategory).map((category) => ({
    value: category,
    label: category,
  })),
];


const defaultFilters = {
  category: CATEGORY_OPTIONS[0].value,
};

export function ProductsView() {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [pageableResponse , setPageableResponse] = useState<PeagableResponse<ProductResponse>>();
    const [pageable, setPeagable] = useState<Pageable>({
      page: 1,
      size: 10,
      sortBy: 'price',
      order: 'desc',
    });



    useEffect(() => {
        fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageable]);

    const fetchProducts = async () => {
        const { data } = await listProducts(pageable);
        setPageableResponse(data);
        setProducts(data.content);
        console.log(data);
    };

    const [sortBy, setSortBy] = useState('price');

    const [openFilter, setOpenFilter] = useState(false);

    const [filters, setFilters] = useState<FiltersProps>(defaultFilters);

    const handleOpenFilter = useCallback(() => {
        setOpenFilter(true);
    }, []);

    const handleCloseFilter = useCallback(() => {
        setOpenFilter(false);
    }, []);

    const handleSort = useCallback((newSort: string) => {
        setSortBy(newSort);
    }, []);

    const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
        setFilters((prevValue) => ({ ...prevValue, ...updateState }));
    }, []);

    const canReset = Object.keys(filters).some(
        (key) => filters[key as keyof FiltersProps] !== defaultFilters[key as keyof FiltersProps]
    );

    return (
      <DashboardContent>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <CartIcon totalItems={8} />

        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap-reverse"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Box gap={1} display="flex" flexShrink={0} sx={{ my: 1 }}>
            <ProductFilters
              canReset={canReset}
              filters={filters}
              onSetFilters={handleSetFilters}
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              onResetFilter={() => setFilters(defaultFilters)}
              options={{
                categories: CATEGORY_OPTIONS
              }}
            />

            <ProductSort
              sortBy={sortBy}
              onSort={handleSort}
              options={[
                { value: 'createdAtDesc', label: 'Newest' },
                { value: 'createdAtAsc', label: 'Oldest' },
                { value: 'priceDesc', label: 'Price: High-Low' },
                { value: 'priceAsc', label: 'Price: Low-High' },
              ]}
            />
          </Box>
        </Box>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid key={product.id} xs={12} sm={6} md={3}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </Grid>

        <Pagination count={pageableResponse?.totalElements} color="primary" sx={{ mt: 8, mx: 'auto' }} />
      </DashboardContent>
    );
}
