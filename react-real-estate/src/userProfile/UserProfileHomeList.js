import React from 'react';
import {v4 as uuid} from "uuid";
import SavedHomeCard from './SavedHomeCard';
import "./UserProfileHomeList.css";

function UserProfileHomeList({savedHomesDetails}) {
  return (
      <>
      <div className="UserProfileHomeList container mt-5 d-flex justify-content-center" style={{"display": "inline-block"}}>
      <div className='row'>
      {savedHomesDetails ? savedHomesDetails.map(data => (
          <SavedHomeCard key={uuid()} property_id={data.property_id} list_price={data.list_price}
          photos={data.photos} status={data.status} address={data.address}/>
      )) : <div className='buy-loading'></div>}
      </div>
  </div>
      
    
</>
  )
}

export default UserProfileHomeList;
