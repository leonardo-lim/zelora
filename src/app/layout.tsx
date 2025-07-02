import type { Metadata } from 'next';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import './globals.css';
import Toast from '@/components/feedback/Toast';

const metadata: Metadata = {
    title: 'Zelora',
    description: 'E Commerce Web App with Next.js and TypeScript'
};

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                    <Toast />
                </ThemeProvider>
            </body>
        </html>
    );
};

export { metadata };
export default RootLayout;