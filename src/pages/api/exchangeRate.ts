import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const query = encodeURIComponent('USD') + '_' + encodeURIComponent('INR');
    const url = `https://free.currconv.com/api/v7/convert?q=${query}&compact=ultra&apiKey=${process.env.API_KEY}`;
    
    const rate = await axios.get(url);
    res.send(rate.data);
}
