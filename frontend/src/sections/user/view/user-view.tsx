import React, { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useAuth } from 'src/context/AuthContext';
import { DashboardContent } from 'src/layouts/dashboard';
import { getUser, listUsers, createUser, updateUser, deleteUser } from 'src/services/user.service';
import { ERole, type Pageable, type UserRequest,type UserResponse,type PeagableResponse } from 'src/intefaces';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { UserForm } from '../user-form';
import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export function UserView() {
    const [users , setUsers] = useState<UserResponse[]>([]);
    const [pageableResponse, setPeagableResponse] = useState<PeagableResponse<UserResponse>>();
    const [pageable, setPeagable] = useState<Pageable>({
        page: 0, // Étape 1 : passer à 0-based
        size: 5,
        sortBy: 'createdAt',
        order: 'desc',
    });
    const { user } = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    
    const table = useTable(pageable, setPeagable);
    
    useEffect(() => {
        fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageable, setPeagable]);

    const fetchUsers = async () => {
        console.log("fetching users");
        const { data } = await listUsers(pageable);
        console.log(data);
        setPeagableResponse(data);
        setUsers(data.content);
    };

    

    const [formUser, setFormUser] = useState<UserRequest | undefined>();
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);


    const handleOpen = () => {
      setOpen(true);
      console.log('open');
      renderForm();
    };

    const createNewUser = async (newUser: UserRequest) => {
        await createUser(newUser);
        fetchUsers();
    }

    const fetchUser = async (userId: string) => {
        const { data } = await getUser(userId);
        return {
            firstName: data.firstName,
            lastName: data.lastName,
            password: "",
            email: data.email,
            roles: data.roles,
            birthday: new Date(data.birthday),
        } as UserRequest;
    }

    const updateAUser = async (updatedUser: UserRequest) => {
        try {
            if(!selectedUserId) return;
            await updateUser(selectedUserId, updatedUser);
            handleClose();
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    }

    const editUser = async (userId: string) => {
        setSelectedUserId(userId);
        const userFettched = await fetchUser(userId);
        setFormUser(userFettched);
        setOpen(true);
        renderForm();
    }

    const handleClose = () => {
        setOpen(false);
        setFormUser(undefined);
        setSelectedUserId(null);
    };

    useEffect(() => {
        if(selectedUserId) {
            fetchUser(selectedUserId).then(setFormUser);
        } else {
            setFormUser(undefined);
        }
    }, [selectedUserId]);

    const renderForm = () => (
      <UserForm
        open={open}
        onClose={handleClose}
        user={formUser}
        onSubmit={selectedUserId ? updateAUser : createNewUser}
      />
    );

    const renderButton = !user?.roles.includes(ERole.ROLE_ADMIN) ? (
        <Button
            variant="contained"
            color="inherit"
            onClick={handleOpen}
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New user
          </Button>
    ): (
        <></>
    );

    const handleDelete = async (id: string) => {
        await deleteUser(id);
        fetchUsers();
    };
    
    const [filterName, setFilterName] = useState('');

    const dataFiltered: UserResponse[] = applyFilter({
        inputData: users,
        comparator: getComparator(table.order, table.orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
      <DashboardContent>
        <Box display="flex" alignItems="center" mb={5}>
          <Typography variant="h4" flexGrow={1}>
            Users
          </Typography>
          {renderButton}
          {open && renderForm()}
        </Box>

        <Card>
          <UserTableToolbar
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
                <UserTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  rowCount={pageableResponse?.totalElements || 0}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((u) => u.id)
                    )
                  }
                  headLabel={[
                    { id: 'fullName', label: 'Full Name' },
                    { id: 'email', label: 'Email' },
                    { id: 'roles', label: 'Roles' },
                    { id: 'birthday', label: 'Birthday' },
                    { id: 'createdAt', label: 'CreatedAt' },
                    { id: 'updatedAt', label: 'UpdatedAt' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        editUser={editUser}
                        handleDelete={handleDelete}
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
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            component="div"
            page={pageable.page} // Étape 2 : utiliser page au format 0-based
            count={pageableResponse?.totalElements || 0}
            rowsPerPage={pageable.size}
            onPageChange={(_, newPage) => setPeagable((prev) => ({ ...prev, page: newPage }))}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={(event) => {
              const newSize = parseInt(event.target.value, 10);
              setPeagable((prev) => ({ ...prev, size: newSize, page: 0 }));
            }}
          />
        </Card>
      </DashboardContent>
    );
}

// ----------------------------------------------------------------------

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
