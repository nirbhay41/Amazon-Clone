import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST'){
        const {userEmail,product}:{userEmail:string,product: Product} = req.body;
        const {db} = await connectToDatabase();
        const col = db.collection(userEmail);

        await col.updateOne({},{
            $pull: {
                "cart": product
            }
        });

        res.status(200).send({
            content: "Product Deleted Successfully"
        })
    }else{
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}