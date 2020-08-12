//create the map
function initMap() { 

    let latLng = new google.maps.LatLng(41.3557, -72.0995)

    let map = new google.maps.Map(document.getElementById('map'), {
    //pass in center around Conn College campus
        center: latLng,
        zoom: 15 //zoom is set to street level
    });

    let marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: 'Hello World!'
      })

    console.log(data)
}


