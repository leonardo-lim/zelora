'use client';

import type { ProductType } from '@/types/product-type';
import Image from 'next/image';
import {
    Box,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

interface ProductListProps {
    products: ProductType[];
    quantities: number[];
    setQuantities: React.Dispatch<React.SetStateAction<number[]>>;
}

const ProductList: React.FC<ProductListProps> = ({ products, quantities, setQuantities }) => {
    const decrementQuantity = (idx: number) => {
        const newQuantities = [...quantities];
        newQuantities[idx]--;
        setQuantities(newQuantities);
    };

    const incrementQuantity = (idx: number) => {
        const newQuantities = [...quantities];
        newQuantities[idx]++;
        setQuantities(newQuantities);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="center">Rating</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Subtotal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product, idx) => (
                        <TableRow
                            key={product.id}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0
                                }
                            }}
                        >
                            <TableCell
                                align="center"
                                sx={{
                                    fontSize: '24px'
                                }}
                            >
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <IconButton
                                        size="small"
                                        onClick={() => decrementQuantity(idx)}
                                        disabled={quantities[idx] === 0}
                                        sx={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'black'
                                            }
                                        }}
                                    >
                                        <Remove />
                                    </IconButton>
                                    <Box sx={{ width: '20px' }}>
                                        <Typography variant="h6">{quantities[idx]}</Typography>
                                    </Box>
                                    <IconButton
                                        size="small"
                                        onClick={() => incrementQuantity(idx)}
                                        sx={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'black'
                                            }
                                        }}
                                    >
                                        <Add />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    position: 'relative',
                                    opacity: quantities[idx] === 0 ? 0.5 : 1
                                }}
                            >
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    width={50}
                                    height={0}
                                    style={{
                                        height: 'auto'
                                    }}
                                />
                            </TableCell>
                            <TableCell
                                component="th"
                                scope="row"
                                sx={{
                                    minWidth: '200px',
                                    opacity: quantities[idx] === 0 ? 0.5 : 1
                                }}
                            >
                                {product.title}
                            </TableCell>
                            <TableCell
                                sx={{
                                    minWidth: '250px',
                                    opacity: quantities[idx] === 0 ? 0.5 : 1
                                }}
                            >
                                {product.description}
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    opacity: quantities[idx] === 0 ? 0.5 : 1
                                }}
                            >
                                {product.rating.rate}
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    opacity: quantities[idx] === 0 ? 0.5 : 1
                                }}
                            >
                                ${product.price}
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    opacity: quantities[idx] === 0 ? 0.5 : 1
                                }}
                            >
                                ${(product.price * (quantities[idx] ?? 0)).toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductList;