'use client';

import { Alert, Slide, Snackbar } from '@mui/material';
import { useSnackbarStore } from '@/stores/snackbar-store';

const Toast = () => {
    const { open, message, variant, closeSnackbar } = useSnackbarStore();

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            slots={{ transition: Slide }}
            onClose={closeSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            <Alert onClose={closeSnackbar} severity={variant}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;