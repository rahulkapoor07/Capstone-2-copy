import React, {useContext, useState} from 'react';
// import {useHistory} from "react-router-dom";
import Modal from "react-modal";
import UserContext from '../useContext/UserContext';

function HomeModal({homeModalOpen}) {
    // const history = useHistory();
    const {inputHandle, setModalData, setHomeModalOpen, setIsModalOpen} = useContext(UserContext);
    const INITIAL_STATE = {"input" : ""};
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData(code => ({...code, [name] : value}));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        inputHandle({...formData});
        setModalData(null);
        setHomeModalOpen(false);
        setIsModalOpen(true);
        // history.push("/buy");

    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          color: 'lightsteelblue'
        },
        overlay: {
            backgroundColor: 'papayawhip'
          }
      };

    return (
        <Modal isOpen={homeModalOpen} style={customStyles} ariaHideApp={false}>
            <div className="EnterZip">
            <form onSubmit= {handleSubmit}>
                <input type="text" placeholder="Enter city or ZIP code"
                name="input"
                value={formData.input}
                onChange={handleChange} />
                <input type="submit" />
            </form>
        </div>
        </Modal>
    )
}

export default HomeModal;
