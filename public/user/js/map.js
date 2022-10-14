$(document).ready(function(){

    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng(40.852480, -93.260018),
        zoom: 15,
        styles: [
									  {
									    "elementType": "geometry",
									    "stylers": [
									      {
									        "color": "#333333"
									      }
									    ]
									  },
									  {
									    "elementType": "labels.icon",
									    "stylers": [
									      {
									        "visibility": "off"
									      }
									    ]
									  },
									  {
									    "elementType": "labels.text.fill",
									    "stylers": [
									      {
									        "color": "#616161"
									      }
									    ]
									  },
									  {
									    "elementType": "labels.text.stroke",
									    "stylers": [
									      {
									        "color": "#575757"
									      }
									    ]
									  },
									  {
									    "featureType": "administrative.land_parcel",
									    "elementType": "labels.text.fill",
									    "stylers": [
									      {
									        "color": "#bdbdbd"
									      }
									    ]
									  },
									  {
									    "featureType": "poi",
									    "elementType": "geometry",
									    "stylers": [
									      {
									        "color": "#eeeeee"
									      }
									    ]
									  },
									  {
									    "featureType": "poi",
									    "elementType": "labels.text.fill",
									    "stylers": [
									      {
									        "color": "#757575"
									      }
									    ]
									  },
									  {
									    "featureType": "poi.park",
									    "elementType": "geometry",
									    "stylers": [
									      {
									        "color": "#575757"
									      }
									    ]
									  },
									  {
									    "featureType": "poi.park",
									    "elementType": "labels.text.fill",
									    "stylers": [
									      {
									        "color": "#575757"
									      }
									    ]
									  },
									  {
									    "featureType": "road",
									    "elementType": "geometry",
									    "stylers": [
									      {
									        "color": "#2b2b2b"
									      }
									    ]
									  },
									  {
									    "featureType": "road.arterial",
									    "elementType": "labels.text.fill",
									    "stylers": [
									      {
									        "color": "#757575"
									      }
									    ]
									  },
									  {
									    "featureType": "road.highway",
									    "elementType": "geometry",
									    "stylers": [
									      {
									        "color": "#dadada"
									      }
									    ]
									  },
									  {
									    "featureType": "road.highway",
									    "elementType": "labels.text.fill",
									    "stylers": [
									      {
									        "color": "#616161"
									      }
									    ]
									  },
									  {
									    "featureType": "road.local",
									    "elementType": "labels.text.fill",
									    "stylers": [
									      {
									        "color": "#9e9e9e"
									      }
									    ]
									  },
									  {
									    "featureType": "transit.line",
									    "elementType": "geometry",
									    "stylers": [
									      {
									        "color": "#e5e5e5"
									      }
									    ]
									  },
									  {
									    "featureType": "transit.station",
									    "elementType": "geometry",
									    "stylers": [
									      {
									        "color": "#eeeeee"
									      }
									    ]
									  },
									  {
									    "featureType": "water",
									    "elementType": "geometry",
									    "stylers": [
									      {
									        "color": "#c9c9c9"
									      }
									    ]
									  },
									  {
									    "featureType": "water",
									    "elementType": "labels.text.fill",
									    "stylers": [
									      {
									        "color": "#9e9e9e"
									      }
									    ]
									  }
									]
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);

});
