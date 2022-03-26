import type {NextApiRequest, NextApiResponse} from 'next'
import moongose from "mongoose";
import {connect, disconnect} from "../../../../database/db";
import {Entry, IEntry} from "../../../../models";

type Data =
    | { msg: string, }
    | IEntry

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    //we use the middleare for this.
    // const {id} = req.query;
    // if (!moongose.isValidObjectId(id)) {
    //     res.status(400).json({
    //         msg: 'id not valid'
    //     })
    // }

    switch (req.method) {
        case 'PUT':
            return updatedEntry(req, res)

        case 'GET':
            return getEntry(req, res)

        default:
            return res.status(400).json({
                msg: 'Method not existent'
            })
    }
}

const updatedEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {id} = req.query;
    await connect();

    const entryToUpdate = await Entry.findById(id);

    if (!entryToUpdate) {
        return res.status(400).json({
            msg: 'No entry with this id'
        })
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body;

    try {
        const updatedEntry = await Entry.findByIdAndUpdate(
            id,
            {description, status},
            {runValidators: true, new: true});
        res.status(200).json(updatedEntry!)
        await disconnect();
    } catch (e: any) {
        console.error({e})
        await disconnect();
        res.status(400).json({msg: e.errors.status.message})
    }
    //OR this
    // entryToUpdate.description = description;
    // entryToUpdate.status = status;
    // entryToUpdate.save();
}

const getEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {id} = req.query;
    await connect();

    const entryToGet = await Entry.findById(id);

    if (!entryToGet) {
        return res.status(400).json({
            msg: 'No entry with this id'
        })
    }

    try {
        res.status(200).json(entryToGet!)
        await disconnect();
    } catch (e) {
        await disconnect();
    }
}