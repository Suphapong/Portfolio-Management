import React, {useState, useEffect } from 'react'
import axios from 'axios'

import WorkAccordionItem from './WorkAccordionItem'
import { Accordion } from 'react-bootstrap'

export default function ListWork(){

    const [workList, setWorkList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/works').then(res => {
            //console.log(res.data);
            setWorkList(res.data)
        })
        .catch((error) => {
            console.log(error);
        })
      }, []);  

    const DataAccordion = () => {
        return workList.map((list, i) => {
            console.log("list ", list);
            return <WorkAccordionItem obj={list} eventkey={i}/>
        })
    }

    
    return (
        <div><br/>  
            <div class='container'>
            <div class="col">
                <div style={{marginLeft:"0rem"}}>
                    <Accordion defaultActiveKey="0">
                        {DataAccordion()}
                    </Accordion>
                </div>
            </div>
            </div>
        </div>
    )

}