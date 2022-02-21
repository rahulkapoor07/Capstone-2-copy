import React from 'react';
import {v4 as uuid} from "uuid";
import SavedHomeCard from './SavedHomeCard';
import "./UserProfileHomeList.css";

function UserProfileHomeList({savedHomesDetails}) {
  return (
      <>
      <div className="UserProfileHomeList container mt-5" >
      <div className='row justify-content-center'>
      {savedHomesDetails ? savedHomesDetails.map(data => (
          <SavedHomeCard key={uuid()} property_id={data.property_id} list_price={data.list_price}
          photos={data.photos} status={data.status} address={data.address}/>
      )) : <div style={{"fontSize":"3.5rem"}}>Loading...</div>}
      </div>
  </div>
      
    
</>
  )
}

export default UserProfileHomeList;
