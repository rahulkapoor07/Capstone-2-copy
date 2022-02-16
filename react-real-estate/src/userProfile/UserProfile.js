import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import UserContext from '../useContext/UserContext';
import "./userprofile.css";
import UserProfileHomeList from './UserProfileHomeList';

function UserProfile() {
    const {currentUser, savedHomes,userSavedHomesFunc, savedHomesDetails,
        savedHomesDetailsFunc } = useContext(UserContext);

    useEffect(()=>{
        const data = {"username":currentUser && currentUser.username}
        try{
            userSavedHomesFunc({...data});
            savedHomesDetailsFunc({"username":currentUser && currentUser.username});
        }catch(e){
            console.log(e);
        }
    },[]);

    const profile = ()=>{
        return (
            <>
            <div className='UserProfile'>
            <h3>{`Hello, ${currentUser.first_name} ${currentUser.last_name}`}
            <span style={{color : "grey"}}>{`(${currentUser.username})`}</span></h3>
        <h3>{`Saved Homes (${savedHomes ? savedHomes.length : null})`}</h3>
        <UserProfileHomeList savedHomesDetails={savedHomesDetails}/>
        </div>
        </>
        )
    }
    return (
        <>
        {currentUser ? profile(): <Redirect to="/" />}
        </>
    )
}

export default UserProfile;
