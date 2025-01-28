import type { Pageable, OrderResponse, ProductResponse, PeagableResponse } from "src/intefaces";

import { useState, useEffect, useCallback } from "react";

import { Box, Card, Table, Button, TableBody, Typography, TableContainer, TablePagination } from "@mui/material";

import { useRouter } from "src/routes/hooks";

import { useAuth } from "src/context/AuthContext";
import { listOrders } from "src/services/order-service";
import { DashboardContent } from "src/layouts/dashboard";
import { getProduct } from "src/services/product.service";

import { Iconify } from "src/components/iconify";
import { Scrollbar } from "src/components/scrollbar";

import { TableNoData } from "../table-no-data";
import { OrderTableRow } from "../order-table-row";
import { OrderTableHead } from "../order-table-head";
import { TableEmptyRows } from "../table-empty-rows";
import { OrderTableToolbar } from "../order-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";

export function OrderView(){
    const router = useRouter();
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pageableResponse, setPageableResponse] = useState<PeagableResponse<OrderResponse>>();
    const [pageable, setPageable] = useState<Pageable>({
        page: 0,
        size: 5,
        sortBy: 'createdAt',
        order: 'desc'
    });

    const [productMap, setProductMap] = useState<Record<string, ProductResponse>>({});

    const fetchOrders = useCallback(async () => {
      const { data } = await listOrders(pageable);
      setPageableResponse(data);
      setOrders(data.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const loadProducts = useCallback(async () => {
        const newMap = { ...productMap };
        console.log('orders', orders);
        await Promise.all(
          orders.map(async (order) => {
            if (!newMap[order.productId]) {
              const { data } = await getProduct(order.productId);
              newMap[order.productId] = data;
            }
          })
        );
        setProductMap(newMap);
        console.log('productMap', newMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    useEffect(() => {
        fetchOrders();
        loadProducts();
      setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageable, setOrders]);

    const { user , isAuthenticated } = useAuth();

    const table = useTable(pageable, setPageable);

    const editOrder = async(id: string) => {
        console.log("edit order", id);
    }

    const [filterName, setFilterName] = useState<string>('');
    const dataFiltred: OrderResponse[] = applyFilter({
      inputData: orders,
      comparator: getComparator(table.order, table.orderBy),
      filterName,
    });

    const notFound = !dataFiltred.length && !!filterName;

    return (
      <DashboardContent>
        <Box display="flex" alignItems="center" mb={5}>
          <Typography variant="h4">Orders</Typography>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => router.push('/products')}
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Make an order
          </Button>
        </Box>
        <Card>
          <OrderTableToolbar
            numSelected={table.selected.length}
            filterName={filterName}
            onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFilterName(event.target.value);
              table.onResetPage();
            }}
          />
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <OrderTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  rowCount={pageableResponse?.totalElements || 0}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltred.map((u) => u.id)
                    )
                  }
                  headLabel={[
                    { id: 'name', label: 'Product Name' },
                    { id: 'quantity', label: 'Quantity' },
                    { id: 'totalPrice', label: 'Total Price' },
                    { id: 'status', label: 'Status' },
                    { id: 'createdAt', label: 'Created At' },
                    { id: '' },
                  ]}
                />
                {!isLoading ? (
                  <TableBody>
                    {dataFiltred
                      .slice(
                        table.page * table.rowsPerPage,
                        table.page * table.rowsPerPage + table.rowsPerPage
                      )
                      .map((row) => (
                        <OrderTableRow
                          key={row.id}
                          row={row}
                          editOrder={editOrder}
                          prod={productMap[row.productId]}
                          selected={table.selected.includes(row.id)}
                          onSelectRow={() => table.onSelectRow(row.id)}
                        />
                      ))}
                    <TableEmptyRows
                      height={68}
                      emptyRows={emptyRows(
                        table.page,
                        table.rowsPerPage,
                        pageableResponse?.totalElements || 0
                      )}
                    />
                    {notFound && <TableNoData searchQuery={filterName} />}
                  </TableBody>
                ) : (
                  <Typography>Loading...</Typography>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            component="div"
            page={pageable.page} // Étape 2 : utiliser page au format 0-based
            count={pageableResponse?.totalElements || 0}
            rowsPerPage={pageable.size}
            onPageChange={(_, newPage) => setPageable((prev) => ({ ...prev, page: newPage }))}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={(event) => {
              const newSize = parseInt(event.target.value, 10);
              setPageable((prev) => ({ ...prev, size: newSize, page: 0 }));
            }}
          />
        </Card>
      </DashboardContent>
    );
}

export function useTable(pageable: Pageable, setPageable: (value: Pageable) => void) {

  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      const newOrder = isAsc ? 'desc' : 'asc';
      setOrder(newOrder);
      setOrderBy(id);
      // @ts-ignore
      setPageable((prev: Pageable): Pageable => ({ ...prev, sortBy: id, order: newOrder as 'asc' | 'desc' })
      );
    },
    [order, orderBy, setPageable]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

 return {
   page: pageable.page,
   order,
   orderBy,
   selected,
   rowsPerPage: pageable.size,
   onSort,
   onSelectRow: useCallback((inputValue: string) => {
     setSelected((prev) =>
       prev.includes(inputValue)
         ? prev.filter((value) => value !== inputValue)
         : [...prev, inputValue]
     );
   }, []),
   onResetPage: useCallback(() => {
    // @ts-ignore
     setPageable((prev: Pageable): Pageable => ({ ...prev, page: 0 }));
   }, [setPageable]),
   onSelectAllRows,
   onChangeRowsPerPage: useCallback(
     (event: React.ChangeEvent<HTMLInputElement>) => {
       const newSize = parseInt(event.target.value, 10);
       // @ts-ignore
       setPageable((prev: Pageable): Pageable => ({ ...prev, size: newSize, page: 0 }));
     },
     [setPageable]
   ),
 };
}
