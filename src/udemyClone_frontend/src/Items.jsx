import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Actor, HttpAgent} from "@dfinity/agent";
import { idlFactory } from "../../declarations/campaign";
import { idlFactory as tokenIdlfactory } from "../../declarations/tokenProject_backend";
import CURRENT_USER_ID from "./main";
import { udemyClone_backend } from "../../declarations/udemyClone_backend";
import { Principal } from "@dfinity/principal";

function Item(props){

    const current_user_id = CURRENT_USER_ID.toText()
    const id = props.id
    const [getamount , setgetamount] = useState(props.amount_spec)
    const [showfund , setshowfund] = useState(false)
    const [name , setname] = useState("")
    const [title , settitle] = useState()
    const [description , setdescription] = useState()
    const [category , setcategory] = useState()
    const [img , setimg] = useState()
    const [goalamount , setgoalamount] = useState(0)
    const [date , setdate] = useState()
    const [loading , setloading] = useState(false)
    const [fundbtn , setfundbtn] = useState(false)
    const [amount , setamount] = useState("")
    const [s_ownerid ,setownerid] = useState()
    const [showfundamount , setshowfundamount] = useState(false)
    const [fundamount , setfundamount] = useState(props.amount_fund)
    const [showfundbtn , setshowbtn] = useState(null)
    const [userid , setuserid] = useState()
    const [agent , setAgent] = useState()




    const  localHost = "http://localhost:3000/"


    async function loaditems(agent) {


    try{
        
    
    let campaign = await Actor.createActor(idlFactory , {
    agent,
    canisterId:id
    })


    const ownerid = await campaign.show_id()
    const own_id = ownerid.toText()
    const name = await campaign.show_name()
    const title = await campaign.show_title()
    const description = await campaign.show_description()
    const category = await campaign.show_category()
    const image = await campaign.show_image()
    const imgBlob = new Blob([new Uint8Array(image)], { type: "image/*" });
    const imgURL = URL.createObjectURL(imgBlob);
    const goal_amount = await campaign.show_goal_amount()
    const goalAmount = Number(goal_amount)
    const dateInSeconds = await campaign.show_date()
    const date = new Date(Number(dateInSeconds) * 1000)
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    console.log(formattedDate)
    

    setuserid(ownerid)
    setownerid(id)
    setname(name)
    settitle(title)
    setdescription(description)
    setcategory(category)
    setimg(imgURL)
    setgoalamount(goalAmount)
    setdate(formattedDate)


    if (current_user_id === own_id) {
        console.log("yes")
        console.log(current_user_id , own_id)
        setshowbtn(false)
      } 
      
    else {
        setshowbtn(true)
    
      }


      setshowfundamount(props.showfundamountbtn)
      setshowbtn(props.fundbutton)
      setshowbtn(props.setfundbtn)




    try{

        const amount_id = await udemyClone_backend.show_amount(id);
        console.log(amount_id)
        setgetamount(Number(amount_id))
    }

    catch(err){

        console.log(err)
    }


    try{


        const now = Math.floor(Date.now() / 1000);

        const result = await udemyClone_backend.addthestatus(ownerid , id , now , dateInSeconds, goalamount);

        console.log(result)


    }


    catch(err){

        console.log(err)
    }



    

   }

    catch(err){

        console.log(err)
    }





 


  

    }



    function showthefundoption(){


        const changestate = !showfund


        setshowfund(changestate)
    }


    async function addthefund(){


    console.log("clicked")


    let tokencampaign = await Actor.createActor(tokenIdlfactory , {
        agent,
        canisterId:Principal.fromText("c5kvi-uuaaa-aaaaa-qaaia-cai"),

    })



    if(amount === ""){

        alert("enter the amount")
    }

    else{

        try{

        const resulttransfer = await tokencampaign.transfer_amount(userid , Number(amount))

        if(resulttransfer == "Tranfer Sucess"){

            const result_of_this = await udemyClone_backend.add_fund_list(s_ownerid, Number(amount))

            if(result_of_this){
    
                alert("entered")
                setshowfund(false)
                const nowamount =  Number(amount) + Number(getamount)
                setgetamount(nowamount)
    
    
            }

            else{

                alert("something wrong")
            }



        }


        else{

            alert(resulttransfer)
        }        

        }


        catch(err){


            console.log(`this is error : ${err}`)
        }




    }



    }


    if(!props.id){

        return <p>No campaign still here</p>
    }


    if(loading){

        return <p>Loading......</p>
    }



    useEffect(()=>{

        const agent = new HttpAgent({ host: localHost });
        
        const initializeAgent = async () => {
            await agent.fetchRootKey();
            setAgent(agent);
            loaditems(agent);
    
        };

    
    
        initializeAgent();
        
    },[])


 


    return(



            <div className="content">

            <div className="sub-content">
            <p><Link to = "spec-per">{name}</Link></p>
            <p>{title}</p>
            <p>{description}</p>
            <p>{category}</p>
            <img src={img} alt="image" width={200}></img>
            <p>{goalamount}</p>
            <p style={{display : showfundamount ? "none" : "block"}}>{getamount}</p>
            <p style={{display : showfundamount ? "block" : "none"}}>fund amount : {Number(fundamount)}</p>
            <p>{date}</p>

            

        
            
            <button onClick={showthefundoption} style={{display : showfundbtn ? "block" : "none"}}>Give Fund</button>

        

            <div className="fundinput" style={{display : showfund ? "block" : "none"}}>

            <input type="number" placeholder="enter the amount"onChange={(e)=>setamount(e.target.value)} value={amount} ></input>
            <button type="button"className="surebtn" onClick={addthefund}>Sure</button>

            </div>

            </div>

            </div>


    )

}

export default Item

