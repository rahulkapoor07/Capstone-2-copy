import React, { useContext } from 'react';
import { Link,useHistory } from "react-router-dom";
import "./AgentCard.css"
import UserContext from '../useContext/UserContext';

function AgentCard({agent_name, agent_phones, id, agent_photo, agent_description, agent_email, agent_type
    ,agent_web_url,office_address,office_name,office_website}) {
    const history = useHistory();
    const {setSingleAgentData} = useContext(UserContext);
    const singleData = {agent_name, agent_phones, id, agent_photo, agent_description, agent_email, agent_type
        ,agent_web_url,office_address,office_name,office_website}
    

    const handleClick = (e)=>{
        e.preventDefault();
        setSingleAgentData({...singleData})
        history.push(`/agents/${id}`)
    }
        return (
            <div className='AgentCard zoom'>
                <Link to={`/agents/${id}`} 
                style={{"background":"#694E4E", "color":"white", "textDecoration":"none"}}
                onClick={handleClick}>
                {singleData && <div className='row'>
                <div className='col-md-6'>
                    <div className='row'>
                        <div className='col-xl-3 col-lg-3'>
                            <img src={agent_photo} alt="photo"/>
                        </div>
                        <div className='col-xl-8 col-lg-6'>
                            <p className='details'><strong>{agent_name}</strong></p>
                            <p className='details'>{agent_phones ? agent_phones[0].number : null}</p>
                            <p className='details'>{agent_email}</p>
                            <p className='details'>{office_address ? `${office_address}` : null}</p>
                        </div>
                    </div>
                </div>
                <div className='description col-md-5'>
                    <p>{agent_description ?`${agent_description.split("").splice(0,180).join("")}...` : `No Description`}</p>
                    </div>
              </div>}
                </Link>         
          </div>
    )
}

export default AgentCard;
