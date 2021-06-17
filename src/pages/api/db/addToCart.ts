import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { db } = await connectToDatabase();
        const { product: productDetails, userEmail }: { product: Product, userEmail: string } = req.body;

        // get the collection
        const coll = db.collection(userEmail);

        // get cart list from the document
        const cartList: Product[] = (await coll.findOne({})).cart;

        let isPresent = false;

        cartList.forEach(item => {
            if (item.id === productDetails.id)
                isPresent = true;
        });

        if (isPresent) {
            // update the quantity
            await coll.updateOne({
                "cart.id": productDetails.id
            },{
                $inc: {
                    "cart.$.quantity": productDetails.quantity
                }
            });

            res.status(200).send({
                data: "Updated Successfully into db",
            });
        } else {
            // add to cart
            await coll.findOneAndUpdate({}, {
                $push: {
                    "cart": productDetails
                }
            });

            res.status(200).send({
                data: "Inserted Successfully into db",
            });
        }

        res.end();
    }else{
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}