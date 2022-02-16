import React,{useContext, useEffect, useState} from "react";
import UserContext from "../useContext/UserContext";
import {v4 as uuid} from "uuid";
import RentCard from "./RentCard";
import "./RentList.css"

const RentList = ()=>{
    const {rentHomeData, rentHomes, cityStateData,setRentHomeData} = useContext(UserContext);
    const [message, setMessage] = useState(false);

    useEffect(()=>{
        if(!cityStateData){
            const data = {"state_code":"CA","city":"yuba city"};
        rentHomes({...data});
        return ()=>{
            setRentHomeData(null);
        }
        }
        
    },[]);

    useEffect(()=>{
        if(message){
            alert("Home has been added to Wishlist, please visit saved homes to view!");
            setMessage(false);
        }
    })

    console.log(rentHomeData);
    return (
        <div className="container rentList mt-5 d-flex justify-content-center">
            <div className="row">
                {rentHomeData ? rentHomeData.map(data => (
                <RentCard key={uuid()} property_id={data.property_id} status={data.status} primary_photo={data.primary_photo}
                list_price={data.list_price} photos={data.photos} description={data.description} address={data.address}
                setMessage={setMessage}/>
            )) : <div className="buy-loading"></div>}
            </div>
        </div>
    )
}

export default RentList;