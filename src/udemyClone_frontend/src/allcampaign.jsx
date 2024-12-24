import React, { useEffect, useState } from "react";
import Item from "./Items";
import { udemyClone_backend } from '../../declarations/udemyClone_backend';



function Allcampaign(){

    const [allid , setid] = useState([])




    async function get_all_canid(){


    try{

    const result = await udemyClone_backend.show_all_canister();

    setid(result)


    }

    catch(err){

        console.log(err)
    }


    }




    


    useEffect(()=>{

    get_all_canid()


    },[])







    

    return(

        
       allid.map((can_id , index) => (

        <Item key = {index} id = {can_id} setfundbtn = {true}/>


        ))


    )
}

export default Allcampaign


