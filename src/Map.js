import React, { useContext, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import AppContext from './AppContext';

function Map() {
  const { coordinates } = useContext(AppContext);
  const mapContainerRef = useRef(null);
  
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2hpdmFuc2h5YXNoYXN2aSIsImEiOiJjbGU3ZWQ3N3AwNGY3M29xcGVxazh5aXhuIn0._YiXv1tUc7Ndp-z8yzvpiQ';
    
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
