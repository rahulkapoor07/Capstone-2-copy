  import React, { useContext } from "react";
  import UserContext from "../useContext/UserContext";
  import Modal from "react-modal";
  import {v4 as uuid} from "uuid";
  import "./BuyDetail.css"

  const BuyDetail = ({ singleHomeData }) => {
    const { detailOpen, setdetailOpen, setIsBuyCarouselOpen } = useContext(UserContext);
    const handleClick = ()=>{
      setIsBuyCarouselOpen(true);
    }

    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        width : "90%",
        height : "95%",
        overflow: "auto",
        transform: "translate(-50%, -50%)",
        color: 'black',
        border : "1px solid #2F4F4F"
          },
          overlay: {
              backgroundColor: 'BurlyWood'
            }
    };
    // BurlyWood
    return (
      <>
        <div className="BuyDetail">
          <Modal
            isOpen={detailOpen}
            style={customStyles}
            onRequestClose={() => setdetailOpen(false)}
            ariaHideApp={false}
          >
            <div className="container">

              {singleHomeData && <div className="row">
                  <div onClick={handleClick} className="col-lg-8 images">
                  {singleHomeData.primary_photo ? <div>
                  <img src={singleHomeData.primary_photo.href} alt="not found"/>
                    {singleHomeData.photos.map(data => (
                      <img key={uuid()} src={data.href}
                      alt="homes"
                        />
                    ))}
                    <img src={singleHomeData.street_view} alt="street view"/></div> : <img
                    src="https://st4.depositphotos.com/14953852/22772/v/1600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
                    alt="not found"
                    style={{"height":"500px"}}/>}
                </div>
                <div className="col-lg-4">
                  <h1>
                    {`$${singleHomeData.home_price}`}{" "}
                    <span style={{ fontSize: "20px" }}>
                      {" "}
                      {`${singleHomeData.home_description.beds}bd|${singleHomeData.home_description.baths}bth|${singleHomeData.home_description.sqft}sqft`}
                    </span>
                  </h1>
                  <p>{singleHomeData.address}</p>
                  <p>Add to your wishlist</p>
                  <h2>Facts and Features:</h2>
                  <ul>
                    <li>{`Year Built : ${singleHomeData.home_description.year_built}`}</li>
                    <li>{`Garage : ${singleHomeData.home_description.garage}`}</li>
                    <li>{`Total Baths : ${singleHomeData.home_description.baths}`}
                      <ul>
                        <li>{`Half Bath : ${singleHomeData.home_description.baths_half}`}</li>
                        <li>{`Full Bath : ${singleHomeData.home_description.baths_full}`}</li>
                      </ul></li>
                      <li>{`Beds : ${singleHomeData.home_description.beds}`}</li>
                    <li>{`Lot sqft : ${singleHomeData.home_description.lot_sqft}`}</li>
                    <li>{`Year Built : ${singleHomeData.home_description.year_built}`}</li>
                    <li>{`Stories : ${singleHomeData.home_description.stories}`}</li>
                    <li>{`Type : ${singleHomeData.home_description.type}`}</li>
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