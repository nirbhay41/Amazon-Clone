import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { db } = await connectToDatabase();
        const { userEmail } = req.body;
        const doc = await db.collection(userEmail).findOne({});
        if (doc) {
            const list: Product[] = doc.cart;
            res.status(200).send({
                products: list
            })
        } else {
            res.status(200).send({
                content: "Products not found for the current user"
            })
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}