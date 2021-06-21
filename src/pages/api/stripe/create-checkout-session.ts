import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
    apiVersion: '2020-08-27'
});

export default async (req: NextApiRequest,res: NextApiResponse) => {
    const {products,email} = req.body;

    const transformedProductList = products.map((item:Product) => {
        return {
            description: item.description,
            quantity: item.quantity,
            price_data: {
                currency: 'inr',
                unit_amount: (item.price as number)*100,
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
            allowed_countries: ['IN']
        },
        shipping_rates: ['shr_1IzJvBSIBf5mik1s9hKgCccK'],
        line_items: transformedProductList,
        mode: 'payment',
        success_url: `${process.env.HOST}/order/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.HOST}/basket`,
        metadata: {
            email,
            images: JSON.stringify(products.map((item: Product) => item.image)),
            productsId: JSON.stringify(products.map((item: Product) => item.id)),
            quantities: JSON.stringify(products.map((item: Product) => item.quantity))
        }
    })

    res.status(200).json({
        id: session.id,
    })
}