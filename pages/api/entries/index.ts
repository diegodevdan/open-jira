import type {NextApiRequest, NextApiResponse} from 'next'
import {connect, disconnect} from "../../../database/db";
import {Entry, IEntry} from "../../../models";

type Data =
    | { msg: string, }
    | IEntry[]
    | IEntry

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    switch (req.method) {
        case 'GET':
            return getEntries(res)

        case 'POST':
            return postEntry(res,req)

        default:
            return res.status(400).json({
                msg: 'Endpoint not found',
            })
    }
}

const getEntries = async(res: NextApiResponse<Data>) => {
    await  connect()
    const entries = await Entry.find().sort({ createdAt: 'ascending'});
    await  disconnect()

    res.status(200).json(entries)
}

const postEntry = async(res: NextApiResponse<Data>, req: NextApiRequest) => {

    const { description = '' } = req.body;
    const newEntry = new Entry({
        description,
        createdAt: Date.now(),
    })

    try {
        await connect();
        await newEntry.save();
        await disconnect();

        return res.status(201).json(newEntry);
    } catch (e) {
        await disconnect();
        console.log(e);
        return res.status(500).json({msg: 'something was wrong, check server console'})
    }

}

