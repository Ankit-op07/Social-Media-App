import React,{ useState,useEffect}from "react";
import { Container } from "react-bootstrap";
import {useNavigate } from'react-router-dom'

function CreatePost() {
    
    const navigate = useNavigate();
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")

    // i put this in useEffect because i want to get the url first from cloudnary
    useEffect(()=>{
        if(url){
            fetch("/createpost",{
                method:"post",
                headers:{
                    "content-type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                body:JSON.stringify({
                        title:title,
                        body:body,
                        pic:url
                         })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data);
                navigate('/')
            })
     }
     },[url])

     //getting url for the uploaded images from cloudnary
    const postDetails = ()=>{
        const data = new FormData();
        data.append("file",image)
        data.append("upload_preset","Social Media");
        data.append("clout_name","litho")
        // const CLOUDINARY_URL= "cloudinary://368377658676819:D2BPRnM_JiA79P18mnktu03f0cs@litho"
        fetch("https://api.cloudinary.com/v1_1/litho/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data);
            setUrl(data.url)
            // console.log(url)
        })
        .catch(err=>{
            console.log(err)
        })

       
    }


    










  return (
    <Container>
      <div className="mb-3">
        <label HTMLfor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
        //   placeholder=""
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label HTMLfor="exampleFormControlTextarea1" className="form-label">
          What's is in your mind
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          onChange={(e)=>setBody(e.target.value)}
          value={body}
        ></textarea>
      </div>
      <input type="file" className="form-control mb-3" onChange={(e)=>{
          setImage(e.target.files[0]);
        }} />
      <div className="d-flex justify-content-center ">
        <button className="btn btn-primary" onClick={()=>postDetails()}>Create Post</button>
      </div>
    </Container>
  );
}

export default CreatePost;
