interface CartProductType {
    productId: number;
    quantity: number;
}

interface CartType {
    id: number;
    userId: number;
    date: string;
    products: CartProductType[];
}

export type { CartType };