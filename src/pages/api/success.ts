import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { OrderItem } from "../../types/order";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27'
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const session = await stripe.checkout.sessions.retrieve((req.body.session_id as string), {
            expand: ['line_items']
        });

        const subTotal = session.amount_subtotal;
        const total = session.amount_total;
        const email = session.metadata.email;
        const shipping = session.shipping;
        const amount_shipping = session.total_details.amount_shipping;

        const products: OrderItem[] = [];
        for(const item of session.line_items.data){
            const productDetails = await stripe.products.retrieve((item.price.product as string))
            let res: OrderItem = {
                amount_total: item.amount_total,
                unit_amount: item.price.unit_amount,
                quantity: item.quantity,
                name: productDetails.name,
                image: productDetails.images[0]
            }
            products.push(res);
        }

        res.status(200).send({
            order: {
                subTotal,
                total,
                email,
                shipping,
                amount_shipping,
                product_details: products
            }
        });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}