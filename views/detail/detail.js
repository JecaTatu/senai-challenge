function initMap() {
    var myLatLng = {
        lat: parseFloat(document.querySelector('#loc').getAttribute('lat')),
        lng: parseFloat(document.querySelector('#loc').getAttribute('lng'))
    };

    console.log(myLatLng)
    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 4
    });

    var marker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        title: 'Hello World!'
    });
}