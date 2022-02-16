import React, { useContext, useState } from 'react';
import UserContext from '../useContext/UserContext';
import {Redirect, useHistory} from "react-router-dom"
import "./EditProfile.css";
import EstateApi from '../API/api';

function EditProfile({setToken}) {
    const {currentUser, updateUserProfile, setCurrentUser} = useContext(UserContext);
    const history = useHistory();
    const INITIAL_VALUE = currentUser && {username : currentUser.username, email:currentUser.email,
            first_name:currentUser.first_name, last_name:currentUser.last_name};
    
    const [formData, setFormData] = useState(INITIAL_VALUE);
    const [passwordData, setPasswordData] = useState({"password":currentUser && currentUser.password});

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData(data => ({...data, [name] : value}))
        console.log(formData);
    }

    const handleChangePass = (e)=>{
      const {name, value} = e.target;
      setPasswordData(data => ({...data, [name]: value}));
    }

    const handleClick = ()=>{
      setCurrentUser(null);
      setToken(null);
      history.push("/");

    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await updateUserProfile(currentUser.username, {...formData, ...passwordData});
        const currUser = await EstateApi.getCurrentUser(currentUser.username);
        setCurrentUser(currUser.user);
        history.push(`/profile/${currentUser.username}`);
        console.log('submitted');
    }
    const profileForm = ()=>{
        return (
            <div className='Edit-Profile'>
  <div className='Edit-Form'>

      <h3>Edit Profile</h3>

      <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="username">Username</label>
    <input type="text" className="form-control" id="username" placeholder={formData.username} aria-describedby="usernameHelp" 
    readOnly />
    <small id="usernameHelp" className="form-text text-muted">Can't change your username</small>
  </div>

  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" 
        placeholder={formData.email} name="email" value={formData.email}
        onChange={handleChange} />
  </div>

  <div className="form-group">
    <label htmlFor="firstName">First Name</label>
    <input type="text" className="form-control" id="firstName" 
        placeholder={formData.first_name} name="first_name" value={formData.first_name}
        onChange={handleChange} />
  </div>

  <div className="form-group">
    <label htmlFor="lastName">Last Name</label>
    <input type="text" className="form-control" id="lastName" 
        placeholder={formData.last_name} name="last_name" value={formData.last_name}
        onChange={handleChange} />
  </div>

  <div className="form-group">
    <label htmlFor="password">Enter New Password</label>
    <input type="password" className="form-control" id="password" 
        placeholder="Enter New Password" name="password" value={passwordData.password}
        onChange={handleChangePass}/>
  </div>

  <button type="submit" className="btn btn-primary btn-lg">Save</button>
    </form>
  </div>
    <hr />
    <div className='account'>
        <div className='row d-flex justify-content-between'>
            <div className='col-lg-8'>
                <h3>Manage Account</h3>
                <small className="text-muted">
                    This will shut down your account. You won't be able to sign in again until you create new account.
                    </small>
                
            </div>
            <div className='col-lg-4'>
                <button onClick={handleClick} className='btn btn-danger btn-lg'>Delete Account</button>
            </div>
        </div>
    </div>
  </div>
        )
    }
   
  return (
      <>
    {currentUser ? profileForm() : <Redirect to="/" />}
    
    </>
  )
}

export default EditProfile;
