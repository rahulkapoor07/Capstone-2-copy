import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4001";

class EstateApi {
  // the token for interactive with the API will be stored here.
  static token;

  /** Get the current user. */


  static async getCurrentUser(username) {
    try{
      const headers = { authorization: this.token };
      const response = await axios.get(`/users/${username}`, {headers});
      return response.data;
    }catch(e){
      console.log({"customError": e});
    }
    
  }

  /** Get token for login from username, password. */

  static async login(data) {
    const res = await axios.post(`/auth/login`,data);
    return res.data.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await axios.post(`/auth/register`, data);
    return res.data.token;
  }
  /** Save user profile page. */

  static async updateProfile(username, data) {
    const headers = { authorization: this.token };
    let res = await axios.patch(`/users/${username}`, data, {headers});
    return res.data;
  }

  static async deleteProfile(username){
    let res = await axios.delete(`/users/${username}`);
    return res.data;
  }

  static async handleInput(data){
    const response = await axios.post(`/homes/input-data`, data);
    return response.data;
  }

  static async buyHomes(data){
    const headers = { Authorization: this.token };
    const response = await axios.post(`/homes/buy`, data,{headers});
    return response.data;
  }

  static async soldHomes(data) {
    const headers = { Authorization: this.token };
    const response = await axios.post(`/homes/sold`, data,{headers});
    return response.data;
  }
  static async rentHomes(data) {
    const headers = { Authorization: this.token };
    const response = await axios.post(`/homes/rent`, data,{headers});
    return response.data;
  }

  static async agents(data){
    const response = await axios.post(`/agents/agents-search`, data);
    return response.data;
  }

  static async addHome(data){
    const response = await axios.post(`/homes/add-home`, data);
    return response.data;
  }

  static async addHomeUser(data){
    const response = await axios.post(`/homes/add-home-user`, data);
    return response.data;
  }

  static async userSavedHomes(data){
    const response = await axios.post(`/users/saved/homes`, data);
    return response.data;
  }

  static async savedHomesDetails(data){
    const response = await axios.post(`/homes/savedHomesDetails`, data);
    return response.data;
  }

  static async savedHomeDetail(data){
    const response = await axios.post(`/homes/savedHomeDetail`, data);
    return response.data;
  }

  static async removeHomeUser(data){
    const response = await axios.delete(`/homes/remove-home-from-user-db`, {data});
  }

  // static async addToFav(data){
  //   const response = await axios.post(`${BASE_URL}/homes/add-to-fav`, data);
  //   return response.data;
  // }

  // static async removeHomeFav(data){
  //   const response = await axios.patch(`${BASE_URL}/homes/add-to-fav`, data);
  //   return response.data;
  // }

  static async mortgageCalculator(data){
    const response = await axios.post(`/homes/mortgage-calculator`, data);
    return response.data;
  }
}


export default EstateApi;