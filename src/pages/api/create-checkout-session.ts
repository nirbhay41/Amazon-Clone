import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
    apiVersion: '2020-08-27'
});

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: number;
    hasPrime?: boolean;
    quantity?: number;
}

export default async (req: NextApiRequest,res: NextApiResponse) => {
    const {products,email} = req.body;

    const transformedProductList = products.map((item:Product) => {
        return {
            description: item.description,
            quantity: item.quantity,
            price_data: {
                currency: 'inr',
                unit_amount: item.price*100,
                product_data: {
                    name: item.title,
                    images: [item.image],
                }
            }
        }
    })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
            allowed_countries: ['GB','US','IN','CA']
        },
        shipping_rates: ['shr_1IzJvBSIBf5mik1s9hKgCccK'],
        line_items: transformedProductList,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(products.map((item: Product) => item.image)),
        }
    })

    res.status(200).json({
        id: session.id,
    })
}