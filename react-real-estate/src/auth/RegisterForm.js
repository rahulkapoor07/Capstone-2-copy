import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import {v4 as uuid} from "uuid";

const RegisterForm = ({signUp, setHomeModalOpen})=>{
    const INTIAL_VALUE = {"username": "","usernameError":"","firstName" : "","firstNameError":"", "lastName":"",
                        "lastNameError":"","email":"","emailError":"","password": "","passwordError":""};
    const [formData, setFormData] = useState(INTIAL_VALUE);
    const history = useHistory();
    const [formErrors, setFormErrors] = useState(null);

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData(data => ({...data, [name] : value}));
    }

    const validate = ()=>{
        let usernameError = "";
        let firstNameError = "";
        let lastNameError = "";
        let emailError = "";
        let passwordError = "";

        if(!formData.firstName){
            firstNameError = "Please enter your first name";
        }
        if(!formData.lastName){
            lastNameError = "Please enter your last name";
        }
        if(!formData.username){
            usernameError = "Username can't be blank";
        }
        if(!formData.email){
            emailError = "Please enter your email";
        }
        if(!formData.password){
            passwordError = "Password can't be blank";
        }

        if(usernameError || passwordError || firstNameError || lastNameError || emailError){
            setFormData(data => ({...data, usernameError,passwordError, 
                    firstNameError, lastNameError, emailError}));
            return false;
        }
        return true;
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const isValid = validate();
        if (isValid){
            const username = formData.username;
            const first_name = formData.firstName;
            const last_name = formData.lastName;
            const email = formData.email;
            const password = formData.password;
            const result = await signUp({username, first_name, last_name, email, password});
            if(result.success){
                setHomeModalOpen(true);
                setFormData(INTIAL_VALUE);
                setFormErrors(null);
                history.push("/");
            }else{
                setFormData(INTIAL_VALUE);
                setFormErrors(result.error);
            }
        }else{
            setFormErrors(null);
            }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} style={{"marginTop" : "50px"}}>
                <div className="form-group">
                <label htmlFor="username">Username</label>
                <input className="form-control" type="text" id="username" placeholder="Enter username" 
                value={formData.username}
                name="username"
                onChange={handleChange}/>
                </div>
                
                {formData.usernameError && <div style={{"fontSize":"12","backgroundColor":"red", "color":"white", 
                "display":"inline-block", "padding": "0 10px"}}>
                    {formData.usernameError}</div>}
                

                <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input className="form-control" type="text" id="firstName" placeholder="Enter First Name" 
                value={formData.firstName}
                name="firstName"
                onChange={handleChange}/>
                </div>
                
                {formData.firstNameError && <div style={{"fontSize":"12","backgroundColor":"red", "color":"white", 
                "display":"inline-block", "padding": "0 10px"}}>
                    {formData.firstNameError}</div>}
                

                <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input className="form-control" type="text" id="LastName" placeholder="Enter Last Name" 
                value={formData.lastName}
                name="lastName"
                onChange={handleChange}/>
                </div>
                
                {formData.lastNameError && <div style={{"fontSize":"12","backgroundColor":"red", "color":"white", 
                "display":"inline-block", "padding": "0 10px"}}>
                    {formData.lastNameError}</div>}
                

                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className="form-control" type="email" id="email" placeholder="Enter Email Address" 
                value={formData.email}
                name="email"
                onChange={handleChange}/>
                </div>
                
                {formData.emailError && <div style={{"fontSize":"12","backgroundColor":"red", "color":"white", 
                "display":"inline-block", "padding": "0 10px"}}>
                    {formData.emailError}</div>}
                

                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input className="form-control" type="password" id="password" placeholder="Enter password" 
                value={formData.password}
                name="password"
                onChange={handleChange}/>
                </div>
                
                {formData.passwordError && <div 
                style={{"fontSize":"12","backgroundColor":"red", "color":"white", 
                "display":"inline-block", "padding": "0 10px"}}>
                    {formData.passwordError}</div>}
                

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

export default RegisterForm;