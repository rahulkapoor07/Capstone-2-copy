import React, { useContext, useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import UserContext from '../useContext/UserContext';
import {v4 as uuid} from "uuid";
import "./HomeDetail.css";

function HomeDetail() {
    const {username, property_id} = useParams();
    const [homeData, setHomeData] = useState(null);
    const {savedHomeDetailFunc} = useContext(UserContext);

    useEffect(()=>{
        const data = async () => {
          try{
            const res = await savedHomeDetailFunc({property_id});
            setHomeData(res);
          }catch(e){
            console.log(e);
          }
            
        }
        data()
    },[]);

    const handleClick = ()=>{
        console.log('images clicked');
    }

  return <div className='HomeDetail'>
       <div className="container">

{homeData && <div className="row justify-content-center">
    <div onClick={handleClick} className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col images">
    {homeData.photos ? <div>
      {homeData.photos.map(data => (
        <img key={uuid()} src={data.href}
        alt="homes"
          />
      ))}</div> : <img
      src="https://st4.depositphotos.com/14953852/22772/v/1600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
      alt="not found"
      style={{"height":"500px"}}/>}
  </div>
  <div className="col-xl-4 col-lg-4 col-md-4">
    <h1>
      {`$${homeData.list_price}`}{" "}
      {/* <span style={{ fontSize: "20px" }}>
        {" "}
        {`${homeData.home_description.beds}bd|${homeData.home_description.baths}bth|${homeData.home_description.sqft}sqft`}
      </span> */}
    </h1>
    <p>{homeData.address}</p>
    <p>Add to your wishlist</p>
    <h2>Facts and Features:</h2>
    <ul>
      <li>{`Year Built : ${homeData.description.year_built}`}</li>
      <li>{`Garage : ${homeData.description.garage}`}</li>
      <li>{`Total Baths : ${homeData.description.baths}`}
        <ul>
          <li>{`Half Bath : ${homeData.description.baths_half}`}</li>
          <li>{`Full Bath : ${homeData.description.baths_full}`}</li>
        </ul></li>
        <li>{`Beds : ${homeData.description.beds}`}</li>
      <li>{`Lot sqft : ${homeData.description.lot_sqft}`}</li>
      <li>{`Stories : ${homeData.description.stories}`}</li>
      <li>{`Type : ${homeData.description.type}`}</li>
    </ul>
  </div>
</div>}
  
</div>
  </div>;
}

export default HomeDetail;
