import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import { Grid, Button, Pagination, Typography, IconButton } from '@mui/material';

import { useAuth } from 'src/context/AuthContext';
import { DashboardContent } from 'src/layouts/dashboard';
import { createOrder } from 'src/services/order-service';
import { getProduct, listProducts, createProduct, updateProduct, deleteProduct } from 'src/services/product.service';
import { ERole, type Pageable, type ProductRequest, type ProductResponse, type PeagableResponse, OrderRequest } from 'src/intefaces';

import { Iconify } from 'src/components/iconify';

import { ProductForm } from '../product-form';
import { ProductItem } from '../product-item';
import { ProductSort } from '../product-sort';
import { MakeOrderForm } from '../order-form';
import { CartIcon } from '../product-cart-widget';

// ----------------------------------------------------------------------

export function ProductsView() {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const { user } = useAuth();
    const [pageableResponse , setPageableResponse] = useState<PeagableResponse<ProductResponse>>();
    const [pageable, setPeagable] = useState<Pageable>({
      page: 1,
      size: 8,
      sortBy: 'price',
      order: 'desc',
    });

    const [open, setOpen] = useState<boolean>(false);
    const [openOrder, setOpenOrder] = useState<boolean>(false);

    const fetchProducts = async () => {
        const { data } = await listProducts(pageable);
        setPageableResponse(data);
        setProducts(data.content);
    };
    useEffect(() => {
      fetchProducts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageable]);

    const [sortBy, setSortBy] = useState('price');


    const handleSort = useCallback((newSort: string) => {
        setSortBy(newSort);
        const [field, orderBy] = newSort.includes('Asc')
          ? [newSort.replace('Asc', ''), 'asc']
          : [newSort.replace('Desc', ''), 'desc'];

        setPeagable((prev) => ({
          ...prev,
          page: 1, // Retour à la première page
          sortBy: field,
          order: orderBy,
        }));
    }, []);

    const handleOpen = () => {
        setOpen(true);
        console.log('open');
        renderForm();
    };

    const handleClose = () => setOpen(false);

    const handleOpenOrder = () => {
        setOpenOrder(true);
        renderMakeOrderForm();
    }
    const handleCloseOrder = () => setOpenOrder(false);

    const createNewProduct = async (product: ProductRequest) => {
        await createProduct(product);
        fetchProducts();
    };

    const getAProduct = async (id: string) => {
        const { data } = await getProduct(id);
        return {
            name: data.name,
            description: data.description,
            category: data.category,
            imageUrl: data.imageUrl,
            price: data.price,
        } as ProductRequest;
    }

    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    const updateAProduct = async (product: ProductRequest) => {
      try {
        if (!selectedProductId) return;
        await updateProduct(selectedProductId, product);
        handleClose();
        setSelectedProductId(null);
        fetchProducts();
      } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
      }
    };

    const editProduct = async (id: string) => {
      setSelectedProductId(id);
      const product = await getAProduct(id);
      setFormProduct(product);
      setOpen(true);
      renderForm();
    };


    const [formProduct, setFormProduct] = useState<ProductRequest | undefined>();

    useEffect(() => {
      if (selectedProductId) {
        getAProduct(selectedProductId).then(setFormProduct);
      } else {
        setFormProduct(undefined);
      }
    }, [selectedProductId]);

    const renderForm = () => (
      <ProductForm
        open={open}
        onClose={() => {
          handleClose();
          setSelectedProductId(null);
        }}
        product={formProduct}
        onSubmit={selectedProductId ? updateAProduct : createNewProduct}
      />
    );

    const [productIdToOrder, setProductIdToOrder] = useState<string | null>(null);
    const [productOrder, setProductOrder] = useState<ProductResponse | undefined>(undefined);

    useEffect(() => {
        if(productIdToOrder) {
            fetchProduct(productIdToOrder).then(setProductOrder);
            console.log('fetching product');
        }else{
            setProductOrder(undefined);
            console.log('no product to fetch');
        }
    },[productIdToOrder]);

    const fetchProduct = async (productId: string) => {
        const { data } = await getProduct(productId);
        return data;
    }
    const openOrderButton = (productId: string) => {
        setProductIdToOrder(productId);
        handleOpenOrder();
    }

    const handleMakeOrder = async (order: OrderRequest) => {
        await createOrder(order);
        handleCloseOrder();
        setProductIdToOrder(null);
        setProductOrder(undefined);
    }

    const renderMakeOrderForm = () => productOrder && (
        <MakeOrderForm
            open={openOrder}
            onClose={handleCloseOrder}
            product={productOrder}
            onSubmit={handleMakeOrder}
            />
    )

    const renderButton = !user?.roles.includes(ERole.ROLE_ADMIN) ? (
    <Button 
      variant='contained' 
      onClick={handleOpen} 
      sx={{ mb: 5, width: 'fit-content' }}
    >
      Add Product
    </Button>
    ) : (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <></>
    );

    const handleDelete = async (id: string) => {
        await deleteProduct(id);
        fetchProducts();
    };


    const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, newPage: number) => {
      setPeagable((prev) => ({
        ...prev,
        page: newPage,
      }));
    }, []);

    return (
      <DashboardContent>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        {renderButton}

        {open && renderForm()}

        {openOrder && renderMakeOrderForm()}

        <CartIcon totalItems={8} />

        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap-reverse"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Box gap={1} display="flex" flexShrink={0} sx={{ my: 1 }}>
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
              <Button onClick={() => openOrderButton(product.id)}>Make Order</Button>
              <IconButton onClick={() => editProduct(product.id)}>
                <Iconify width={24} icon="mdi-light:pencil" />
              </IconButton>
              <IconButton onClick={() => handleDelete(product.id)}>
                <Iconify width={24} icon="mdi-light:delete" />
              </IconButton>
            </Grid>
          ))}
        </Grid>

        <Pagination
          page={pageable.page}
          count={Math.ceil((pageableResponse?.totalElements || 0) / pageable.size)}
          color="primary"
          sx={{ mt: 8, mx: 'auto' }}
          onChange={handlePageChange}
        />
      </DashboardContent>
    );
}
