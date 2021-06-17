import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/db";

type RequestBody = {
    userEmail: string;
    newQty: number;
    product: Product;
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST'){
        const {userEmail,newQty,product}:RequestBody = req.body;
        const {db} = await connectToDatabase();
        const col = db.collection(userEmail);

        await col.updateOne({
            "cart.id": product.id
        },{
            $set: {
                "cart.$.quantity": newQty
            }
        });

        res.status(200).send({
            content: "Updated the quantity of the product"
        })
    }else{
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}