import type {NextApiRequest, NextApiResponse} from 'next'
import {connect, disconnect} from "../../database/db";
import {Entry} from "../../models";
import {seedData} from "../../database/seed-data";

type Data = {
    msg: string,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if(process.env.NODE_ENV === 'production'){
        return res.status(401).json({
            msg: 'You dont have access to this service'
        })
    }

    await connect();
    await Entry.deleteMany();
    await Entry.insertMany(seedData.entries);


    await disconnect();

    res.status(200).json({
        msg: 'Process successful',
    })
}