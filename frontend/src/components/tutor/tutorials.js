import React ,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './tutorials.css'

function Tutorials() {

    const [tutorial , setTutorial] = useState([])
    useEffect(()=>{
        axios.get('/tutortutorials').then(res => setTutorial(res.data))
        .catch(error => console.log(error))
    })

    // const Tutorials = (tutorial)=>{
        return (
            <div className = "mainContainer">
                {/* <h2>Tutorials</h2> */}
                 {tutorial.map((article , key)=>(
                     <div className = "container" key={key}>
                         <img src = {`/uploads/${article.articleImage}`} alt ="..."
                         style ={{width: "30%" }}/>
                         <Link to ={{ pathname : `/tutortutorials/${article._id}`}}>
                           <h3 className ="title">{article.title}</h3>
                         </Link>
                          
                          <p className = "article">{article.article}</p>
                          <button className="namebtn">{article.authorName}</button>
                          <br />
                     </div>

                 ))}
            </div>
        )
    // }
    
}

export default Tutorials
