import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../useContext/UserContext";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import "./BuyCard.css";

const BuyCard = ({status,property_id,primary_photo,address,photos,home_details,home_description,
  home_price,street_view,fav_heart}) => {
  
    const {setdetailOpen,singleHome,addHomeInDB,addHomeInUserDB,currentUser, cityStateData, 
      buyHomes,userSavedHomesFunc, setMessage} = useContext(UserContext);

  const singleHomeData = {status,property_id,primary_photo,address,photos,home_details,
    home_description,home_price,street_view,fav_heart};

    const [isColored, setIsColored] = useState(false);

  const handleClick = (e) => {
    setdetailOpen(true);
    singleHome({ ...singleHomeData });
  };

  useEffect(()=>{
    const changeColor = async ()=>{
      if(isColored){
        const homeData = {property_id: singleHomeData.property_id,status_code: singleHomeData.status};
        const homeUserData = {home_property_id: singleHomeData.property_id,user_username: currentUser.username};
        await addHomeInDB({ ...homeData });
        await addHomeInUserDB({ ...homeUserData });
        console.log(cityStateData);
        if(cityStateData){
          await buyHomes({...cityStateData});
        }else{
          await buyHomes({"city" : "yuba city","state_code":"CA"});
        }
        
        await userSavedHomesFunc({"username":currentUser.username});
        setMessage(true);
      }
    }
    changeColor();
  },[isColored]);

  const handleColor = async () => {
    setIsColored((data) => !data);
  };

  return (
    <>
      {singleHomeData ? (
        <div className="zoom mb-5">
          <div className="col">
            <Link to="/buy" onClick={handleClick}>
              <div
                className="card border border-dark"
                style={{ width: "15rem" }}
              >
                {singleHomeData.primary_photo ? (
                  <img
                    className="card-img-top"
                    src={singleHomeData.primary_photo.href}
                    alt="Card cap"
                    style={{ height: "150px" }}
                  />
                ) : (
                  <img
                    className="card-img-top"
                    src="https://st4.depositphotos.com/14953852/22772/v/1600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
                    alt="Card cap"
                    style={{ height: "150px" }}
                  />
                )}

                <div className="card-body">
                  <h5 className="card-title">{`$${singleHomeData.home_price}`}</h5>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">{`Home ${singleHomeData.status && singleHomeData.status.split("_").join(" ")}`}</li>
                  <li className="list-group-item">{singleHomeData.address}</li>
                </ul>
              </div>
            </Link>
            <Link onClick={handleColor} to="/buy">
              <div>
                {isColored ? (
                  <FcLike
                    size="2rem"
                    style={{ position: "absolute", top: "5px", right: "25px" }}
                  />
                ) : (
                  <FcLikePlaceholder
                    size="2rem"
                    style={{ position: "absolute", top: "5px", right: "25px" }}
                  />
                )}
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
};

export default BuyCard;
