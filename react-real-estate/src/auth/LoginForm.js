import React, { useState } from "react";
import {useHistory} from "react-router-dom";

const LoginForm = ({login, setHomeModalOpen})=>{
    const INTIAL_VALUE = {"username": "","usernameError":"", "password": "", "passwordError":""};
    const [formData, setFormData] = useState(INTIAL_VALUE);
    const [formErrors, setFormErrors] = useState(null);
    const history = useHistory();
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData(data => ({...data, [name] : value}));
    }

    const validate = ()=>{
        let usernameError = "";
        let passwordError = "";

        if(!formData.username){
            usernameError = "Username can't be blank";
        }
        if(!formData.password){
            passwordError = "Password can't be blank";
        }

        if(usernameError || passwordError){
            setFormData(data => ({...data, usernameError,passwordError}));
            return false;
        }
        return true;
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const isValid = validate();
        if(isValid){
            const username = formData.username;
            const password = formData.password;
            const response = await login({username,password});
            if(response.success){
                setHomeModalOpen(true);
                setFormErrors(null);
                setFormData(INTIAL_VALUE);
                history.push("/");
            }else{
                setFormData(INTIAL_VALUE);
                setFormErrors(response.error);
            }
        }else{
            setFormErrors(null);
        }
        
    }

    return (
        <div className="container" style={{"marginTop":"100px"}}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="username">Username</label>
                <input className="form-control" id="username" placeholder="Enter username" 
                value={formData.username}
                name="username"
                onChange={handleChange}
                />
                </div>
                
                {formData.usernameError && 
                <div style={{fontSize:12, "color" : "red"}}>
                    {formData.usernameError}
                    </div>}
                
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input className="form-control" type="password" id="password" placeholder="Enter password" 
                value={formData.password}
                name="password"
                onChange={handleChange}/>
                </div>
                
                {formData.passwordError && 
                <div style={{fontSize:12, "color" : "red"}}>{formData.passwordError}</div>}
                

                {formErrors && <div className="alert alert-danger" role="alert">
                {<p>{`${formErrors}, Please try again!`}</p>}
                </div>}

                <button
                    className="btn btn-primary btn-lg float-right"
                    type="submit"
                >Submit</button>
            
            </form>
        </div>
    )
}

export default LoginForm;