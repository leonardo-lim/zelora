'use client';

import type { NextPage } from 'next';
import type { CartType } from '@/types/cart-type';
import type { ProductType } from '@/types/product-type';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios-instance';
import { Button, Skeleton, Stack, Typography } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { useSnackbarStore } from '@/stores/snackbar-store';
import Navbar from '@/components/layout/Navbar';
import CartTable from '@/components/cart/CartTable';
import CartDetailsPopup from '@/components/cart/CartDetailsPopup';

const Home: NextPage = () => {
    const { showSnackbar } = useSnackbarStore();

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [carts, setCarts] = useState<CartType[]>([]);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [cartProducts, setCartProducts] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isPopupLoading, setIsPopupLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const router = useRouter();

    const getCarts = async () => {
        try {
            setIsLoading(true);

            const response = await axiosInstance.get('/carts');

            if (response.status === 200) {
                setCarts(response.data);
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
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h4">Cart List</Typography>
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
                    {isLoading ? (
                        <Stack direction="column">
                            <Skeleton animation="wave" height={64} />
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <Skeleton key={idx} animation="wave" height={64} />
                            ))}
                        </Stack>
                    ) : (
                        <CartTable carts={carts} getCartProducts={getCartProducts} />
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