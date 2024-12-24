import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Homecontent from "./Homecontent";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Check from "./setcompaign";
import Profilesetting from "./Profilesettings";
import Fund from "./Fund";
import Campaignstatus from "./campaignstatus";
import Allcampaign from "./allcampaign";


function App(){


    return(

        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<Homecontent />} />
                    <Route path="/allcompaign" element = {<Allcampaign/>}></Route>
                    <Route path="/dashboard" element = {<Dashboard/>}></Route>
                    <Route path="/create" element = {<Check/>}></Route>
                    <Route path="/profilesetting" element = {<Profilesetting/>}></Route>
                    <Route path="/donatehistory" element = {<Fund/>}></Route>
                    <Route path="/compaignstatus" element = {<Campaignstatus/>}></Route>





                </Routes>
            </div>
        </Router>

    )



}


export default App
