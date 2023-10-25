//You can calculate directions (using a variety of methods of transportation) by using the DirectionsService object.
var directionsService = new google.maps.DirectionsService();
//Define a variable with all map points.
var _mapPoints = new Array();
//Define a DirectionsRenderer variable.
var _directionsRenderer = '';
//This will give you the map zoom value.
var zoom_option = 10;
//LegPoints is your route points between two locations.
var LegPoints = new Array();
//Google map object
var map;
var names = new Array();
//InitializeMap() function is used to initialize google map on page load.
function InitializeMap() {
    //DirectionsRenderer() is a used to render the direction
    _directionsRenderer = new google.maps.DirectionsRenderer();
    //Set the your own options for map.
    
    var myOptions = {
        zoom: zoom_option,
        zoomControl: true,
        center: new google.maps.LatLng(32.2585318109, -110.9962980393),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    //Define the map.
    map = new google.maps.Map(document.getElementById("waypoint_map"), myOptions);
    //Set the map for directionsRenderer
    _directionsRenderer.setMap(map);
    //Set different options for DirectionsRenderer mehtods.
    //draggable option will used to drag the route.
    _directionsRenderer.setOptions({
        draggable: false
    });
    //Add the doubel click event to map.
    google.maps.event.addListener(map, "dblclick", function (event) {
        var _currentPoints = event.latLng;
        _mapPoints.push(_currentPoints);
        LegPoints.push('');
        console.log(_mapPoints);
        getRoutePointsAndWaypoints(_mapPoints);
    });
    //Add the directions changed event to map.
    // google.maps.event.addListener(_directionsRenderer, 'directions_changed', function () {
    //     myroute = _directionsRenderer.directions.routes[0];
    //     CreateRoute(myroute);
    //     zoom_option = map.getZoom();
    // });
}
var myroute;
setWayPoints();
setTimeout(() => {getRoutePointsAndWaypoints(_mapPoints);}, 1500);
function setWayPoints() {
    _mapPoints = [
        { name: "leave from", lat: 32.2585318109, lng: -110.9962980393 },
        { name: "Thomas Marshall", lat: 31.8022342085, lng: -111.025335553 },
        { name: "Noreen Mallory", lat: 31.8417107649, lng: -110.9944638566 },
        { name: "Laury Psomas", lat: 31.8457149657, lng: -110.9945346172 },
        { name: "Fredric Roeming", lat: 31.8128898485, lng: -111.0184281917 },
        { name: "Vicki Stone", lat: 31.8516361189, lng: -110.988383916 },
        { name: "Janice Fancher", lat: 31.851095271, lng: -110.988522163 },
        { name: "Joan Allen", lat: 31.8646067315, lng: -110.9955745281 },
        { name: "Michael Gordon", lat: 31.8026149221, lng: -111.0251505207 }
    ]
    LegPoints = _mapPoints;
    // getRoutePointsAndWaypoints(_mapPoints)
}

function CreateRoute(myroute) {
    var index = 0;
    // if (_mapPoints.length > 10) {
    //     index = _mapPoints.length - 10;
    // }
    for (var i = 0; i < myroute.legs.length; i++) {
        saveLegPoints(myroute.legs[i], index);
        index = index + 1;
    }
}

//Saving the all the legs points between two routes
function saveLegPoints(leg, index) {
    var points = new Array();
    for (var i = 0; i < leg.steps.length; i++) {
        for (var j = 0; j < leg.steps[i].lat_lngs.length; j++) {
            points.push(leg.steps[i].lat_lngs[j]);
        }
    }
    LegPoints[index] = points;
}

//This will draw the more then 10 points route on map.
function drawPreviousRoute(Legs) {
    var segPointValue = new Array();
    for (var i = 0; i < Legs; i++) {
        var innerArry = LegPoints[i];
        for (var j = 0; j < innerArry.length; j++) {
            segPointValue.push(innerArry[j]);
        }
        addPreviousMarker(innerArry[0], names[i]);
    }
    var polyOptions = {
        path: segPointValue,
        strokeColor: '#F75C54',
        strokeWeight: 3
    };
    var poly = new google.maps.Polyline(polyOptions);
    poly.setMap(map);
}

//This wil add the marker icon to the route.
function addPreviousMarker(pos, name) {
    console.log(pos, name)
    var marker = new google.maps.Marker({
        position: pos,
        labelOrigin: new google.maps.Point(50, 9),
        icon: ' ',
        // icon: "data:image/png;base64,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",
        label: { color: 'blue', fontWeight: 'bold', fontSize: '12px', position: 'relative', top: '-30px',  text: name }
    });
    marker.setMap(map);
}
//getRoutePointsAndWaypoints() will help you to pass points and waypoints to drawRoute() function
function getRoutePointsAndWaypoints(Points) {
    var temp_waypoints = new Array();
    Points.map((e, i) => {
        var lat = e.lat;
        var lng = e.lng;
        names.push(e.name);
        temp_waypoints.push({
            lat: lat,
            lng: lng
        })
        console.log({
            lat: lat,
            lng: lng
        }, e.name)
        addPreviousMarker({
            lat: lat,
            lng: lng
        }, e.name);
    })
    drawRoutePointsAndWaypoints(temp_waypoints);
    drawPreviousRoute(temp_waypoints.length);
}


function drawRoutePointsAndWaypoints(Points) {
    //Define a variable for waypoints.
    var _waypoints = new Array();

    if (Points.length > 2) //Waypoints will be come.
    {
        for (var j = 1; j < Points.length; j++) {
            var address = Points[j];
            if (address !== "") {
                _waypoints.push({
                    location: address,
                    stopover: true  //stopover is used to show marker on map for waypoints
                });
            }
        }
        //Call a drawRoute() function
        drawRoute(Points[0], Points[Points.length - 1], _waypoints);
    } else if (Points.length > 1) {
        //Call a drawRoute() function only for start and end locations
        drawRoute(Points[_mapPoints.length - 2], Points[Points.length - 1], _waypoints);
    } else {
        //Call a drawRoute() function only for one point as start and end locations.
        drawRoute(Points[_mapPoints.length - 1], Points[Points.length - 1], _waypoints);
    }
}

//drawRoute() will help actual draw the route on map.
function drawRoute(originAddress, destinationAddress, _waypoints) {
    //Define a request variable for route .
    var _request = '';

    //This is for more then two locatins
    if (_waypoints.length > 0) {
        _request = {
            origin: originAddress,
            destination: destinationAddress,
            waypoints: _waypoints, //an array of waypoints
            optimizeWaypoints: true, //set to true if you want google to determine the shortest route or false to use the order specified.
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
    } else {
        //This is for one or two locations. Here noway point is used.
        _request = {
            origin: originAddress,
            destination: destinationAddress,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
    }

    //This will take the request and draw the route and return response and status as output
    directionsService.route(_request, function (_response, _status) {
        if (_status == google.maps.DirectionsStatus.OK) {
            _directionsRenderer.setDirections(_response);
        }
    });
}
