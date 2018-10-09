var map;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
var harga = 1.7;

map = new google.maps.Map(document.getElementById('map'), {
    center: {
        lat: -7.960996,
        lng: 112.618634
    },
    zoom: 16
});
directionsDisplay.setMap(map);

var start = document.getElementById('start');
var searchStart = new google.maps.places.SearchBox(start);
var end = document.getElementById('end');
var searchEnd = new google.maps.places.SearchBox(end);

var detail = document.getElementById('detail');

var pesanStart = document.getElementById('pesan-btn');

function findRoute() {
    var startAddress = start.value;
    var endAddress = end.value;
    var request = {
        origin: startAddress,
        destination: endAddress,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
            // console.log(result);
            // console.log(result.routes[0].legs[0].distance.text);
            // console.log(result.routes[0].legs[0].distance.value);

            document.getElementById('distance').innerHTML = result.routes[0].legs[0].distance.text;
            document.getElementById('duration').innerHTML = result.routes[0].legs[0].duration.text;
            document.getElementById('price').innerHTML = 'Rp' + result.routes[0].legs[0].distance.value *
                harga;

            detail.style.display = 'block';
        } else {
            detail.style.display = 'none';
            alert('Petunjuk arah gagal dimuat, masukkan alamat yang benar!');
        }
    });
}

pesan.addEventListener("click", function (event) {
    if (start.value.trim() != "" && end.value.trim() != "") {
        event.preventDefault();
        findRoute();
    }
});