import React, {useState, useEffect } from 'react'
import axios from 'axios'


export default function CreateWork(props){

    const [workname, setWorkName] = useState("")
    const [membertype, setMemberType] = useState("")
    const [feature, setFeature] = useState("")
    const [imageCover, setImageCover] = useState("")
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [fileOption, setFilOption] = useState("")
    const [moreImage, setMoreImage] = useState("")
    const [pdf, setPDF] = useState("")

    const handleImageCover = (e) => {
        console.log("ImageCover", e.target.files);
        setImageCover(e.target.files[0])
     };

    const handleMoreImage = (e) => {
        console.log("MoreImage", e.target.files);
        setMoreImage(e.target.files[0])
    };

    const handlePDF = (e) => {
        console.log("PDF", e.target.files);
        setPDF(e.target.files[0])
    };

    const config = {     
    headers: { 'content-type': 'multipart/form-data' }
    }

    const onSubmitWork = (e) => {
        e.preventDefault()

        const formData = new FormData();

        formData.append("workname", workname);
        formData.append("membertype", membertype);
        formData.append("feature", feature);
        formData.append("imageCover", imageCover);
        formData.append("subject", subject);
        formData.append("fileOption", fileOption);
        formData.append("description", description);
        formData.append("moreImage", moreImage);
        formData.append("pdf", pdf);

        axios.post('http://localhost:4000/works/create-work', formData, config).then(res => {
            console.log(res.data);
            console.log("หายไปไหน");
            //window.location = "/list-work"  
        })  
        
    }
return (
<div>
    <div class="container-fluid" >
        <p style={{fontSize:"40px"}}>React Create Work Component</p>
        <form onSubmit={onSubmitWork}>
        <div class="mb-3">
            <label  class="sm-font">Project Name:</label>&nbsp;
            <input type="text" class="form-control-md" placeholder="Project name" value={workname} onChange={(e)=>setWorkName(e.target.value)}/>
        </div>

        <label class="sm-font">Project Member:</label>&nbsp;
        <div class="form-check">
            <input class="form-check-input" type="radio"  id="Radio1" value={"Solo"} onChange={(e)=>setMemberType(e.target.value)}
                checked={membertype == "Solo" ? true:false}/>
            <label class="sm-font" >Solo</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio"  id="Radio2" value={"Group"} onChange={(e)=>setMemberType(e.target.value)}
                checked={membertype  == "Group" ? true:false}/>
            <label class="sm-font">Group</label>
        </div>

        <label class="sm-font">Subject:</label>&nbsp;
        <input type="text" class="form-control-md" placeholder="Subject" value={subject} onChange={(e)=>setSubject(e.target.value)}/>
        
        <div class="mb-3">
            <label class="form-label">Cover image: </label>
            <input class="form-control" type="file" name="imageCover" onChange={(e)=>handleImageCover(e)}/>
        </div>

        <div class="form-check">
            <input class="form-check-input" type="radio"  id="opt1" value={"moreimage"} onChange={(e)=>setFilOption(e.target.value)}
                checked={fileOption == "moreimage" ? true:false}/>
            <label class="sm-font" >More image</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio"  id="opt2" value={"pdf"} onChange={(e)=>setFilOption(e.target.value)}
                checked={fileOption  == "pdf" ? true:false}/>
            <label class="sm-font">PDF file</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio"  id="opt3" value={"both"} onChange={(e)=>setFilOption(e.target.value)}
                checked={fileOption  == "both" ? true:false}/>
            <label class="sm-font">Both</label>
        </div>

        {(()=>{ 
        if (fileOption === "moreimage"){ 
            return(
            <div class="mb-3">
                <label class="form-label">More Image: </label>
                <input class="form-control" type="file" name="moreImage" onChange={(e)=>handleMoreImage(e)}/>
            </div>

        )}else if (fileOption === "pdf"){ 
            return(
            <div class="mb-3">
                <label class="form-label">PDF: </label>
                <input class="form-control" type="file" name="pdf" onChange={(e)=>handlePDF(e)}/>
            </div>
        )}else if (fileOption === "both"){ 
            return(<div>
            <div class="mb-3">
                <label class="form-label">More Image: </label>
                <input class="form-control" type="file" name="moreImage" onChange={(e)=>handleMoreImage(e)}/>
            </div>
            <div class="mb-3">
                <label class="form-label">PDF: </label>
                <input class="form-control" type="file" name="pdf" onChange={(e)=>handlePDF(e)}/>
            </div>
        </div>)}
        })()}


        <label class="sm-font">Feature:</label>
        <div class="mb-3">
            <textarea class="form-control-lg" rows="5" style={{fontSize:"20px", width:"22rem"}} value={feature} onChange={(e)=>setFeature(e.target.value)}></textarea>
        </div>

        <label class="sm-font">Description:</label>
        <div class="mb-3">
            <textarea class="form-control-lg" rows="5" style={{fontSize:"20px", width:"22rem"}} value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
        </div>

        
        <button type="submit" class="btn btn-success">Submit</button>
        </form>
    </div>
</div>
)
    
}