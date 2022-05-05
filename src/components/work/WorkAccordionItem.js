import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Accordion } from 'react-bootstrap'
import axios from 'axios'



export default function WorkAccordionItem(props){
    const {obj, eventkey} = props

    const deleteWork = () => {
        axios.delete('http://localhost:4000/works/delete-work/' + obj._id).then(res => {
            console.log('Work successfully deleted!');
            window.location.reload()
            }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Accordion.Item eventKey={eventkey}>
            <Accordion.Header>
                <img  src={"/uploads/" + obj.imageCover} 
                width="200" height="200" />
                <p style={{paddingTop:"0rem"}}>{obj.workname}</p>
            </Accordion.Header>
            <Accordion.Body>
            
                <p className='sm-font'>Project Name: {obj.workname} </p>
                <p className='sm-font'>Project Member: {obj.membertype} </p>
                <p className='sm-font'>Feature: <br/> {obj.feature} </p>


                <p className='sm-font'>obj.imageCover: {obj.imageCover} </p>
                <p className='sm-font'>obj._id: {obj._id} </p>

                <div class="btn-group" role="group" style={{justifyItems:"flex-end"}}>
                    <Link to={"/edit-work/" + obj._id}><button type="button" class="btn btn-warning">เเก้ไข</button></Link>
                    <button type="button" class="btn btn-danger" onClick={deleteWork}>ลบ</button>
                </div>
                    
            </Accordion.Body>
        </Accordion.Item>
        
    )
    
}