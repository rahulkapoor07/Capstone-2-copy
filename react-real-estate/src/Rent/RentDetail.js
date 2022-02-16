import React, { useContext } from "react";
import UserContext from "../useContext/UserContext";
import Modal from "react-modal";
import "./RentDetail.css"
import {v4 as uuid} from "uuid";

const BuyDetail = ({ singleRentHomeData }) => {
  const { rentDetailOpen, setRentDetailOpen, setIsRentCarouselOpen } = useContext(UserContext);

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

  const handleClick = ()=>{
    setIsRentCarouselOpen(true);
  }

  return (
    <>
      <div className="RentDetail">
        <Modal
          isOpen={rentDetailOpen}
          style={customStyles}
          onRequestClose={() => setRentDetailOpen(false)}
          ariaHideApp={false}
        >
          <div className="container">
            {singleRentHomeData && <div className="row">
              <div onClick={handleClick} className="col-xl-8 col-lg-8 rent-images">
              {singleRentHomeData.primary_photo ? <div>
                <img
                  src={singleRentHomeData.primary_photo.href}
                  alt="not found"
                  style={{"height":"500px"}}/>
              </div> : <div className="col-sm-8">
                <img
                  src="https://st4.depositphotos.com/14953852/22772/v/1600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
                  alt="not found"
                  style={{"height":"500px"}}/>
              </div>}
              
              {singleRentHomeData.photos && singleRentHomeData.photos.map(photo => (
                <img src={photo.href}/>
              ))}


              </div>
                
              
              <div className="col-xl-4 col-lg-4">
                <h1>
                  {singleRentHomeData.list_price ? `$${singleRentHomeData.list_price}` : ""}{" "}
                  <span style={{ fontSize: "20px" }}>
                    {" "}
                    {`${singleRentHomeData.description.beds ?
                       singleRentHomeData.description.beds : "-"}bd|${singleRentHomeData.description.baths ?
                        singleRentHomeData.description.baths : "-"}bth|${singleRentHomeData.description.sqft ?
                         singleRentHomeData.description.sqft : "-"}sqft`}
                  </span>
                </h1>
                <p>{singleRentHomeData.address}</p>
                <h2>Facts and Features:</h2>
                  <ul>
                    {Object.keys(singleRentHomeData.description).map(key => (
                      <>{singleRentHomeData.description[key] !== null ? <li key={uuid()}>{`${key.split("_").join(" ")} : ${singleRentHomeData.description[key]}`}</li> : ""}</>
                    ))}
                  </ul>
              </div>
            </div>}
              
          </div>
        </Modal>
      </div>
    </>
  );
};

export default BuyDetail;