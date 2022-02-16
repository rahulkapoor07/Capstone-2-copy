import React, { useContext } from "react";
import Modal from "react-modal";
import UserContext from "../useContext/UserContext";
import { v4 as uuid } from "uuid";

function SoldCarousel({ singleSoldHomeData }) {
  const { isSoldCarouselOpen, setIsSoldCarouselOpen } = useContext(UserContext);

  const handleOnRequestClose = () => {
    setIsSoldCarouselOpen(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      width : "900px",
      height:"600px",
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
      {singleSoldHomeData && (
        <Modal
          isOpen={isSoldCarouselOpen}
          onRequestClose={handleOnRequestClose}
          style={customStyles}
          ariaHideApp={false}
        >
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
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              {singleSoldHomeData.photos.map((data, idx)=>(
                    <li key={uuid()}
                    data-target="#carouselExampleIndicators"
                    data-slide-to={`${idx+2}`}
                  ></li>
              ))}
              
              
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src={singleSoldHomeData.primary_photo.href}
                  alt="First slide"
                  style={{"objectFit":"cover"}}
                />
              </div>
              {singleSoldHomeData.photos.map((data) => (
                <div key={uuid()} className="carousel-item">
                  <img className="d-block w-100" src={data.href} alt="slide" 
                  style={{"objectFit":"cover"}}/>
                </div>
              ))}
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={singleSoldHomeData.street_view}
                  alt="slide"
                  style={{"objectFit":"cover"}}
                />
              </div>
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
        </Modal>
      )}
    </>
  );
}

export default SoldCarousel;
