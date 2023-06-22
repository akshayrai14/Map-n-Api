

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hpdmFuc2h5YXNoYXN2aSIsImEiOiJjbGU3ZWQ3N3AwNGY3M29xcGVxazh5aXhuIn0._YiXv1tUc7Ndp-z8yzvpiQ';
navigator.geolocation.getCurrentPosition(successLocation , errorLocation , {
    enableHighAccuracy : true
} )
function successLocation(position){
    console.log(position);
    setupmap([position.coords.longitude,position.coords.latitude]);
    //centre is an array with long first then lat
}
function errorLocation(err){
    setupmap([-2.24,53,48]);
}
function setupmap(centre){
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        //we are passing this centre here
        center : centre,
        zoom : 15
    });

    const navigationControl = new mapboxgl.NavigationControl();
    map.addControl(navigationControl);
    
    const geolocateControl = new mapboxgl.GeolocateControl();
    map.addControl(geolocateControl);
    
    const fullscreenControl = new mapboxgl.FullscreenControl();
    map.addControl(fullscreenControl);
    
    // const attributionControl = new mapboxgl.AttributionControl();
    //map.addControl(attributionControl);
    
    const scaleControl = new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: 'metric' // or 'imperial'
      });
    map.addControl(scaleControl);


    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        profile: 'mapbox/driving'
    });
    map.addControl(directions, 'top-left');

    // map.addControl(
    //     new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl
    //     }),'top-left'
    //     );
    //search bar
}
