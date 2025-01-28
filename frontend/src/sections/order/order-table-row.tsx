import type { OrderResponse, ProductResponse } from "src/intefaces";

import { useState, useCallback } from "react";

import { Box, Popover, Checkbox, TableRow, MenuList, MenuItem, TableCell, IconButton, menuItemClasses } from "@mui/material";

import { Iconify } from "src/components/iconify";



type OrderTableRowProps = {
    row: OrderResponse;
    prod: ProductResponse;
    selected: boolean;
    onSelectRow: () => void;
    editOrder: (id: string) => void;
};

export function OrderTableRow({
    row,
    prod,
    selected,
    onSelectRow,
    editOrder,
}: OrderTableRowProps){
    const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
    
      const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenPopover(event.currentTarget);
      }, []);
    
      const handleClosePopover = useCallback(() => {
        setOpenPopover(null);
      }, []);
    
      const onEdit = () => {
        handleClosePopover();
        editOrder(row.id); // Supposant que `row` a une propriété `id`
      };

      return (
        <>
          <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
            <TableCell padding="checkbox">
              <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
            </TableCell>
            <TableCell component="th" scope="row">
              <Box gap={2} display="flex" alignContent="center">
                {prod?.name ?? 'N/A'}
              </Box>
            </TableCell>
            <TableCell>{row.quantity}</TableCell>
            <TableCell>{row.totalPrice}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.createdAt.toString()}</TableCell>
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
                    Change Status
              </MenuItem>

            </MenuList>
          </Popover>
        </>
      );
}