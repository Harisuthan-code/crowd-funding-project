import React, { useState } from "react";


function Profilesetting(){

    const [sociallink , setsociallinks] = useState([])
    const [link , setlink] = useState({

        heading : "",
        links : ""

    })

    function handlechange(e){

        const {name , value} = e.target
     

        setlink((prev)=>({

            ...prev,
            [name]:value

        }))
    }

    


    function addlink(e){

        e.preventDefault()

        if(!link.heading  || !link.links){

            alert("Add heading And Links properly")
        }

        else{

            if(link.heading.trim() && link.links.trim()){

                setsociallinks([...sociallink , link])
                setlink({ heading: "", links: "" })
            }
        }
    }


    function deleteLink(index){

    setsociallinks(sociallink.filter((_, i) => i !== index));


    }










    return(

        <div className="profileset">

        
        <h1>Build your Profile for Best Results</h1>

        <form className="infoaboutperson">

        <h2>Basic Information</h2>

        <label>Name : </label>
        <input type="name" placeholder="enter your name"></input>
        <label>Profile pic:</label>
        <input type="file" accept="image/*"></input>
        <label>Bio</label>
        <input type="text" maxLength={180}></input>
        <label>Heading</label>
        <input type="text" value={link.heading} onChange={handlechange} name="heading"></input>
        <label>Links</label>
        <input type="text" placeholder="enter your socialmedia links" value={link.links} onChange={handlechange} name="links"></input>
        <button type = "button" onClick={addlink}>Add</button>

        <ul>
        {sociallink.map((s_link, index) => (
          <li key={index}>
            <a href={s_link.links} target="_blank" rel="noopener noreferrer">
              {s_link.heading}
            </a>
            <button onClick={() => deleteLink(index)}>Delete</button>
          </li>
        ))}
      </ul>


      <label>Location</label>
      <input type="location" placeholder="enter your country Name"></input>

      <h2>Contact Details</h2>

      <label>Email address</label>
      <input type="email" placeholder="enter your email address"></input>


      <button>Save & continue</button>

      
      </form>








        </div>
    )
}


export default Profilesetting