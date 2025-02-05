import { Map } from "../cmps/Map.jsx";
import * as React from 'react';
import { useRef } from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
export function About(){
    
    const [map, setMap] = useState(null);

    function panToLocation(location){
        map.setCenter(location)
    }
   return (
    <>
    <Map setMapInstance={setMap}/>
    <div className="about-btn-container">
    <Button onClick={() => panToLocation( {lat: 31.961504549337278,lng:34.801482826108334}) } variant="contained">Rishon</Button>
    <Button onClick={() => panToLocation({lat: 32.438925334370154,lng:34.911057658059754})} variant="contained">Hadera</Button>
    <Button onClick={() => panToLocation({lat: 29.5491,lng:34.9385})} variant="contained">Eilat</Button>
    </div>
    
    </>
   )
   
}