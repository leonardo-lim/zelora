'use client';

import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';
import { useSnackbarStore } from '@/stores/snackbar-store';

const Navbar: React.FC = () => {
    const { showSnackbar } = useSnackbarStore();

    const router = useRouter();

    const clearAuhorizationCookie = () => {
        document.cookie = 'is-authorized=false; path=/; max-age=0';
        router.push('/login');
        showSnackbar('Logout successful', 'success');
    };

    return (
        <Box
            sx={{
                width: '100%',
                padding: { xs: '20px 40px', md: '20px 80px' },
                position: 'fixed',
                zIndex: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'black',
                color: 'white'
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    marginTop: '2px',
                    fontWeight: 'normal',
                    textTransform: 'uppercase',
                    letterSpacing: '8px'
                }}
            >
                Zelora
            </Typography>
            <Button
                variant="contained"
                size="small"
                sx={{
                    backgroundColor: 'white',
                    color: 'black'
                }}
                onClick={clearAuhorizationCookie}
            >
                Logout
            </Button>
        </Box>
    );
};

export default Navbar;