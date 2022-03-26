import {NextFetchEvent, NextRequest, NextResponse} from "next/server";
import moongose from "mongoose";


export function middleware(req: NextRequest, ev: NextFetchEvent){

    // console.log(req.page.params)
    // console.log(req.page.name)

    // if(req.page.name === '/api/entries') return ;;;

    const id = req.page.params?.id || '';

    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    if (!checkMongoIDRegExp.test(id)) {
        return new Response(JSON.stringify({msg: 'the id is not valid'}), {
            status: 400,
            headers: {
                'Content-type': 'application/json'
            }
        })
    }


    console.log('middleware api called')
    return NextResponse.next();

}