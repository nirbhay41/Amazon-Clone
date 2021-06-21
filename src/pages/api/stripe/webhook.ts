import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import Cors from 'micro-cors';
import { connectToDatabase } from "../../../utils/db";
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

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

const oAuth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI
});

oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
})

// send mail with Google Gmail api
const sendMail = async (session: Stripe.Checkout.Session) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'oauth2',
                user: 'nirbhay411@gmail.com',
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                accesToken: accessToken
            }
        });

        const images = JSON.parse(session.metadata.images);

        const htmlContent = `
        <h1>Your Order has been placed and will be delivered within few days</h1>
        <h2>Amount: ${session.amount_total / 100}</h2>
        <div>
        <h2>Product Images</h2>
        <div>
        ${images.map((imgSrc: string) => {
            return `<img src=${imgSrc} />`;
        })}
        </div>
        </div>
        `;

        const mailOptions = {
            from: 'Amazon-Clone <no-reply@amazon-clone.com>',
            to: session.customer_details.email,
            subject: 'Order Placed',
            text: `Your order of amount ₹${session.amount_total / 100} has been placed and will be delivered within few days`,
            html: htmlContent
        }

        const res = await transport.sendMail(mailOptions);
        return res;
    } catch (err) {
        return err;
    }
}

const fullfillOrder = async (session: Stripe.Checkout.Session) => {
    console.log('Fullfilling order ', session);
    const { db } = await connectToDatabase();

    db.collection(session.metadata.email).updateOne({}, {
        $push: {
            "orders": {
                "sessionId": session.id,
                "productDetails": {
                    "images": session.metadata.images,
                    "productsId": session.metadata.productsId,
                    "quantities": session.metadata.quantities
                },
                "amount": session.amount_total / 100,
                "amountShipping": session.total_details.amount_shipping / 100,
                "paymentStatus": session.payment_status,
                "shippingDetails": session.shipping
            }
        }
    }).then(() => {
        console.log('Order noted successfully: ', session.id);
    });

    sendMail(session)
        .then(res => console.log('Email sent...', res))
        .catch(err => console.error('Error occured: ', err.message));
}

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
        } else if (stripeEvent.type === 'checkout.session.completed') {
            const session = stripeEvent.data.object as Stripe.Checkout.Session;
            await fullfillOrder(session);
        }
        else {
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