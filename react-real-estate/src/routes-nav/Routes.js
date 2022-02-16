import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import HomePage from "../homePage/HomePage";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import BuyList from "../buy/BuyList";
import SoldList from "../Sold/SoldList";
import UserProfile from "../userProfile/UserProfile";
import RentList from "../Rent/RentList";
import AgentsList from "../agents/AgentsList";
import MortgageCalc from "../mortgage/MortgageCalc";
import HomeDetail from "../userProfile/HomeDetail";
import EditProfile from "../editProfile/EditProfile";
import AgentDetails from "../agents/AgentDetails";


const Routes = ({login, signUp, setHomeModalOpen, setIsMortgageOpen,mortgageCalcFunc,setToken,
    setMortgageData})=>{
    return (
        <Switch>
        <Route exact path="/">
            <HomePage />
        </Route>

        <Route exact path="/login">
            <LoginForm login={login} setHomeModalOpen = {setHomeModalOpen}/>
        </Route>

        <Route exact path="/register">
            <RegisterForm signUp={signUp} setHomeModalOpen={setHomeModalOpen}/>
        </Route>

        <Route exact path="/buy">
            <BuyList/>
        </Route>

        <Route exact path="/sold">
            <SoldList/>
        </Route>

        <Route exact path="/agents">
            <AgentsList/>
        </Route>

        <Route exact path="/mortgage-calculator">
            <MortgageCalc setIsMortgageOpen={setIsMortgageOpen} mortgageCalcFunc={mortgageCalcFunc}
            setMortgageData={setMortgageData}/>
        </Route>

        <Route exact path="/rent">
            <RentList/>
        </Route>

        <Route exact path="/profile/:username">
            <UserProfile />
        </Route>

        <Route exact path="/profile/:username/:property_id">
            <HomeDetail />
        </Route>

        <Route exact path="/edit-profile">
            <EditProfile setToken={setToken}/>
        </Route>

        <Route exact path="/agents/:agent_id">
            <AgentDetails />
        </Route>

        <Redirect to="/" />
        </Switch>
    )
}

export default Routes;