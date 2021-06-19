import Stripe from "stripe";

export interface OrderDB {
    sessionId: string;
    productDetails: {
        images: string;
        productsId: string;
        quantities: string;
    };
    amount: number;
    amountShipping: number;
    paymentStatus: Stripe.Checkout.Session.PaymentStatus;
    shippingDetails: Stripe.Checkout.Session.Shipping;
}

export type OrderItem = {
    amount_total: number;
    quantity: number;
    unit_amount: number;
    name: string;
    image: string;
}

export type Order = {
    subTotal: number;
    total: number;
    amount_shipping: number;
    email: string;
    shipping: Stripe.Checkout.Session.Shipping;
    product_details: OrderItem[]
}