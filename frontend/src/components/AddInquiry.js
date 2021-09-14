import React,{useState} from "react";
import axios from "axios";


export default function AddInquiry(){


    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [inquiry, setInquiry] = useState("");

    function sendData(e){
        e.preventDefault();
        
        const newInquiry ={
            email,
            name,
            inquiry
        }

         axios.post("http://localhost:8070/inquiry/add", newInquiry).then(()=>{
             alert("Inquiry added")

             setEmail("");
             setName("");
             setInquiry("");
             
         }).catch((err)=>{
             alert(err)
         })      


    }

    return(
           
        
        <><div className="container">
            <form onSubmit={sendData}>
            <label for="UserId" className="form-label">Email</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter your email address" 
            onChange={(e)=>{setEmail(e.target.value);
            }}></input>

        
            <label for="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="exampleFormControlInput2" placeholder="Enter your name" 
            onChange={(e)=>{setName(e.target.value);
            }}></input>

        
                <label for="inquiry" className="form-label">Inquiry</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" 
                onChange={(e)=>{setInquiry(e.target.value);
            }}></textarea><br></br>

                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            
            </>
    )
}