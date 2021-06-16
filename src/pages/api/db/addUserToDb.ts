import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/db";

interface Order{
    productDetails: Product,
    name: string,
    email: string,
    shippingAddress: string,
    paid: boolean,
}

export default async(req: NextApiRequest,res: NextApiResponse) => {
    if(req.method === 'POST'){
        const {db} = await connectToDatabase();
        const {userEmail} = req.body;

        db.listCollections({
            name: userEmail
        })
        .next(async function(err,collInfo){
            if(err){
                console.log('Error: '+err);
                return;
            }else if(!collInfo){
                const coll = await db.createCollection(userEmail);
                await coll.insertOne({
                    cart: Array<Product>(),
                    orders: Array<Order>(),
                });

                res.status(200).send({
                    data: "Added User to db"
                })
            }
        });

        res.status(200).send({
            data: "Already User Exist"
        })
    }
}