import React, { useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import UserContext from "../useContext/UserContext";

const RentCard = ({property_id,status,primary_photo,list_price,description,address, setMessage, photos})=>{

  const {rentDetailOpen,setRentDetailOpen,addHomeInDB,addHomeInUserDB,currentUser, cityStateData, 
    rentHomes,userSavedHomesFunc, singleRentHome} = useContext(UserContext)

    const[isColored, setIsColored] = useState(false);
    const singleData = {property_id, status, primary_photo, list_price, description, address, photos};

    const handleClick = ()=>{
      setRentDetailOpen(true);
      singleRentHome({...singleData})
        console.log('clicked');
    }

    useEffect(()=>{
      const adding = async ()=>{
        if(isColored){
          const homeData = {property_id,status_code: status};
          const homeUserData = {home_property_id: property_id,user_username: currentUser.username};
          await addHomeInDB({ ...homeData });
          await addHomeInUserDB({ ...homeUserData });
          if(cityStateData){
            await rentHomes({...cityStateData});
          }else{
            await rentHomes({"city":"yuba city","state_code":"CA"})
          }
          
          await userSavedHomesFunc({"username":currentUser.username});
          setMessage(true);
        }
      }
      adding();
    })

    const handleColor = (e)=>{
      e.preventDefault();
        setIsColored(data => !data);
    }


    return (
        <>
          {singleData ? (
            <div className="zoom mb-5">
              <div className="col">
                <Link to="/rent" onClick={handleClick}>
                  <div
                    className="card border border-dark"
                    style={{ width: "15rem" }}
                  >
                    {singleData.primary_photo ? (
                      <img
                        className="card-img-top"
                        src={singleData.primary_photo.href}
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
                      {singleData.list_price === null ? 
                      <h5 className="card-title">Call Retailer for Price Details</h5> : 
                      <h5 className="card-title">{`$${singleData.list_price}/month`}</h5>}
                      
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">{`Home ${singleData.status && singleData.status.split("_").join(" ")}`}</li>
                      <li className="list-group-item">{singleData.address}</li>
                    </ul>
                  </div>
                </Link>
                <Link onClick={handleColor} to="/rent">
                  <div className="heart">
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
            <div style={{"fontSize":"3.5rem"}}>Loading...</div>
          )}
        </>
      );
}

export default RentCard;