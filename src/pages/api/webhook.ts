import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import Cors from 'micro-cors';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27'
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
    api: {
        bodyParser: false
    }
}

const cors = Cors({
    allowMethods: ['POST', 'HEAD'],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const buff = await buffer(req);
        const sig = req.headers['stripe-signature'];
        let stripeEvent: Stripe.Event;

        // For checking that only stripe is sending the post request not unkown user
        try {
            stripeEvent = stripe.webhooks.constructEvent(
                buff.toString(),
                sig,
                webhookSecret
            );
        } catch (err) {
            // On error, log and return the error message.
            console.log(`❌ Error message: ${err.message}`);
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        // Successfully constructed event.
        console.log('✅ Success:', stripeEvent.id);

        // Cast event data to Stripe object.
        if (stripeEvent.type === 'payment_intent.succeeded') {
            const paymentIntent = stripeEvent.data.object as Stripe.PaymentIntent;
            console.log(`💰 PaymentIntent status: ${paymentIntent.status}`);
        } else if (stripeEvent.type === 'payment_intent.payment_failed') {
            const paymentIntent = stripeEvent.data.object as Stripe.PaymentIntent;
            console.log(
                `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
            );
        } else if (stripeEvent.type === 'charge.succeeded') {
            const charge = stripeEvent.data.object as Stripe.Charge;
            console.log(`💵 Charge id: ${charge.id}`);
        } else {
            console.warn(`🤷‍♀️ Unhandled event type: ${stripeEvent.type}`);
        }

        // Return a response to acknowledge receipt of the event.
        res.json({ received: true });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }

    res.status(200);
}

export default cors(webhookHandler as any);