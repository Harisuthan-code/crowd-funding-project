import React from "react";
import { Link} from "react-router-dom";


function Dashboard(){

    return(

        <div className="dashboardpart">

            <div className="leftbox">

                <Link to= "/create" className="createcampaign">Create Compaign</Link>
                <Link to= "/profilesetting" className="profilesetting">Profile Setting</Link>
                <Link to= "/donatehistory" className="donation">Donate History</Link>
                <Link to= "/compaignstatus" className="status">Your Compaign status</Link>


            </div>

        

        </div>
    )
}


export default Dashboard