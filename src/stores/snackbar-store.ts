import { create } from 'zustand';

interface SnackbarStore {
    open: boolean;
    message: string;
    variant: 'success' | 'error' | 'warning' | 'info';
    showSnackbar: (message: string, variant?: SnackbarStore['variant']) => void;
    closeSnackbar: () => void;
}

const useSnackbarStore = create<SnackbarStore>((set) => ({
    open: false,
    message: '',
    variant: 'success',
    showSnackbar: (message, variant) => set({ open: true, message, variant }),
    closeSnackbar: () => set({ open: false })
}));

export { useSnackbarStore };