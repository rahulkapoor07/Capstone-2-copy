const axios = require("axios");

const findLocation = async (input)=>{
  const options = {
    method: 'GET',
    url: 'https://us-real-estate.p.rapidapi.com/location/suggest',
    params: {input},
    headers: {
      'x-rapidapi-host': 'us-real-estate.p.rapidapi.com',
      'x-rapidapi-key': '1485ec3af1msh7c54fae5d48e5cap1ef8c9jsn9f5c4864e654'
    }
  };
  const response = await axios(options);
  const data = [];
  const res = response.data.data;
  for (let home of res){
    data.push({"state_code" : home.state_code, "city" : home.city});
  }
  return data;
}

const buy = async (state_code, city) => {
  try {
    const options = {
      method: "GET",
      url: "https://us-real-estate.p.rapidapi.com/for-sale",
      // params: {offset: '0', limit: '42', state_code: 'MI', city: 'Detroit', sort: 'newest'},
      params: { offset: "0", state_code, city, limit: "200", sort: "newest" },
      headers: {
        "x-rapidapi-host": "us-real-estate.p.rapidapi.com",
        "x-rapidapi-key": "1485ec3af1msh7c54fae5d48e5cap1ef8c9jsn9f5c4864e654",
      },
    };
    const response = await axios(options);
    const homes = [];
    for (let home of response.data.data.results) {
        homes.push({
          status: home.status,
          property_id: home.property_id,
          primary_photo: home.primary_photo,
          address: `${home.location.address.line}, ${home.location.address.city}, ${home.location.address.state_code} - ${home.location.address.postal_code}`,
          photos: home.photos,
          home_details: home.tags,
          home_description: home.description,
          home_list_price: home.list_price,
          street_view: home.location.street_view_url,
        });
    }
    return homes;
  } catch (e) {
    console.error(e);
  }
};

const sold = async (state_code, city)=>{
  try{
    const options = {
      method: 'GET',
      url: 'https://us-real-estate.p.rapidapi.com/sold-homes',
      params: {state_code, city, sort:"sold_date", limit: "200", offset : "0"},
      headers: {
        'x-rapidapi-host': 'us-real-estate.p.rapidapi.com',
        'x-rapidapi-key': '1485ec3af1msh7c54fae5d48e5cap1ef8c9jsn9f5c4864e654'
      }
    };
    const sold_homes= [];
    const response = await axios(options);
    const res = response.data.data.results;
    for (let home of res){
        sold_homes.push({"property_id":home.property_id, "primary_photo": home.primary_photo, "street_view":home.location.street_view_url,
      "photos": home.photos, "status":home.status, "description": home.description,
      "address":`${home.location.address.line}, ${home.location.address.city}, ${home.location.address.state_code} - ${home.location.address.postal_code}`,
    "status": home.status, "list_price" : home.list_price, "utilities" : home.tags});
    }

    return sold_homes;
  }
  catch(err){
    console.error(err);
  }
}

const rent = async (state_code, city)=>{
    try{
      const options = {
        method: 'GET',
        url: 'https://us-real-estate.p.rapidapi.com/for-rent',
        params: {city,state_code},
        headers: {
          'x-rapidapi-host': 'us-real-estate.p.rapidapi.com',
          'x-rapidapi-key': '1485ec3af1msh7c54fae5d48e5cap1ef8c9jsn9f5c4864e654'
        } 
      };
      
      const response = await axios(options);
      // return response.data;
      const homes = response.data.data.results;
      const rent_homes = [];
      for(let home of homes){
        rent_homes.push({property_id : home.property_id, status : home.status,primary_photo : home.primary_photo,
        photos:home.photos, list_price:home.list_price,description : home.description,
      address : `${home.location.address.line}, ${home.location.address.city}, ${home.location.address.state_code}-${home.location.address.postal_code}, ${home.location.address.country}`});
      }
      return rent_homes;
    }catch(e){
      console.error(e);
    }
  
}


const agents = async (state_code, city)=>{
  try{
    const noImgURL = "https://st4.depositphotos.com/14953852/22772/v/1600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg";
    const options = {
      method: 'GET',
      url: 'https://us-real-estate.p.rapidapi.com/agents/agents-search',
      params: {state_code, city},
      headers: {
        'x-rapidapi-host': 'us-real-estate.p.rapidapi.com',
        'x-rapidapi-key': '1485ec3af1msh7c54fae5d48e5cap1ef8c9jsn9f5c4864e654'
      }
    };
    const response = await axios(options);
    // return response.data;
    const agents = response.data.data.agents;
    const agentsDetails = [];
    for(let agent of agents){
      agentsDetails.push({"agent_name":agent.person_name, "id":agent.id,
      "agent_photo": agent.has_photo ? agent.photo.href : noImgURL,"agent_phones" : agent.phones,"agent_email":
      agent.email,"agent_specifications":agent.specifications,"agent_type":agent.agent_type, 
      "agent_web_url" : agent.href, "agent_description":agent.description,
      "agent_area_served":agent.served_areas,"office_name":agent.office.name,
      "office_website":agent.office.website,"office_address" : 
      (agent.address.line ? `${agent.address.line},` : "") + (agent.address.city ? ` ${agent.address.city},` : "") + 
      (agent.address.state_code ? ` ${agent.address.state_code}-` : "") + (agent.address.postal_code ? `${agent.address.postal_code},`: "") + 
      (agent.address.country ? ` ${agent.address.country}.` : "")});
    }
    return agentsDetails;
  }catch(e){
    console.error(e);
  }
  
}

const averageRate = async (postal_code)=>{
  try{
    const options = {
      method: 'GET',
      url: 'https://us-real-estate.p.rapidapi.com/finance/average-rate',
      params: {postal_code},
      headers: {
        'x-rapidapi-host': 'us-real-estate.p.rapidapi.com',
        'x-rapidapi-key': '1485ec3af1msh7c54fae5d48e5cap1ef8c9jsn9f5c4864e654'
      }
    };
    
    const response = await axios(options);
    const average_rate = response.data.data.mortgage_data.average_rate;
    return average_rate;
  }catch(err){
    console.error(err);
  }
}

const mortgageCalc = async (percent_tax_rate, year_term,percent_rate,down_payment,monthly_home_insurance,
                            price)=>{
  try{
    const options = {
      method: 'GET',
      url: 'https://us-real-estate.p.rapidapi.com/finance/mortgage-calculate',
      params: {
        show_amortization: 'false',
        hoa_fees: '0',
        percent_tax_rate,
        year_term,
        percent_rate,
        down_payment,
        monthly_home_insurance,
        price
      },
      headers: {
        'x-rapidapi-host': 'us-real-estate.p.rapidapi.com',
        'x-rapidapi-key': '1485ec3af1msh7c54fae5d48e5cap1ef8c9jsn9f5c4864e654'
      }
    };

    const response = await axios(options);
    return response.data.data;
  }catch(err){
    console.error(err);
  }
}

const savedHomeDetail = async (property_id)=>{
  try{
    const options = {
      method: 'GET',
      url: 'https://us-real-estate.p.rapidapi.com/property-detail',
      params: {property_id},
      headers: {
        'x-rapidapi-host': 'us-real-estate.p.rapidapi.com',
        'x-rapidapi-key': '1485ec3af1msh7c54fae5d48e5cap1ef8c9jsn9f5c4864e654'
      }
    }
    const response = await axios(options);
    const property_detail = {};
    const property_data = response.data.data;
    property_detail.photos = property_data.photos ? property_data.photos : null;
    property_detail.property_id = property_data.property_id;
    property_detail.status = property_data.status;
    property_detail.list_price = property_data.list_price;
    property_detail.address = 
    `${property_data.location.address.line}, ${property_data.location.address.city} ${property_data.location.address.state_code}-${property_data.location.address.postal_code}, ${property_data.location.address.country}`;
    // property_detail.home_tour =property_data.home_tours.virtual_tours ? property_data.home_tours.virtual_tours[0].href : null;
    // property_detail.schools = property_data.schools.schools && property_data.schools.schools;
    // property_detail.no_of_schools = property_data.schools.total;
    property_detail.description = property_data.description;
    property_detail.agents_name = property_data.consumer_advertisers.name;
    property_detail.agents_phone = property_data.consumer_advertisers.phone;
    property_detail.property_history = property_data.property_history;
    return property_detail;
  }catch(e){
    console.error('savedHomesError', e);
  }

}




module.exports = {findLocation, buy, sold, rent,agents, averageRate, mortgageCalc, savedHomeDetail}