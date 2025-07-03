'use client';

import type { ChangeEvent } from 'react';
import type { NextPage } from 'next';
import type { CartType } from '@/types/cart-type';
import type { ProductType } from '@/types/product-type';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios-instance';
import { Button, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { useSnackbarStore } from '@/stores/snackbar-store';
import Navbar from '@/components/layout/Navbar';
import CartTable from '@/components/cart/CartTable';
import CartDetailsPopup from '@/components/cart/CartDetailsPopup';

const Home: NextPage = () => {
    const { showSnackbar } = useSnackbarStore();

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [carts, setCarts] = useState<CartType[]>([]);
    const [filteredCarts, setFilteredCarts] = useState<CartType[]>([]);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [cartProducts, setCartProducts] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isPopupLoading, setIsPopupLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [productName, setProductName] = useState('');

    const router = useRouter();

    const filterCartsByProductName = (name: string) => {
        const productNames = new Map(products.map((product) => (
            [product.id, product.title.toLowerCase()])
        ));

        const filtered = carts
            .filter((cart) => cart.products.some((product) => (
                productNames.get(product.productId)?.includes(name.toLowerCase())
            )));

        setFilteredCarts(filtered);
    };

    const changeProductName = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setProductName(value);
        filterCartsByProductName(value);
    };

    const getCarts = async () => {
        try {
            setIsLoading(true);

            const response = await axiosInstance.get('/carts');

            if (response.status === 200) {
                setCarts(response.data);
                setFilteredCarts(response.data);
                getProducts();
            }
        } catch (error) {
            showSnackbar('Failed to get carts', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const getCart = async (cartId: number) => {
        try {
            setIsPopupLoading(true);

            const response = await axiosInstance.get(`/carts/${cartId}`);

            if (response.status === 200) {
                const cart = response.data;
                return cart;
            }
        } catch (error) {
            showSnackbar('Failed to get cart', 'error');
        } finally {
            setIsPopupLoading(false);
        }
    };

    const getProducts = async () => {
        try {
            setIsLoading(true);

            const response = await axiosInstance.get('/products');

            if (response.status === 200) {
                setProducts(response.data);
            }
        } catch (error) {
            showSnackbar('Failed to get products', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const getCartProducts = async (cartId: number) => {
        setOpen(true);

        const cart: CartType = await getCart(cartId);
        const cartProductQuantity = new Map();

        cart.products.forEach((product) => {
            cartProductQuantity.set(product.productId, product.quantity);
        });

        const filteredProducts = products
            .filter((product) => cartProductQuantity.has(product.id))
            .map((product) => ({
                ...product,
                quantity: cartProductQuantity.get(product.id)
            }));

        setCartProducts(filteredProducts);
    };

    useEffect(() => {
        getCarts();
    }, []);

    useEffect(() => {
        const authorized = document.cookie.includes('is-authorized=true');

        if (!authorized) {
            router.push('/login');
        } else {
            setIsAuthorized(true);
        }
    }, [router]);

    return (
        isAuthorized && (
            <>
                <Navbar />
                <Stack
                    direction="column"
                    spacing={3}
                    sx={{
                        padding: { xs: '100px 40px 40px 40px', md: '100px 80px 40px 80px' }
                    }}
                >
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={2}
                        justifyContent="space-between"
                        alignItems={{ xs: 'start', md: 'center' }}
                    >
                        <Typography variant="h4">Cart List</Typography>
                        <Stack
                            direction="row"
                            spacing={3}
                            justifyContent="space-between"
                            sx={{
                                width: { xs: '100%', md: 'auto' }
                            }}
                        >
                            <TextField
                                size="small"
                                placeholder="Filter by product name"
                                type="text"
                                variant="outlined"
                                value={productName}
                                onChange={changeProductName}
                                sx={{
                                    width: '200px'
                                }}
                            />
                            <Button
                                variant="contained"
                                size="medium"
                                startIcon={<AddShoppingCart />}
                                sx={{
                                    width: '140px',
                                    backgroundColor: 'black'
                                }}
                            >
                                Add Cart
                            </Button>
                        </Stack>
                    </Stack>
                    {isLoading ? (
                        <Stack direction="column">
                            <Skeleton animation="wave" height={64} />
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <Skeleton key={idx} animation="wave" height={64} />
                            ))}
                        </Stack>
                    ) : (
                        <CartTable carts={filteredCarts} getCartProducts={getCartProducts} />
                    )}
                </Stack>
                <CartDetailsPopup
                    open={open}
                    setOpen={setOpen}
                    isLoading={isPopupLoading}
                    cartProducts={cartProducts}
                />
            </>
        )
    );
};

export default Home;