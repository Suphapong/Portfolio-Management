import React, {useState, useEffect} from 'react'
import {Link,useParams } from 'react-router-dom'
import axios from 'axios'


export default function EditWork(props) {
    const {workID} = useParams()
    const [workname, setWorkName] = useState("")
    const [membertype, setMemberType] = useState("")
    const [feature, setFeature] = useState("")
    const [imageCover, setImageCover] = useState("")
    const [subject, setSubject] = useState("")

    const [workData, setWorkData] = useState("")
    
    const handleImageCover = (e) => {
        console.log("ImageCover", e.target.files);
        setImageCover(e.target.files[0])
     };

    
    useEffect(() => {
        axios.get('http://localhost:4000/works/edit-work/' + workID).then(res => {

            setWorkData(res.data)

            setWorkName(res.data.workname)
            setMemberType(res.data.membertype)
            setImageCover(res.data.imageCover)
            setFeature(res.data.feature)
            setSubject(res.data.subject)
        })
        .catch((error) => {
            console.log(error)
        })
      }, []);

    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    const onSubmitWork = (e) => {
        e.preventDefault()
        
        const workObject = {
            workname : workname,
            membertype : membertype,
            feature : feature,
            imageCover : imageCover,
            subject : subject
        }
        
        const formData = new FormData();

        formData.append("workname", workname);
        formData.append("membertype", membertype);
        formData.append("feature", feature);
        formData.append("imageCover", imageCover);
        formData.append("subject", subject);


        console.log("workObject",workObject);
        axios.put(`http://localhost:4000/works/update-work/${workID}/`,workObject, config).then(res => {
            console.log(res.data);
            console.log('Work Successfully Updated');
            window.location = "/list-work"
        })
    }

return (
    <div>
        <div class="container-fluid">
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
            
            <div class="mb-3">
                <label class="sm-font">Subject:</label>&nbsp;
                <input type="text" class="form-control-md" placeholder="Subject" value={subject} onChange={(e)=>setSubject(e.target.value)}/>
            </div>
    
            <div className="row"> 
        
                <label class="form-label">Image Cover {workData.imageCover}</label>
                <img  src={"/uploads/" + workData.imageCover}  style={{maxWidth: "50%"}} />
                
            </div>
            <input class="form-control" type="file" name="imageCover" onChange={(e)=>handleImageCover(e)} style={{maxWidth: "22rem"}}/>
    
            <label class="sm-font">Feature:</label>
            <div class="mb-3">
                <textarea class="form-control-lg" rows="5" style={{fontSize:"20px", width:"22rem"}} value={feature} onChange={(e)=>setFeature(e.target.value)}></textarea>
            </div>
            <button type="submit" class="btn btn-success">Submit</button>
            </form>
        </div>
    </div>
    )}
