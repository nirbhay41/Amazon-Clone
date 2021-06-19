type Product = {
    id: number;
    title: string;
    price: number | string;
    description: string;
    category: string;
    image: string;
    rating?: number;
    hasPrime?: boolean;
    quantity?: number;
}