'use client';

import type { ProductType } from '@/types/product-type';
import { Modal, Skeleton, Stack, Typography } from '@mui/material';
import ProductTable from '@/components/cart/ProductTable';

interface CartDetailsPopupProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    cartProducts: ProductType[];
}

const CartDetailsPopup: React.FC<CartDetailsPopupProps> = ({
    open,
    setOpen,
    isLoading,
    cartProducts
}) => {
    const closeModal = () => {
        setOpen(false);
    };

    const getTotalPrices = () => {
        return cartProducts.reduce((total, product) => (
            total + product.price * (product.quantity ?? 0)
        ), 0);
    };

    return (
        <Modal open={open} onClose={closeModal}>
            <Stack
                direction="column"
                spacing={2}
                sx={{
                    width: '80%',
                    height: '80%',
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
                <Stack direction="column" spacing={0.5}>
                    <Typography variant="h4">Cart Details</Typography>
                    <Typography variant="body1">
                        {cartProducts.length} product{cartProducts.length > 1 && 's'} in cart
                    </Typography>
                </Stack>
                {isLoading ? (
                    <Stack direction="column">
                        <Skeleton animation="wave" height={64} />
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <Skeleton key={idx} animation="wave" height={64} />
                        ))}
                    </Stack>
                ) : (
                    <ProductTable cartProducts={cartProducts} />
                )}
                {!isLoading && (
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{
                            padding: '0 16px'
                        }}
                    >
                        <Typography variant="h6">Total Prices</Typography>
                        <Typography variant="h6">${getTotalPrices()}</Typography>
                    </Stack>
                )}
            </Stack>
        </Modal>
    );
};

export default CartDetailsPopup;