import React from 'react'
import Ping from "@/components/ping";
import {STARTUP_VIEWS_QUERY} from "@/lib/queries";
import {client} from "@/sanity/lib/client";
import {writeClient} from "@/sanity/lib/write-client";
import { after } from "next/server";

const View = async ({id}:{id:string}) => {
    const {views:totalViews}=await client.withConfig({useCdn:false}).fetch(STARTUP_VIEWS_QUERY,{id});
    const ViewCounter = () => {
        return (
            <span>
      {totalViews} {totalViews === 1 || totalViews ===0 ? 'View' : 'Views'}
    </span>
        );
    };
    // TODO : TO MODIFY THE NUMBER VIEWS ON THE EACH VISIT
    after(async ()=>await writeClient
        .patch(id)
        .set({views:totalViews+1})
        .commit()
    )
    return (
        <div className="view-container">
            <div className="absolute -right-2 -top-2">
                <Ping/>
            </div>
            <p className="view-text">
                <span className="font-black"><ViewCounter/></span>
            </p>
        </div>
    )
}
export default View
