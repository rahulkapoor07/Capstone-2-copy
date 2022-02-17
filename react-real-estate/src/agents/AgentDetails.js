import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../useContext/UserContext';
import "./AgentDetails.css";
import {v4 as uuid} from "uuid";

function AgentDetails() {
    const {singleAgentData} = useContext(UserContext); 
    console.log(singleAgentData);
    const allDetails = ()=>{
        return (
            <>
                <div className='row details'>
                <div className='col-xl-8 col-lg-8'>
                    <div className='row image-description'>
                        <div className='col-md-3 d-flex align-items-center'>
                            <img className='image' src={singleAgentData.agent_photo}/>
                        </div>
                        <div className='col-md-6'>
                        <p className='details'><strong>{singleAgentData.agent_name}</strong></p>
                            <p className='details'>
                                {singleAgentData.agent_phones.length ? singleAgentData.agent_phones[0].number : null}</p>
                            <p className='details'>{singleAgentData.agent_email}</p>
                            <p className='details'>{singleAgentData.office_address ? `${singleAgentData.office_address}` : null}</p>
                        </div>
                    </div>
                    <div className='description'></div>
                    {singleAgentData.agent_description && <>
                        <h2>About Us</h2>
                    <h3 style={{"display":"inline-block"}}>Specialties : </h3>
                    {singleAgentData.agent_type.length && singleAgentData.agent_type.map(type => (
                        <span className='font-weight-bold' key={uuid()}>{type} </span>
                    ))}
                    <p>{singleAgentData.agent_description}</p>
                    </>}
                    
                </div>
                <div className='col-xl-3 col-lg-4 professional'>
                    <div className='info'>
                    <h1>Professional Information</h1>
                    <div className='row'>
                        {singleAgentData.office_address && <><div className='line col-6'>Broker Address:</div>
                        <div className='line col-6'>{singleAgentData.office_address}</div></>}
                        
                        <div className='line col-6'>Agent Phone:</div>
                        <div className='line col-6'>{singleAgentData.agent_phones.map(phone => (
                            <span key={uuid()}>{phone.number} </span>
                        ))}</div>
                        <div className='line col-6'>Agent Website:</div>
                        <div className='line col-6'><a href={singleAgentData.agent_web_url} target="_blank">Website URL</a>
                        </div>
                        <div className='line col-6'>Office Name:</div>
                        <div className='line col-6'>{singleAgentData.office_name}</div>
                        <div className='line col-6'>Office Website:</div>
                        <div className='line col-6'><a href={singleAgentData.office_website} target="_blank">Office URL</a></div>
                    </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
    return (
        <div className='AgentDetails'>
            {singleAgentData ? allDetails() : <Redirect to="/"/>}
        </div>
    )
}

export default AgentDetails


