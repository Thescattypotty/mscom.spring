import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from "@mui/material";

import { visuallyHidden } from "../user/utils";


type OrderTableHeadProps = {
    orderBy: string;
    rowCount: number;
    numSelected: number;
    order: 'asc' | 'desc';
    onSort: (id: string) => void;
    headLabel: Record<string, any>[];
    onSelectAllRows: (checked: boolean) => void;
}


export function OrderTableHead({
    order,
    onSort,
    orderBy,
    rowCount,
    headLabel,
    numSelected,
    onSelectAllRows,
}: OrderTableHeadProps) {
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onSelectAllRows(event.target.checked)
              }
            />
          </TableCell>

          {headLabel.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.align || 'left'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ width: headCell.width, minWidth: headCell.minWidth }}
            >
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={() => onSort(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box sx={{ ...visuallyHidden }}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}