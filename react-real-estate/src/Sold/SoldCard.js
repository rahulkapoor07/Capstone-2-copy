import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import UserContext from "../useContext/UserContext";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

const SoldCard = ({status, property_id, primary_photo, address, photos, utilities, home_description, 
    list_price, street_view, setMessage})=>{
    const {setSoldDetailOpen, singleSoldHome, currentUser,
     cityStateData,soldHomes, addHomeInDB,addHomeInUserDB, userSavedHomesFunc} = useContext(UserContext);
    const [isColored, setIsColored] = useState(false);
    const soldSingleHome = {status, property_id, primary_photo, address, photos, utilities, home_description,
                            list_price, street_view}
    const handleClick = (e)=>{
      e.preventDefault();
      setSoldDetailOpen(true);
      singleSoldHome({...soldSingleHome});
    }

    useEffect(()=>{
      const changeColor = async ()=>{
        if(isColored){
          const homeData = {property_id: soldSingleHome.property_id,status_code: soldSingleHome.status};
          const homeUserData = {home_property_id: soldSingleHome.property_id,user_username: currentUser.username};
          await addHomeInDB({ ...homeData });
          await addHomeInUserDB({ ...homeUserData });
          if(cityStateData){
            await soldHomes({...cityStateData})
          }else{
            await soldHomes({"city":"yuba city","state_code":"CA"});
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
        <div className="zoom mb-5">
        <div className="col">
          <Link to="/sold" onClick={handleClick}>
            <div className="card border border-dark" style={{ width: "15rem" }} >
              {soldSingleHome.primary_photo ? <img
                className="card-img-top"
                src={soldSingleHome.primary_photo.href}
                alt="Card cap"
                style={{ height: "150px" }}
              /> : <img
              className="card-img-top"
              src="https://st4.depositphotos.com/14953852/22772/v/1600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
              alt="Card cap"
            />}
              
              <div className="card-body">
                <h5 className="card-title">{`$${soldSingleHome.list_price}`}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{`Home ${soldSingleHome.status}`}</li>
                <li className="list-group-item">{soldSingleHome.address}</li>
              </ul>
            </div>
          </Link>
          <Link onClick={handleColor} to="/sold">
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
        </>
    )
}

export default SoldCard;