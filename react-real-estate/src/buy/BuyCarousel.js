import React, { useContext } from 'react'
import Modal from "react-modal";
import UserContext from '../useContext/UserContext';
import {v4 as uuid} from 'uuid';
import { Redirect } from 'react-router-dom';

function BuyCarousel({singleHomeData}) {
    
  const {isBuyCarouselOpen, setIsBuyCarouselOpen} = useContext(UserContext);

  const handleOnRequestClose = ()=>{
    setIsBuyCarouselOpen(false);
  }
    const customStyles = {
        content: {
          top: "50%",
          width : "900px",
          height : "600px",
          left: "50%",
          right: "auto",
          bottom: "auto",
          width : "90%",
          height : "95%",
          overflow: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          color: "black",
          border: "1px solid #2F4F4F"
        },
        overlay: {
          backgroundColor: "BurlyWood"
        },
      };
    return (
      <>
      {singleHomeData ? <Modal isOpen={isBuyCarouselOpen} onRequestClose={handleOnRequestClose}  
      style={customStyles}
      ariaHideApp={false} >
          <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          {singleHomeData.photos.map((data, idx)=> (
            <li key={uuid()} data-target="#carouselExampleIndicators" data-slide-to={`${idx+1}`}></li>
          ))}
        </ol>
        <div className="carousel-inner">

          <div className="carousel-item active">
            <img className="d-block w-100" style={{"objectFit":"cover"}}
            src={singleHomeData.primary_photo ? singleHomeData.primary_photo.href : "..."} alt="slide" />
          </div>
          {singleHomeData.photos.map(data => (
                <div key={uuid()} className="carousel-item">
                <img className="d-block w-100" src={data.href} alt="slide" style={{"objectFit":"cover"}}/>
              </div>
          ))}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      </Modal> : <Redirect to="" />}
      
      </>
      
    );
}

export default BuyCarousel;
