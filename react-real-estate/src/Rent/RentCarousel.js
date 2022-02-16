import React, { useContext } from 'react';
import Modal from "react-modal";
import { Redirect } from 'react-router-dom';
import UserContext from '../useContext/UserContext';
import {v4 as uuid} from "uuid";

function RentCarousel({singleRentHomeData}) {
    const {isRentCarouselOpen,setIsRentCarouselOpen} = useContext(UserContext);
    const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width : "90%",
          height : "95%",
          overflow: "auto",
          color: 'black',
          border : "1px solid #2F4F4F"
            },
            overlay: {
                backgroundColor: 'BurlyWood'
              }
      };
  return (
    <>
    {singleRentHomeData ? 
    <Modal isOpen={isRentCarouselOpen} style={customStyles} 
    onRequestClose={()=> setIsRentCarouselOpen(false)}
    ariaHideApp={false}>
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    {singleRentHomeData.photos && singleRentHomeData.photos.map((photo, idx)=>(
        <li key={uuid()} data-target="#carouselExampleIndicators" data-slide-to={idx+1}></li>
    ))}
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src={singleRentHomeData.primary_photo.href} alt="First slide" />
    </div>
    {singleRentHomeData.photos && singleRentHomeData.photos.map(photo => (
        <div key={uuid()} className="carousel-item">
        <img className="d-block w-100" src={photo.href} alt="slide" />
      </div>
    ))}
    
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
    </Modal> : <Redirect to="/" />}
    
    </>
  )
}

export default RentCarousel;
