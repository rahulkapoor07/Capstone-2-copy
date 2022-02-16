import React, { useContext, useEffect } from 'react';
import {useHistory, Link} from "react-router-dom";
import UserContext from '../useContext/UserContext';
import { FcLike } from "react-icons/fc";
import "./SavedHomeCard.css";

function SavedHomeCard({property_id, photos, list_price, status, address}){
  const history = useHistory();
  const {removeHomeFromUserDB, currentUser, savedHomesDetailsFunc,userSavedHomesFunc} = useContext(UserContext)
  const cardData = {property_id, photos, list_price, status, address};

  const handleClick = (e)=>{
    e.preventDefault();
      console.log('clicked');
      history.push(`/profile/${currentUser.username}/${property_id}`)
    }
  
  const handleColor = async (e) =>{
    e.preventDefault();
    console.log("clicked on red heart color");
    const data = {property_id, "username" : currentUser.username}
    await removeHomeFromUserDB({...data});
    await userSavedHomesFunc({"username": currentUser.username});
    await savedHomesDetailsFunc({"username": currentUser.username});
  }
  // console.log(cardData);
  return <div>
          {cardData ? (
        <div className="zoom mb-5">
          <div className="col">
            <Link to={`/profile/${currentUser.username}/${property_id}`} onClick={handleClick}>
              <div
                className="card border border-dark"
                style={{ width: "15rem" }}
              >
                {cardData.photos ? (
                  <img
                    className="card-img-top"
                    src={cardData.photos[0].href}
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
                  <h5 className="card-title">{`$${cardData.list_price}`}</h5>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">{`Home ${cardData.status.split("_").join(" ")}`}</li>
                  <li className="list-group-item">{cardData.address}</li>
                </ul>
              </div>
            </Link>
            <Link onClick={handleColor} to="/buy">
              <div>
                  <FcLike
                    size="2rem"
                    style={{ position: "absolute", top: "5px", right: "25px" }}
                  />
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
  </div>;
}

export default SavedHomeCard;
