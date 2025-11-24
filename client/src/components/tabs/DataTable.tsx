import { useState, type ReactNode } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';
import { notionColors } from '../../theme';

export interface Column<T> {
  header: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  render: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  loading: boolean;
  columns: Column<T>[];
  emptyIcon?: ReactNode;
  emptyTitle: string;
  emptyMessage: string;
  loadingMessage: string;
  getItemId: (item: T) => number;
}

export default function DataTable<T>({
  data,
  loading,
  columns,
  emptyIcon,
  emptyTitle,
  emptyMessage,
  loadingMessage,
  getItemId,
}: DataTableProps<T>) {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  const handleSelectItem = (itemId: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === data.length) {
      // Deselect all
      setSelectedItems(new Set());
    } else {
      // Select all
      const allIds = new Set(data.map(item => getItemId(item)));
      setSelectedItems(allIds);
    }
  };

  const allSelected = data.length > 0 && selectedItems.size === data.length;
  const someSelected = selectedItems.size > 0 && selectedItems.size < data.length;

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="body1" sx={{ color: notionColors.text.secondary }}>
          {loadingMessage}
        </Typography>
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box sx={{ border: `1px solid ${notionColors.border.default}`, borderRadius: '3px', p: 6, textAlign: 'center' }}>
        {emptyIcon}
        <Typography variant="h6" sx={{ mb: 1, fontSize: '16px', fontWeight: 500 }}>
          {emptyTitle}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '14px' }}>
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer sx={{ width: '100%' }}>
        <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '20px', minWidth: '20px', maxWidth: '20px' }}></TableCell>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{
                    width: column.width || '150px',
                    minWidth: column.minWidth || '100px',
                    maxWidth: column.maxWidth || '100px',
                  }}
                >
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={getItemId(item)}>
                <TableCell sx={{ width: '20px', minWidth: '20px', maxWidth: '20px' }}>
                  <Checkbox
                    checked={selectedItems.has(getItemId(item))}
                    onChange={() => handleSelectItem(getItemId(item))}
                    size="small"
                  />
                </TableCell>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      width: column.width || '150px',
                      minWidth: column.minWidth || '100px',
                      maxWidth: column.maxWidth || '100px',
                    }}
                  >
                    {column.render(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

