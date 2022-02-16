import {  useState, useEffect } from "react";
import {BrowserRouter} from "react-router-dom";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";
import JWT from "jsonwebtoken";
import EstateApi from "./API/api";
import UserContext from "./useContext/UserContext";
import SelectModal from "./homePage/SelectModal";
import BuyDetail from "./buy/BuyDetail";
import HomeModal from "./homePage/HomeModal";
import SoldDetail from "./Sold/SoldDetail";
import RentDetail from "./Rent/RentDetail";
import BuyCarousel from "./buy/BuyCarousel";
import SoldCarousel from "./Sold/SoldCarousel";
import MortgageModal from "./mortgage/MortgageModal";
import RentCarousel from "./Rent/RentCarousel";

const TOKEN = "real-estate-token";
const App = ()=>{
  const [currentUser, setCurrentUser] = useState(null);
  const [userHomeData, setUserHomeData] = useState([]);

  const [token,setToken] = useLocalStorage(TOKEN);

  const [modalData, setModalData] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [homeModalOpen, setHomeModalOpen] = useState(false);
  const [detailOpen, setdetailOpen] = useState(false);
  const [soldDetailOpen, setSoldDetailOpen] = useState(false);
  const [rentDetailOpen, setRentDetailOpen] = useState(false);
  const [isBuyCarouselOpen, setIsBuyCarouselOpen] = useState(false);
  const [isSoldCarouselOpen, setIsSoldCarouselOpen] = useState(false);
  const [isMortgageOpen, setIsMortgageOpen] = useState(false);
  const [isRentCarouselOpen, setIsRentCarouselOpen] = useState(false);

  const [buyHomeData, setBuyHomeData] = useState(null);
  const [singleHomeData, setSingleHomeData] = useState(null);

  const [soldHomeData, setSoldHomeData] = useState(null);
  const [singleSoldHomeData, setSingleSoldHomeData] = useState(null);

  const [rentHomeData, setRentHomeData] = useState(null);
  const [singleRentHomeData, setSingleRentHomeData] = useState(null);


  const [cityStateData, setCityStateData] = useState(null);

  const [agentsData, setAgentsData] = useState(null);
  const [singleAgentData, setSingleAgentData] = useState(null);

  const [savedHomes, setSavedHomes] = useState(null);
  const [savedHomesDetails, setSavedHomesDetails] = useState(null);
  const [savedHomeProperties, setSavedHomeProperties] = useState([]);

  const [mortgageData, setMortgageData] = useState(null); 

  const [message, setMessage] = useState(false);

  

  const login = async (data)=>{
    try{
      const token = await EstateApi.login(data);
      setToken(token);
      return { success: true };
    }catch(error){
      console.error({"customErrorAtAppLogin" : error.response.data.message});
      return {success : false, error: error.response.data.message}
    }
  }

  const signUp = async (data)=>{
  try{
    const token = await EstateApi.signup(data);
    setToken(token);
    return { success: true };
    }catch(error){
    console.error({"customErrorAtAppSignUp" : error.response.data.message});
    return {success : false, error : error.response.data.message}
   }
  }

  useEffect(()=>{
    const getUser = async ()=>{
      if(token){
        try {
          const {user} = JWT.decode(token);
          const username = user.username;
          
          EstateApi.token = token;
          let currUser = await EstateApi.getCurrentUser(username);
          setCurrentUser(currUser.user);
          setSavedHomes(data => currentUser ? currentUser.homes : null);
        }catch(e){
          console.error({"errorUseEffect": e});
          setCurrentUser(null);
        }
      }
    }
    getUser();
  },[token]);

  const updateUserProfile = async (username, data)=>{
    try{
      const response = await EstateApi.updateProfile(username, data);
      console.log(response.user);
    }catch(e){
      console.error('updateUserProfile', e.response.message);
    }
  }


  const logOut = ()=>{
    setCurrentUser(null);
    setToken(null);
  }

  const inputHandle = async (data)=>{
    const res = await EstateApi.handleInput(data);
    setModalData(res);
  }

  const buyHomes = async (data)=>{
    try{
      const result = await EstateApi.buyHomes(data);
      setBuyHomeData(result);
    }catch(e){
      console.error({'buyHomes error':e});
    }
  }

  const soldHomes = async (data)=>{
    try{
      const result = await EstateApi.soldHomes(data);
      setSoldHomeData(result);
    }catch(e){
      console.error({'buyHomes error':e});
    }
  }


  
  // const dataForFilter = (data)=>{setcityStateData(data)}

    
  const rentHomes = async (data)=>{
    try{
      const results = await EstateApi.rentHomes(data);
      setRentHomeData(results); 
    }catch(e){
      console.error({'rentHomes Error': e.response.data.message});
    }
  }
  
  const agentsDataFunc = async (data)=>{
    try{
      const results = await EstateApi.agents(data);
      setAgentsData(results);
    }catch(e){
      console.error({message : e.response.data.message});
    }
    
  }

 

  const singleHome = (data)=>{setSingleHomeData(data)}
  const singleSoldHome = (data)=>{setSingleSoldHomeData(data)}
  const singleRentHome = (data) => {setSingleRentHomeData(data)}
  // const singleAgentFunc = (data) => {setSingleAgentData(data)}

  const addHomeInDB = async (data) =>{
    try{
      const result = await EstateApi.addHome(data);
      console.log(result);
    }catch(e){
      console.error({'add-home-error':e.response.data.message});
    }
  }

  const addHomeInUserDB = async (data) =>{
    try{
      const result = await EstateApi.addHomeUser(data);
      console.log(result);
    }catch(e){
      console.error({'addHomeInUserDB error': e.response.data.message});
    }
  }

  const userSavedHomesFunc = async (data)=>{
    try{
      const response = await EstateApi.userSavedHomes(data);
      // console.log(response);
      setSavedHomes(response);
    }catch(e){
      console.error({'savedhomes': e.response.data.message});
    }
  }

  // const savedHomesWithDetails = async (data) =>{
  //   try{
  //     const response = await EstateApi.userSavedHomesWithDetails(data);
  //     console.log(response);
  //     setSavedHomesDetails(response);
  //   }catch(e){
  //     console.error('savedDetails',e);
  //   }
  // }

  const savedHomeDetailFunc = async(data) =>{
    try{
        const results = await EstateApi.savedHomeDetail(data);
        return results;
    } catch(e){
      console.error({'savedHomeDetail Error':e});
    }
    
  }

  const savedHomesDetailsFunc = async (data)=>{
    try{
      const results = await EstateApi.savedHomesDetails(data);
      console.log(results);
      setSavedHomesDetails(results);
    }catch(e){
      console.error({"savedHomesDetailsFunc" : e});
    }
    
  }

  // const savedHomesWithDetails = async ()=>{
  //   try{
  //     savedHomes.map(home => savedHomeDetailFunc(home.home_property_id));
  //   }catch(e){
  //     console.error('savedHomesWithDetails', e);
  //   }
    
  // }

  const removeHomeFromUserDB = async (data) => {
    try{
      const result = await EstateApi.removeHomeUser(data);
      console.log(result);
    }catch(e){
      console.error({'removeHomeFromUserDB Error' : e.response.data.message });
    }
  }

  const mortgageCalcFunc = async(data)=>{
    try{
      const results = await EstateApi.mortgageCalculator(data);
      setMortgageData(results)
    }catch(e){
      console.error('mortgageCalcFunc', e);
    }
    
  }
  return (
    <div className="App">
      
      <BrowserRouter>
      <UserContext.Provider 
      value={{currentUser,setCurrentUser, inputHandle, setIsModalOpen, soldHomeData, soldDetailOpen, setSoldDetailOpen,
      buyHomes, buyHomeData, detailOpen, setdetailOpen, singleHome, setModalData, setHomeModalOpen,soldHomes,
      singleSoldHome,addHomeInDB, addHomeInUserDB, removeHomeFromUserDB, userHomeData, setUserHomeData,
      rentHomeData,rentHomes, agentsData, isBuyCarouselOpen, setIsBuyCarouselOpen,
      isSoldCarouselOpen, setIsSoldCarouselOpen,setCityStateData,cityStateData,setSavedHomes, savedHomes,
       savedHomeProperties,setSavedHomeProperties, userSavedHomesFunc,savedHomeDetailFunc,
       savedHomesDetailsFunc,savedHomesDetails,mortgageCalcFunc,setRentDetailOpen, rentDetailOpen,singleRentHome,
       updateUserProfile,setSingleAgentData, singleAgentData,agentsDataFunc, isRentCarouselOpen,
       setIsRentCarouselOpen,message, setMessage,setRentHomeData }}>
      
      <HomeModal homeModalOpen={homeModalOpen} />
      <SelectModal 
        modalData={modalData} 
        isModalOpen={isModalOpen} 
        buyHomes={buyHomes} 
        soldHomes={soldHomes}
        rentHomes={rentHomes}
        setBuyHomeData={setBuyHomeData}
        setSoldHomeData={setSoldHomeData}
        setRentHomeData={setRentHomeData}
        agentsDataFunc = {agentsDataFunc}
        />

      <BuyDetail singleHomeData = {singleHomeData}/>
      <BuyCarousel singleHomeData = {singleHomeData}/>

      <SoldDetail singleSoldHomeData={singleSoldHomeData}/>
      <SoldCarousel singleSoldHomeData={singleSoldHomeData}/>
      
      <RentDetail singleRentHomeData={singleRentHomeData}/>
      <RentCarousel singleRentHomeData={singleRentHomeData}/>

      <MortgageModal isMortgageOpen={isMortgageOpen} setIsMortgageOpen={setIsMortgageOpen}
         mortgageData={mortgageData}/>
      
      <Navigation logOut = {logOut}/>
      
      <Routes login = {login} setHomeModalOpen={setHomeModalOpen} signUp = {signUp}
        setIsMortgageOpen={setIsMortgageOpen} mortgageCalcFunc={mortgageCalcFunc} setToken={setToken}
        setMortgageData={setMortgageData}/>

      
      </UserContext.Provider>
      </BrowserRouter>
    </div>
    
  )
}

export default App;