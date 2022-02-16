import React, { useState, useContext } from "react";
import UserContext from "../useContext/UserContext";

const EnterZip = ()=>{
    const {inputHandle, setIsModalOpen, setModalData} = useContext(UserContext);
    const INITIAL_STATE = {"input" : ""};
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData(code => ({...code, [name] : value}));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        inputHandle({...formData});
        setIsModalOpen(true);
        setModalData(null);
    }

    return (
        <div className="EnterZip">
            <form onSubmit= {handleSubmit}>
                <input type="text" placeholder="Enter city or ZIP code"
                name="input"
                value={formData.input}
                onChange={handleChange} />
                <input type="submit" />
            </form>
        </div>
    )
}

export default EnterZip;

