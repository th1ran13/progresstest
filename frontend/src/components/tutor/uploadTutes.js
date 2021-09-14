import React , {useState} from 'react'
import axios from 'axios'
import './uploadTutes.css'
import Footer from '../Footer'

function AddTutorial() {

    const [title, setTitle] = useState('')
    const [article, setArticle] = useState('')
    const [authorName, setAuthorName] = useState('')
    const [message , setMessage] = useState('')
    const [fileName, setFileName] = useState('')

    const onChangeFile = e =>{
        setFileName(e.target.files[0]);
    }

    const changeOnClick = e =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("title" , title);
        formData.append("article" , article);
        formData.append("authorName" ,authorName )
        formData.append("articleImage" , fileName)

        // const tutorials ={
        //     title,
        //     article,
        //     authorName
        // }

        setTitle("");
        setArticle("");
        setAuthorName("");
        axios.post('/tutor/tutoraddarticle' , /*tutorials*/ formData)
        .then(res => setMessage(res.data))
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <>
        <div className = "uploadtute">
        
          <h2>Add Tutorial</h2>
          <span className = "message">{message}</span>
           <form onSubmit ={changeOnClick} encType = "multipart/form-data">
                <div>
                    <label htmlFor = "authorName">Author Name</label>
                    <input type = "text" placeholder = "Author Name" 
                         onChange = {e=>setAuthorName(e.target.value)}  
                    />
                </div>

                <div>
                    <label htmlFor = "title">Title</label>
                    <input type = "text" placeholder = "Title" 
                      onChange = {e=>setTitle(e.target.value)}  
                    />
                    
                </div>
                <div >
                    <label htmlFor="article">Article</label>
                    <textarea className = "textarea" rows="3"
                        onChange = {e=>setArticle(e.target.value)}  
                    >

                    </textarea>
               </div>
               {/* <div>
                    <label htmlFor = "file">Choose Image</label>
                    <input type = "file"  
                        fileName = "articleImage"                  
                        onChange = {onChangeFile}
                    />
                </div> */}
                <div class="form-group">
                <label htmlFor="file" >Upload image</label>
                <input type="file" filename="articleImage"  className="form-control-file " onChange = {onChangeFile} />
                </div>


                <div className = "buttons">
                   <button type="submit" className="btn btn-primary">Post Tutorial</button>
             
                </div>
              
            </form>
        </div>
        <Footer />
        </>
    )
}

export default AddTutorial
