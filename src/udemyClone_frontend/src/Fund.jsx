import React, { useEffect, useState } from "react";
import Item from "./Items";
import { udemyClone_backend } from "../../declarations/udemyClone_backend";
import CURRENT_USER_ID from "./main";



function Fund(){



    const [allfund , setallfund] = useState([])
    const [fundbutton , setfundbutton] = useState(false)


    async function getfund_details(){

        try{


            const result = await udemyClone_backend.getfund_ids(CURRENT_USER_ID)

            console.log(result)

            setallfund(result)


        }

        catch(err){

            console.log(err)
        }
    }



    useEffect(()=>{

        getfund_details()
    },[])






    return(


        allfund.map((fund) => {
            console.log(fund.can_id, fund.amount); 
            return (
                <Item 
                    key={fund.can_id}
                    id={fund.can_id} 
                    amount_fund={fund.amount} 
                    fundbutton={false} 
                    showfundamountbtn={true} 
                />
            );
        })
        


    )
}


export default Fund