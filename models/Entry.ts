import moongose, { Model, Schema } from 'mongoose'
import {Entry, EntryStatus} from "../interfaces";


export interface IEntry extends Entry{}

const entrySchema = new Schema({
    description: {type: String, required: true},
    createdAt: {type: Number, required: true},
    status: {
        type: String,
        enum: {
            values: ['pending', 'in-progress', 'finished'],
            message: '{VALUE} no is a permitted state'
        },
        default: 'pending'
    }
});


const EntryModel: Model<IEntry> = moongose.models.Entry || moongose.model('Entry', entrySchema);

export default  EntryModel;