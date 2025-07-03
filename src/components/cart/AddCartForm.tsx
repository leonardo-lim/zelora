'use client';

import type { ProductType } from '@/types/product-type';
import { useEffect, useState } from 'react';
import { Button, Typography, Stack, Modal, Box } from '@mui/material';
import { useSnackbarStore } from '@/stores/snackbar-store';
import { useCartStore } from '@/stores/cart-store';
import ProductList from './ProductList';

interface AddCartFormProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    products: ProductType[];
}

const AddCartForm: React.FC<AddCartFormProps> = ({ open, setOpen, products }) => {
    const { showSnackbar } = useSnackbarStore();
    const { carts, addCart } = useCartStore();

    const [quantities, setQuantities] = useState<number[]>([]);

    const closeModal = () => {
        setOpen(false);
    };

    const resetQuantities = () => {
        setQuantities(Array(products.length).fill(0));
    };

    const addNewCart = async () => {
        addCart({
            id: carts.length + 1,
            userId: 10,
            date: new Date().toISOString(),
            products: products
                .map((product, idx) => ({
                    productId: product.id,
                    quantity: quantities[idx]
                }))
                .filter((product) => product.quantity > 0)
        });

        showSnackbar('Cart added', 'success');
        closeModal();
        resetQuantities();
    };

    useEffect(() => {
        if (products.length) {
            resetQuantities();
        }
    }, [products]);

    return (
        <Modal open={open} onClose={closeModal}>
            <Stack
                direction="column"
                spacing={2}
                sx={{
                    width: '80%',
                    height: '80vh',
                    padding: '32px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.2)',
                    outline: 'none'
                }}
            >
                <Stack direction="column" spacing={3}>
                    <Typography variant="h4">Add Cart</Typography>
                    <Box
                        sx={{
                            height: 'calc(80vh - 200px)',
                            overflow: 'auto'
                        }}
                    >
                        <ProductList
                            products={products}
                            quantities={quantities}
                            setQuantities={setQuantities}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={addNewCart}
                        sx={{
                            backgroundColor: 'black'
                        }}
                    >
                        Add Cart
                    </Button>
                </Stack>
            </Stack>
        </Modal>
    );
};

export default AddCartForm;