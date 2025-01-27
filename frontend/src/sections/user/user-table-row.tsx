import type { UserResponse } from 'src/intefaces';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type UserTableRowProps = {
  row: UserResponse;
  selected: boolean;
  onSelectRow: () => void;
  editUser: (id: string) => void; // Ajout de la fonction editUser
  handleDelete: (id: string) => void; // Ajout de la fonction handleDelete
};

export function UserTableRow({
  row,
  selected,
  onSelectRow,
  editUser,
  handleDelete,
}: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const onEdit = () => {
    handleClosePopover();
    editUser(row.id); // Supposant que `row` a une propriété `id`
  };

  const onDelete = () => {
    handleClosePopover();
    handleDelete(row.id); // Supposant que `row` a une propriété `id`
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar
              alt={row.firstName}
              src="https://free.minimals.cc/assets/images/avatar/avatar-25.webp"
            />
            {row.firstName} {row.lastName}
          </Box>
        </TableCell>

        <TableCell>{row.email}</TableCell>

        <TableCell>{row.roles}</TableCell>

        <TableCell>{row.birthday.toString()}</TableCell>

        <TableCell>{row.createdAt.toString()}</TableCell>
        <TableCell>{row.updatedAt.toString()}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={onEdit}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
