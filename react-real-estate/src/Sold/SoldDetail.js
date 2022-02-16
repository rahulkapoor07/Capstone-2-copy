import React, { useContext } from "react";
import UserContext from "../useContext/UserContext";
import Modal from "react-modal";
import "./SoldDetail.css";
import {v4 as uuid} from "uuid";

const SoldDetail = ({ singleSoldHomeData }) => {
  const { soldDetailOpen, setSoldDetailOpen, setIsSoldCarouselOpen } = useContext(UserContext);
  
  const handleClick = ()=>{
    setIsSoldCarouselOpen(true);
  }


  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width : "90%",
      height : "95%",
      overflow: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      color: "black",
      border: "1px solid #2F4F4F",
    },
    overlay: {
      backgroundColor: "BurlyWood",
    },
  };
  return (
    <>
    
      <div className="SoldDetail">
        <Modal
          isOpen={soldDetailOpen}
          style={customStyles}
          onRequestClose={() => setSoldDetailOpen(false)}
          ariaHideApp={false}
        >
          <div className="container">
            {singleSoldHomeData && (
              <div className="row">
                <div onClick={handleClick} className="col-lg-8 sold-images">
                    {singleSoldHomeData.primary_photo ? <img
                    src={singleSoldHomeData.primary_photo.href}
                    alt="not found"
                    style={{"height":"500px"}}
                  />  : <img
                  src="https://st4.depositphotos.com/14953852/22772/v/1600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
                  alt="not found"
                  style={{"height":"500px"}}
                />}
                  {singleSoldHomeData.photos.map(data=> (
                    <img key={uuid()} src={data.href} alt="sold home"/>
                  ))}
                  <img src={singleSoldHomeData.street_view}/>
                </div>
                <div className="col-lg-4">
                  <h1>
                    {`$${singleSoldHomeData.list_price}`}{" "}
                    <span style={{ fontSize: "20px" }}>
                      {" "}
                      {`${singleSoldHomeData.home_description.beds}bd|${singleSoldHomeData.home_description.baths}bth|${singleSoldHomeData.home_description.sqft}sqft`}
                    </span>
                  </h1>
                  <p>{singleSoldHomeData.address}</p>
                  <p>Add to your wishlist</p>
                  <h2>Facts and Features:</h2>
                  <ul>
                    <li>{`Year Built : ${singleSoldHomeData.home_description.year_built}`}</li>
                    <li>{`Garage : ${singleSoldHomeData.home_description.garage}`}</li>
                    <li>
                      {`Total Baths : ${singleSoldHomeData.home_description.baths}`}
                      <ul>
                        <li>{`Half Bath : ${singleSoldHomeData.home_description.baths_half}`}</li>
                        <li>{`Full Bath : ${singleSoldHomeData.home_description.baths_full}`}</li>
                      </ul>
                    </li>
                    <li>{`Beds : ${singleSoldHomeData.home_description.beds}`}</li>
                    <li>{`Lot sqft : ${singleSoldHomeData.home_description.lot_sqft}`}</li>
                    <li>{`Year Built : ${singleSoldHomeData.home_description.year_built}`}</li>
                    <li>{`Year Built : ${singleSoldHomeData.home_description.year_built}`}</li>
                    <li>{`Stories : ${singleSoldHomeData.home_description.stories}`}</li>
                    <li>{`Type : ${singleSoldHomeData.home_description.type}`}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default SoldDetail;