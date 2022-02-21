import React, { useContext, useEffect } from 'react';
import UserContext from '../useContext/UserContext';
import AgentCard from './AgentCard';
import {v4 as uuid} from "uuid";
import "./AgentList.css"

function AgentsList() {
    const {agentsData,agentsDataFunc} = useContext(UserContext);

    useEffect(()=>{
        if(!agentsData){
            const data = {"state_code":"CA","city":"yuba city"};
            agentsDataFunc({...data});
            console.log('inisde');
        }
    },[]);

    return (
        <>
        <div className="BuyList container mt-5 d-flex justify-content-center" style={{"display": "inline-block"}}>
            {agentsData ? <div>
            <div className='row'>
                <div className='head col-md-6'><h3>AGENTS</h3></div>
                <div className='head-des col-md-6'><h3>AGENTS DESCRIPTION</h3></div>
            </div>
            <hr/>
            <div>
            {agentsData.map(data => (
                <AgentCard key={uuid()} agent_name={data.agent_name} agent_phones={data.agent_phones}
                id={data.id} agent_photo={data.agent_photo} agent_description={data.agent_description}
                agent_email={data.agent_email} agent_area_served={data.agent_area_served}
                agent_type={data.agent_type} agent_web_url={data.agent_web_url}
                office_address={data.office_address} office_name={data.office_name}
                office_website={data.office_website}/>
            ))} 
            <hr/>
            </div>
            </div> : <div style={{"fontSize":"3.5rem"}}>Loading...</div>}
        </div>
        </>
    )
}

export default AgentsList;
