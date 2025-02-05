import React from "react";
import GoogleMapReact from 'google-map-react';
import { useRef } from "react";

const AnyReactComponent = ({ text }) => <div style={{fontSize:'20px'}}>{text}</div>;

export  function Map({ setMapInstance }){
    const mapRef = useRef(null);
  const defaultProps = {
    center: {
      lat: 31.961504549337278,
      lng:34.801482826108334
    },
   
    zoom: 11    
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '80vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAt74vM_VpO-o1ET1_g69fmY5AE6HCCQFY" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
          setMapInstance(map); 
        }}
      >
        <AnyReactComponent
          lat={31.961504549337278}
          lng={34.801482826108334}
          text="📍"
          
        />
          <AnyReactComponent
          lat={32.438925334370154}
          lng={34.911057658059754}
          text="📍"
          
        />
       
           <AnyReactComponent
          lat={29.549158099058346}
          lng={34.93854578442489}
          text="📍"
          
        />
        
      </GoogleMapReact>
    </div>
  );
}