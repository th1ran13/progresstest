import React from "react";
import Footer from "../Footer";
//import TutorHeader from './tutorHeader';
import TutorBtn from "./tutorbutton";
import './tutorLanding.css'
import image from './tutor.png'

function TutorLanding(){
    return(
        <>
        <div className = "container">
           {/* <TutorHeader /> */}
           
           <div >

               <h1>Want to become Tutor</h1>
               
               <div className = "img"><img  src ={image}></img></div>
               <div className = "Quote">
                  <p>Teachers plant SEEDS of Knowledge that GROW FOREVER....</p>
                  <TutorBtn />
               </div>              
               
           </div>

        </div>
        <Footer />
        </>
    )
}

export default TutorLanding