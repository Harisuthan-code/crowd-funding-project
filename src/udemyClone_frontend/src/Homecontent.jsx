import React, { useEffect, useState } from "react";
import images from "./content";
import slides from "./slidework";
import { Link } from "react-router-dom";

function Homecontent(){

    const [len , setlen] = useState(0)
    const [counts , setcounts] = useState(0)


    function forward(){

        if(len === images.length - 1){

            setlen(0)

        }

        else{

            setlen((prev) => prev + 1); 

       }

    }


    
    function backward(){

        if(len === 0){

            setlen(images.length - 1)

        }

        else{

            setlen((prev) => prev - 1); 


       }

    }

    function nextstep(){

        if(counts === slides.length - 1){

            setcounts(0)

        }

        else{

            setcounts((prev) => prev + 1); 

       }


    }

    useEffect(() => {
        const intervalId = setInterval(forward, 8000);

        return () => {
            clearInterval(intervalId);
        };
    }, [len]);






    return(

        <div className="homecontent">

            <div className="firstpart">

            <div className="box1">

            <img src="fontbackground.webp" alt="backgroundimg"></img>
            

            </div>


            <div className="box2">

                <button><Link to= "/dashboard">Create your Compaign</Link></button>
                <button><Link to= "/allcompaign">Explore And fund the Compaign</Link></button>
            </div>

            </div>





            <div className="secondpart">


               <p>{images[len].description}</p>
               <div className="btn">
               <i class="fa-solid fa-backward" onClick={backward}></i>
               <i class="fa-sharp fa-solid fa-forward" onClick={forward}></i>
               </div>
               <img src={images[len].imageName}></img>
               
               

                
            </div>



            <div className="thirdpart">

                <h1>How you Can add your Compaign</h1>

                <i class="fa-solid fa-arrow-right" onClick={nextstep}></i>


                <div className="box_1">
                    <p>{slides[counts].steps}</p>
                </div>




            </div>





        </div>
    )
}


export default Homecontent