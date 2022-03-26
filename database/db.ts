import mongoose from "mongoose";

/**
 *  0 = disconnected
 *  1 = connected
 *  3 = disconnecting
 */

const mongooConnection = {
    isConnected: 0
}

const connect = async() => {

    if(mongooConnection.isConnected){
        console.log('we already connected')
        return;
    }

    if(mongoose.connections.length > 0){
        mongooConnection.isConnected = mongoose.connections[0].readyState;

        if(mongooConnection.isConnected === 1){
            console.log('Using previous conexion');
            return;
        }

        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGO_URL || '')
    mongooConnection.isConnected = 1
    console.log('Connected to mongodb:' + (process.env.MONGO_URL))

}

const disconnect = async () => {

    if(process.env.NODE_ENV === 'development') return;
    if(mongooConnection.isConnected === 0) return;
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
}

export {
    connect,
    disconnect
}