import React from 'react';
import Modal from "react-modal";
import "./MortgageModal.css";
import {v4 as uuid} from "uuid";

function MortgageModal({isMortgageOpen, setIsMortgageOpen, mortgageData}) {

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      color: 'black',
      border : "1px solid #2F4F4F"
        },
        overlay: {
            backgroundColor: 'BurlyWood'
          }
  };
    return (
      <div className='MortgageModal'>
        <Modal isOpen={isMortgageOpen} style={customStyles} 
        onRequestClose={()=>{setIsMortgageOpen(false)}}
        ariaHideApp={false}>
          <h1>Mortgage Calculator</h1>
          {mortgageData ? <ul>
            {Object.keys(mortgageData).map(keyName => (
              <li key={uuid()}><b>{keyName.split("_").join(" ")}</b> : {mortgageData[keyName]}</li>
            ))}
          </ul> : <div style={{"fontSize":"3.5rem"}}>Loading...</div>}
        </Modal>
      </div>
    );
}

export default MortgageModal;


