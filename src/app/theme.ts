'use client';

import { createTheme } from '@mui/material';
import { jost } from './fonts';

const theme = createTheme({
    typography: {
        fontFamily: jost.style.fontFamily
    }
});

export { theme };