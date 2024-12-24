import  React, { useState } from "react";
import { Link } from "react-router-dom";

function Header(){


    const [setinput , setinputbox] = useState(true)

    function showinput(){

        const  changestate = !setinput

        setinputbox(changestate)
    }


    return(

        <div className="headerpart">

            <img src="/public/king people.png" alt="logo"></img>
            
            <div className={`input-part ${setinput ? "showinput":""}`}>

                <input type="text" placeholder="Search for Any"></input>
                <button>Search</button>
            </div>



            <i class="fa-solid fa-magnifying-glass" onClick={showinput}></i>



        </div>
    )
}


export default Header