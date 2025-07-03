'use client';

import type { ChangeEvent } from 'react';
import type { CartType } from '@/types/cart-type';
import { useMemo, useState } from 'react';
import {
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import { formatDate } from '@/utils/date';

interface CartTableProps {
    carts: CartType[];
    getCartProducts: (cartId: number) => void;
}

const CartTable: React.FC<CartTableProps> = ({ carts, getCartProducts }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const visibleRows = useMemo(() => {
        return [...carts].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [carts, page, rowsPerPage]);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    return (
        <Stack direction="column" spacing={1}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Date Created</TableCell>
                            <TableCell>Total Items</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((cart) => (
                            <TableRow
                                key={cart.id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0
                                    }
                                }}
                            >
                                <TableCell component="th" scope="row">{cart.id}</TableCell>
                                <TableCell>{formatDate(cart.date)}</TableCell>
                                <TableCell>{cart.products.length}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            backgroundColor: 'black'
                                        }}
                                        onClick={() => getCartProducts(cart.id)}
                                    >
                                        View Cart
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                rowsPerPageOptions={[5]}
                count={carts.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Stack>
    );
};

export default CartTable;