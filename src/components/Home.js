import React, {useState, useEffect } from 'react'
import axios from 'axios'

import './Layout.css';


function Home() {

  const [workList, setWorkList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/works').then(res => {
            setWorkList(res.data)
        })
        .catch((error) => {
            console.log(error);
        })
      }, []);  

      const WorkCarousel = () => {
        return workList.map((list, i) => {
            console.log("list ", list);
            return (
              
              <div class="carousel-item">
                <img src={"/uploads/" + list.imageCover}  class="d-block w-100" alt="..."/>
              </div>)
        })
      }
  return (
    <div>
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://www.proplan.co.th/sites/20200910/Cat_life_stage_difference.jpg" class="d-block w-100" alt="..."/>
      </div>
      {WorkCarousel()}
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
    </div>
  </div>
  );
}

export default Home;
