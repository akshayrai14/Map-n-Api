import React, { useContext, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import AppContext from './AppContext';

function Map() {
  const { coordinates } = useContext(AppContext);
  const mapContainerRef = useRef(null);
  
  useEffect(() => {
    mapboxgl.accessToken = 'WHATEVER_ACCESS_TOKEN_YOU_GET_FROM_MAPBOX_IS_TO_BE_COPIED_HERE';
    
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: coordinates,
      zoom: 2,
    });
    
    const navigationControl = new mapboxgl.NavigationControl();
    map.addControl(navigationControl);
    
    const geolocateControl = new mapboxgl.GeolocateControl();
    map.addControl(geolocateControl);
    
    const fullscreenControl = new mapboxgl.FullscreenControl();
    map.addControl(fullscreenControl);
    
    const attributionControl = new mapboxgl.AttributionControl();
    map.addControl(attributionControl);
    
    const scaleControl = new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: 'metric', // or 'imperial'
    });
    map.addControl(scaleControl);
    
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      profile: 'mapbox/driving',
    });
    map.addControl(directions, 'top-left');
    
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
    map.addControl(geocoder, 'top-left');
    
    return () => {
      map.remove();
    };
  }, [coordinates]);
  
  return <div className='map' id='map' ref={mapContainerRef} />
  ;
}

export default Map;
