'use client';

import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios-instance';
import { Button, Skeleton, Stack, Typography } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { useSnackbarStore } from '@/stores/snackbar-store';
import Navbar from '@/components/layout/Navbar';
import CartTable from '@/components/cart/CartTable';

const Home: NextPage = () => {
    const { showSnackbar } = useSnackbarStore();

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [carts, setCarts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const getCarts = async () => {
        try {
            setIsLoading(true);

            const response = await axiosInstance.get('/carts');

            if (response.status === 200) {
                setCarts(response.data);
            }
        } catch (error) {
            showSnackbar('Failed to get carts', 'error');
        } finally {
            setIsLoading(false);
        }
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
                        <CartTable carts={carts} />
                    )}
                </Stack>
            </>
        )
    );
};

export default Home;