import React, { useContext, useEffect, useState } from 'react'
import Axios from "axios";
import AppContext from './AppContext';
import './Finder.css';
function Finder() {
    //const axios = require('axios');
    
    const { setCoordinates } = useContext(AppContext);
    const fetching = async()=>{
    try {
    const response = await Axios.get('https://randomuser.me/api/?results=1&inc=location');
    const { results } = response.data;
    console.log(results[0].location.coordinates);
    const { latitude, longitude }=results[0].location.coordinates;
    console.log([latitude,longitude]);
    if(longitude < -90 || longitude>90 || latitude < -90 || latitude>90){
        setCoordinates([latitude/2,longitude/2]);
    }
    else setCoordinates([latitude,longitude]);
    } 
    catch (error) {
        console.error(error);
        }
    }
  
    return (
    <div>
      <button className='button' onClick={fetching}>Search</button>
    </div>
    )
}

export default Finder
