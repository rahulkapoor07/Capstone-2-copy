import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import Modal from "react-modal";
import  {v4 as uuid} from "uuid";
import UserContext from '../useContext/UserContext';
import "./SelectModal.css";


function SelectModal({modalData, isModalOpen, buyHomes, soldHomes,rentHomes, setBuyHomeData,
                    setSoldHomeData, setRentHomeData, agentsDataFunc}) {
    const {setIsModalOpen, setCityStateData} = useContext(UserContext);
    const handleChange = (e)=>{
        setIsModalOpen(false);
        const {state_code, city} = e.target.dataset;
        const data = {state_code, city};    
        console.log(data);
        setBuyHomeData(null);
        setSoldHomeData(null);
        setRentHomeData(null);
        setCityStateData({...data});
        buyHomes({...data});
        soldHomes({...data});
        rentHomes({...data});
        agentsDataFunc({...data});
    }   
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          color: 'black',
          border : "1px solid #2F4F4F"
        },
        overlay: {
            backgroundColor: 'BurlyWood'
          }
      };

    return (
        <div className='SelectModal'>
        <Modal isOpen={isModalOpen} onRequestClose={()=> setIsModalOpen(false)} 
        style={customStyles} ariaHideApp={false}>
        {modalData ? <div>
        <p>Please select your location:</p>
        <ul>
        {modalData && modalData.map(data => (
            <li key={uuid()}>
                <Link onClick={handleChange} to="/buy"
                data-state_code={data.state_code}
                data-city={data.city}
                >
                {`${data.city},${data.state_code}`}
                </Link>
            </li>
        ))}
        </ul>
        </div> : <h2>Loading...</h2>}
        
    </Modal>
    </div>
    )
}

export default SelectModal;
