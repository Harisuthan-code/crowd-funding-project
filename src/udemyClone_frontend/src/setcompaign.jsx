import React, { useEffect, useRef, useState  } from "react";
import { useForm } from 'react-hook-form';
import { create } from "ipfs-http-client";
import { udemyClone_backend } from '../../declarations/udemyClone_backend';
import { useNavigate } from "react-router-dom";


function Check(){

    const navigate = useNavigate()


    const [minDate, setMinDate] = useState("");
    const [showerror , setshowerror] = useState(false)
    const fileInputRef = useRef(null);
    const {register , handleSubmit} = useForm()
    const [image , setimage] = useState()
    const [enddate , setendDate] = useState()
    const [disable , setdisable] = useState(false)
  



    //image file valid check function

    async function imagesetting(event){

    console.log(event.target.files[0])

    const file = event.target.files[0]



    if(file && file.type.startsWith("image/")){

      setshowerror(false)
      const arrayBuffer = await file.arrayBuffer();
      const byteArray = new Uint8Array(arrayBuffer); 
      setimage(byteArray);
      console.log(image)

    }

    else{

      setshowerror(true)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }

    }


    
      //date change into second to store


      const handleEndDateChange = (e) => {

        const dateend = e.target.value; 


        console.log(dateend)

        
        if (dateend) {

            const date = new Date(dateend);
    

            const timestampMs = date.getTime();
    

            const timestampSec = Math.floor(timestampMs / 1000);
    
            setendDate(timestampSec); 
        }
    };


    //upload file to pinata

    

    async function onsubmit(data) {

      setdisable(true);

      try{

      const result = await udemyClone_backend.add_campaign(data.name , data.title , data.description , data.category , image , Number(data.goalamount) , enddate )
      
      if(result === true){

        navigate("/allcompaign")
        alert("added successfully")

      }

      else{

        alert("somthing wrong")
      }
    
    
    }

      catch(err){

        console.log(err)
      }

      finally{

        setdisable(false)
      }
      
    }








    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];
        setMinDate(formattedDate)
      }, []);



    return(

      <div className="campaignsetting">

        <form className="campaignsetlist" onSubmit={handleSubmit(onsubmit)}>

        <label>Name</label>
        <input type="text"  {...register("name", { required: true })} ></input>
        <label>Title</label>
        <input type="text"  {...register("title", { required: true })} ></input>
        <label>Description</label>
        <input type="text"  {...register("description", { required: true })} ></input>
        <label>Select Categories</label>
        <select  {...register("category", { required: true })} >
            <option>Education</option>
            <option>Technology</option>
            <option>Finance</option>
            <option>Business</option>
            <option>Developers</option>

        </select>

        <label>Upload Video related Your Idea</label>

        <input type="file" accept="image/*" onChange={imagesetting} ref={fileInputRef} required></input>


        <p style={{display : showerror ? "block" : "none"}}>!invalid file type pls choose right video file</p>

        <label>Goal Amount</label>

        <input type="number"  {...register("goalamount", { required: true })} ></input>

        <label>Final Date</label>

        <input type="date" min={minDate}  {...register("estimatedate", { required: true })} onChange={handleEndDateChange} ></input>

        <button disabled = {disable}>{disable ? "Wait a minute" : "Post"}</button>

        </form>



  

      </div>

    )
}

export default Check