import {EntryStatus} from "../interfaces";

interface SeedData {
    entries: SeedEntry []
}

interface SeedEntry {
    description: string,
    createdAt: number,
    status: string
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente: The black mainland oppressively marks the pirate.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'In-Progress: Nunquam desiderium bubo.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            description: 'Finished: Yes, there is shangri-la, it disturbs with thought.',
            status: 'finished',
            createdAt: Date.now() - 100000
        },
    ]
}