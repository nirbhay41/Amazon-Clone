import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST'){
        const { db } = await connectToDatabase();
        const {userEmail} = req.body;

        const productNo = (await db.collection(userEmail).findOne({})).cart.length;

        res.status(200).send({
            productNo
        })
    }
}