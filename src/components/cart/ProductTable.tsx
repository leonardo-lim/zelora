'use client';

import type { ProductType } from '@/types/product-type';
import Image from 'next/image';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';

interface ProductTableProps {
    cartProducts: ProductType[];
}

const ProductTable: React.FC<ProductTableProps> = ({ cartProducts }) => {
    return (
        <TableContainer
            component={Paper}
            sx={{
                overflow: 'auto'
            }}
        >
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
                    {cartProducts.map((product) => (
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
                                {product.quantity}
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    position: 'relative'
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
                                    minWidth: '200px'
                                }}
                            >
                                {product.title}
                            </TableCell>
                            <TableCell
                                sx={{
                                    minWidth: '250px'
                                }}
                            >
                                {product.description}
                            </TableCell>
                            <TableCell align="center">{product.rating.rate}</TableCell>
                            <TableCell align="center">${product.price}</TableCell>
                            <TableCell align="center">
                                ${product.price * (product.quantity ?? 0)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductTable;