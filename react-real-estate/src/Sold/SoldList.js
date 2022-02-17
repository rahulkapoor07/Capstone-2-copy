import React, {useContext, useEffect, useState} from "react";
import SoldCard from "./SoldCard";
import UserContext from "../useContext/UserContext";
import {v4 as uuid} from "uuid";
import "./SoldList.css";

const SoldList = ()=>{
    const {soldHomeData, soldHomes, cityStateData, setSoldHomeData} = useContext(UserContext);
    const [message, setMessage] = useState(false);

    useEffect(()=>{
        if(!cityStateData){
            const data = {"state_code":"CA","city":"yuba city"};
        soldHomes({...data});
        }
    },[]);

    useEffect(()=>{
        if(message){
            alert("Home added");
            setMessage(false);
        }
    })
      
    return (
        <>
        {soldHomeData ? <div className="SoldList container mt-5" >
            <div className="row justify-content-center">
                {soldHomeData && soldHomeData.map(data => (
                    <div key={uuid()}>
                        {<SoldCard status={data.status} property_id={data.property_id}
                        primary_photo={data.primary_photo} address={data.address}
                        photos ={data.photos} utilities={data.utilities}
                        home_description={data.description} list_price = {data.list_price}
                        street_view={data.street_view} setMessage={setMessage}/>}
                    </div>))}
            </div>
        </div> : <div className="sold-loading"></div>}
        </>
        
        
    )
}



export default SoldList;