var map, featureList, nearestFeature, hotelSearch = [], attractionsSearch = [], establishmentsSearch = [], eventsSearch = [], mqStreetBasemap = MQ.mapLayer(), mqSatBasemap = MQ.satelliteLayer(), mqHybridBasemap = MQ.hybridLayer();

$(document).on("click", ".feature-row", function(e) {
  sidebarClick(parseInt($(this).attr("id"), 10));
});

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#schedule-btn").click(function() {
  $("#scheduleModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function() {
	map.fitBounds([
    [46.7786733259, -92.1083088853],
	  [46.786163129, -92.0913457505]
	]);
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#conference-extent-btn").click(function() {
	map.fitBounds([
      [46.7817821466, -92.0969683742],
      [46.7805432416, -92.0989721204]
	]);
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  $('#sidebar').toggle();
  map.invalidateSize();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  $("#sidebar").toggle();
  map.invalidateSize();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  $('#sidebar').hide();
  map.invalidateSize();
});

function sidebarClick(id) {
  map.addLayer(hotelsLayer).addLayer(attractionsLayer).addLayer(establishmentsLayer).addLayer(eventsLayer);
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

/* Overlay Layers */
var highlight = L.geoJson(null);

/* Symbology */
var starMarker = L.AwesomeMarkers.icon({
  	icon: 'star',
  	prefix: 'fa',
  	markerColor: 'darkred',
	});

var hotelMarker = L.AwesomeMarkers.icon({
  	icon: 'bed',
  	prefix: 'fa',
  	markerColor: 'cadetblue',
	});

var attractionMarker = L.AwesomeMarkers.icon({
  	icon: 'binoculars',
  	prefix: 'fa',
  	markerColor: 'green',
	});

/* Establishments marker symbolization based on the 'ICON' field */
var establishmentMarker = L.AwesomeMarkers.icon({
    icon: 'cutlery',
    prefix: 'fa',
    markerColor: 'orange'
});

/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});

//DECC Polygon
var deccPoly = L.geoJson(null, {
style: function (feature) {
    return {
      color: "#A50541",
      dashArray: "3",
      weight: 2,
      fillOpacity: 0.1,
      opacity: 1,
      clickable: false
    };
  }
});
$.getJSON("data/duluth/deccLayout.geojson", function (data) {
	deccPoly.addData(data);
});

//DECC Ground Floor
var deccGround = L.geoJson(null, {
style: function (feature) {
    return {
      color: "#A50541",
      dashArray: "2",
      weight: 1,
      fillColor: "#A13336",
      fillOpacity: 0.1,
      opacity: 1,
      clickable: true
    };
  },
  onEachFeature: function (feature, layer) {
	    if (feature.properties) { //Popup
	        var content =
          "<ul class='nav nav-tabs nav nav-justified' id='fullWorkshopContent'>" +
            "<li class='active'><a href='#wedWorkshops' data-toggle='tab'>Wednesday Workshops</a></li>" +
            "<li><a href='#thursSessions' data-toggle='tab'>Thursday Sessions</a></li>" +
            "<li><a href='#friSessions' data-toggle='tab'>Friday Sessions</a></li>" +
          "</ul>" +
          "<div class='tab-content' id='fullWorkshopContent'>" +
            "<div class='tab-pane fade active in' id='wedWorkshops'>" +
              "<div class='modal-body'>" +
                "<table class='table table-striped table-bordered table-condensed'>" +
                  "<tr><th scope='row'>9:00 am - 12:15 pm</th><td>" + feature.properties.workshopAMnumber + ": " + feature.properties.workshopAM + " (" + feature.properties.workshopAMspeakers + ")</td></tr>" +
                  "<tr><th scope='row'>1:15 pm - 4:30 pm</th><td>" + feature.properties.workshopPMnumber + ": " + feature.properties.workshopPM + " (" + feature.properties.workshopPMspeakers + ")</td></tr></table>" +
              "</div>" +
          "</div>" +
             "<div class='tab-pane fade' id='thursSessions'>" +
               "<div class='modal-body'>" +
                 "<table class='table table-striped table-bordered table-condensed'>" +
                 "<tr><th scope='row'>10:30 am - 12:00 pm</th><td>" + feature.properties.thursdaySession1 + "</td></tr>" +
                 "<tr><th scope='row'>1:30 pm - 3:00 pm</th><td>" + feature.properties.thursdaySession2 + "</td></tr>" +
                 "<tr><th scope='row'>3:30 pm - 5:00 pm</th><td>" + feature.properties.thursdaySession3 + "</td></tr></table>" +
               "</div>" +
             "</div>" +
             "<div class='tab-pane fade' id='friSessions'>" +
               "<div class='modal-body'>" +
                 "<table class='table table-striped table-bordered table-condensed'>" +
                 "<tr><th scope='row'>8:30 am - 10:00 am</th><td>" + feature.properties.fridaySession1 + "</td></tr>" +
                 "<tr><th scope='row'>10:30 am - 12:00 pm</th><td>" + feature.properties.fridaySession2 + "</td></tr></table>"
             "</div>" +
           "</div>" +
        "</div>"
	        layer.on({
	          click: function (e) {
	            $("#feature-title").html(feature.properties.NAME);
	            $("#feature-info").html(content);
	            $("#featureModal").modal("show");
	          }
	        });
	    } //End Popup
  }
});
$.getJSON("data/duluth/deccGround.geojson", function (data) {
	deccGround.addData(data);
});

//DECC Ground Floor Labels
var deccGroundLabels = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
			return new L.CircleMarker(latlng, {
			radius: 5,
			fillColor: "none",
			color: "none",
			weight: 1,
			opacity: 1,
			clickable: false
			});
	},
  onEachFeature: function (feature, layer) {
    layer.bindLabel(
        feature.properties.NAME, {
          noHide: true,
          clickable: true
    });
  }
});
$.getJSON("data/duluth/deccGroundPoints.geojson", function (data) {
	deccGroundLabels.addData(data);
});

//DECC Skyway Level
var deccSkyway = L.geoJson(null, {
style: function (feature) {
    return {
        color: "#A50541",
        dashArray: "2",
        weight: 1,
        fillColor: "#A13336",
        fillOpacity: 0.1,
        opacity: 1,
        clickable: true
    };
  },
  onEachFeature: function (feature, layer) {
      //Popup
      if (feature.properties.polyType === "Hours") { //Exhibit Hall/Geolounge
        var content =
          "<ul class='nav nav-tabs nav nav-justified' id='hoursOnlyContent'>" +
            "<li class='active'><a href='#wed' data-toggle='tab'>Wednesday</a></li>" +
            "<li><a href='#thurs' data-toggle='tab'>Thursday</a></li>" +
            "<li><a href='#fri' data-toggle='tab'>Friday</a></li>" +
          "</ul>" +
          "<div class='tab-content' id='hoursOnlyContent'>" +
            "<div class='tab-pane fade active in' id='wed'>" +
              "<div class='modal-body'>" +
                "<table class='table table-striped table-bordered table-condensed'>" +
                "<tr><th scope='row'>Hours</th><td>" + feature.properties.wedHours + "</td></tr></table><br/>" +
              "</div>" +
            "</div>" +
            "<div class='tab-pane fade' id='thurs'>" +
              "<div class='modal-body'>" +
                "<table class='table table-striped table-bordered table-condensed'>" +
                "<tr><th scope='row'>Hours</th><td>" + feature.properties.thursHours + "</td></tr>" +
                "<tr><th scope='row'>Exhibitor Reception</th><td>" + feature.properties.eventHours + "</td></tr></table><br/>" +
              "</div>" +
            "</div>" +
            "<div class='tab-pane fade' id='fri'>" +
              "<div class='modal-body'>" +
                "<table class='table table-striped table-bordered table-condensed'>" +
                "<tr><th scope='row'>Hours</th><td>" + feature.properties.friHours + "</td></tr></table>" +
              "</div>" +
            "</div>" +
          "</div>"
        } else if (feature.properties.polyType === "Esri Lab") { //Esri HOLL
                var content =
                  "<ul class='nav nav-tabs nav nav-justified' id='esriHOLLcontent'>" +
                    "<li class='active'><a href='#wed' data-toggle='tab'>Wednesday</a></li>" +
                    "<li><a href='#thurs' data-toggle='tab'>Thursday</a></li>" +
                    "<li><a href='#fri' data-toggle='tab'>Friday</a></li>" +
                  "</ul>" +
                  "<div class='tab-content' id='esriHOLLcontent'>" +
                    "<div class='tab-pane fade active in' id='wed'>" +
                      "<div class='modal-body'>" +
                        "<table class='table table-striped table-bordered table-condensed'>" +
                        "<tr><th scope='row'>Esri HOLL Hours</th><td>" + feature.properties.wedHours + "</td></tr></table><br/>" +
                      "</div>" +
                    "</div>" +
                    "<div class='tab-pane fade' id='thurs'>" +
                      "<div class='modal-body'>" +
                        "<table class='table table-striped table-bordered table-condensed'>" +
                        "<tr><th scope='row'>Esri HOLL Hours</th><td>" + feature.properties.thursHours + "</td></tr></table><br/>" +
                      "</div>" +
                    "</div>" +
                    "<div class='tab-pane fade' id='fri'>" +
                      "<div class='modal-body'>" +
                        "<table class='table table-striped table-bordered table-condensed'>" +
                        "<tr><th scope='row'>Esri HOLL Hours</th><td>" + feature.properties.friHours + "</td></tr></table>" +
                      "</div>" +
                    "</div>" +
                  "</div>"
                } else if (feature.properties.polyType === "Limited Workshop") { //AM only workshop
          var content =
          "<ul class='nav nav-tabs nav nav-justified' id='limitedWorkshopContent'>" +
            "<li class='active'><a href='#wedWorkshops' data-toggle='tab'>Wednesday Workshops</a></li>" +
            "<li><a href='#thursSessions' data-toggle='tab'>Thursday Sessions</a></li>" +
            "<li><a href='#friSessions' data-toggle='tab'>Friday Sessions</a></li>" +
          "</ul>" +
          "<div class='tab-content' id='limitedWorkshopContent'>" +
            "<div class='tab-pane fade active in' id='wedWorkshops'>" +
              "<div class='modal-body'>" +
                "<table class='table table-striped table-bordered table-condensed'>" +
                  "<tr><th scope='row'>9:00 am - 12:15 pm</th><td>" + feature.properties.workshopAMnumber + ": " + feature.properties.workshopAM + " (" + feature.properties.workshopAMspeakers + ")</td></tr></table>" +
              "</div>" +
          "</div>" +
             "<div class='tab-pane fade' id='thursSessions'>" +
               "<div class='modal-body'>" +
                 "<table class='table table-striped table-bordered table-condensed'>" +
                 "<tr><th scope='row'>10:30 am - 12:00 pm</th><td>" + feature.properties.thursdaySession1 + "</td></tr>" +
                 "<tr><th scope='row'>1:30 pm - 3:00 pm</th><td>" + feature.properties.thursdaySession2 + "</td></tr>" +
                 "<tr><th scope='row'>3:30 pm - 5:00 pm</th><td>" + feature.properties.thursdaySession3 + "</td></tr></table>" +
               "</div>" +
             "</div>" +
             "<div class='tab-pane fade' id='friSessions'>" +
               "<div class='modal-body'>" +
                 "<table class='table table-striped table-bordered table-condensed'>" +
                 "<tr><th scope='row'>8:30 am - 10:00 am</th><td>" + feature.properties.fridaySession1 + "</td></tr>" +
                 "<tr><th scope='row'>10:30 am - 12:00 pm</th><td>" + feature.properties.fridaySession2 + "</td></tr></table>"
             "</div>" +
           "</div>" +
        "</div>"
      } else if (feature.properties.polyType === "AM Workshop") { //AM only workshop, Thursday + Friday
        var content =
        "<ul class='nav nav-tabs nav nav-justified' id='limitedWorkshopContent'>" +
          "<li class='active'><a href='#wedWorkshops' data-toggle='tab'>Wednesday Workshops</a></li>" +
          "<li><a href='#thursSessions' data-toggle='tab'>Thursday Sessions</a></li>" +
        "</ul>" +
        "<div class='tab-content' id='limitedWorkshopContent'>" +
          "<div class='tab-pane fade active in' id='wedWorkshops'>" +
            "<div class='modal-body'>" +
              "<table class='table table-striped table-bordered table-condensed'>" +
                "<tr><th scope='row'>9:00 am - 12:15 pm</th><td>" + feature.properties.workshopAMnumber + ": " + feature.properties.workshopAM + " (" + feature.properties.workshopAMspeakers + ")</td></tr></table>" +
            "</div>" +
        "</div>" +
           "<div class='tab-pane fade' id='thursSessions'>" +
             "<div class='modal-body'>" +
               "<table class='table table-striped table-bordered table-condensed'>" +
               "<tr><th scope='row'>10:30 am - 12:00 pm</th><td>" + feature.properties.thursdaySession1 + "</td></tr>" +
               "<tr><th scope='row'>1:30 pm - 3:00 pm</th><td>" + feature.properties.thursdaySession2 + "</td></tr>" +
               "<tr><th scope='row'>3:30 pm - 5:00 pm</th><td>" + feature.properties.thursdaySession3 + "</td></tr></table>" +
             "</div>" +
           "</div>" +
      "</div>"
    } else if (feature.properties.polyType === "One Thursday User Group") { //One User Group
            var content =
            "<ul class='nav nav-tabs nav nav-justified' id='oneThursdayUG'>" +
              "<li class='active'><a href='#wedWorkshops' data-toggle='tab'>Wednesday Workshops</a></li>" +
              "<li><a href='#thursUserGroup' data-toggle='tab'>Thursday User Groups</a></li>" +
            "</ul>" +
            "<div class='tab-content' id='oneThursdayUG'>" +
              "<div class='tab-pane fade active in' id='wedWorkshops'>" +
                "<div class='modal-body'>" +
                  "<table class='table table-striped table-bordered table-condensed'>" +
                    "<tr><th scope='row'>9:00 am - 12:15 pm</th><td>" + feature.properties.workshopAMnumber + ": " + feature.properties.workshopAM + " (" + feature.properties.workshopAMspeakers + ")</td></tr>" +
                    "<tr><th scope='row'>1:15 pm - 4:30 pm</th><td>" + feature.properties.workshopPMnumber + ": " + feature.properties.workshopPM + " (" + feature.properties.workshopPMspeakers + ")</td></tr></table>" +
                "</div>" +
            "</div>" +
               "<div class='tab-pane fade' id='thursUserGroup'>" +
                 "<div class='modal-body'>" +
                   "<table class='table table-striped table-bordered table-condensed'>" +
                   "<tr><th scope='row'>10:30 am - 12:00 pm</th><td>" + feature.properties.thursdaySession1 + "</td></tr></table>" +
                 "</div>" +
               "</div>" +
          "</div>"
       } else if (feature.properties.polyType === "Two Thursday User Groups") { //Two User Groups
         var content =
         "<ul class='nav nav-tabs nav nav-justified' id='twoThursdayUG'>" +
           "<li class='active'><a href='#wedWorkshops' data-toggle='tab'>Wednesday Workshops</a></li>" +
           "<li><a href='#thursUserGroups' data-toggle='tab'>Thursday User Groups</a></li>" +
         "</ul>" +
         "<div class='tab-content' id='twoThursdayUG'>" +
           "<div class='tab-pane fade active in' id='wedWorkshops'>" +
             "<div class='modal-body'>" +
               "<table class='table table-striped table-bordered table-condensed'>" +
                 "<tr><th scope='row'>9:00 am - 12:15 pm</th><td>" + feature.properties.workshopAMnumber + ": " + feature.properties.workshopAM + " (" + feature.properties.workshopAMspeakers + ")</td></tr>" +
                 "<tr><th scope='row'>1:15 pm - 4:30 pm</th><td>" + feature.properties.workshopPMnumber + ": " + feature.properties.workshopPM + " (" + feature.properties.workshopPMspeakers + ")</td></tr></table>" +
             "</div>" +
         "</div>" +
            "<div class='tab-pane fade' id='thursUserGroups'>" +
              "<div class='modal-body'>" +
                "<table class='table table-striped table-bordered table-condensed'>" +
                "<tr><th scope='row'>10:30 am - 12:00 pm</th><td>" + feature.properties.thursdaySession1 + "</td></tr>" +
                "<tr><th scope='row'>1:30 pm - 3:00 pm</th><td>" + feature.properties.thursdaySession2 + "</td></tr></table>" +
              "</div>" +
            "</div>" +
       "</div>"
          } else if (feature.properties.polyType === "No sessions") { //No conference sessions
            var content =
            "<ul class='nav nav-tabs nav nav-justified' id='noSessionsContent'>" +
              "<li class='active'><a href='#wedWorkshops' data-toggle='tab'>Wednesday Workshops</a></li>" +
            "</ul>" +
            "<div class='tab-content' id='noSessionsContent'>" +
              "<div class='tab-pane fade active in' id='wedWorkshops'>" +
                "<div class='modal-body'>" +
                  "<table class='table table-striped table-bordered table-condensed'>" +
                    "<tr><th scope='row'>9:00 am - 12:15 pm</th><td>" + feature.properties.workshopAMnumber + ": " + feature.properties.workshopAM + " (" + feature.properties.workshopAMspeakers + ")</td></tr>" +
                    "<tr><th scope='row'>1:15 pm - 4:30 pm</th><td>" + feature.properties.workshopPMnumber + ": " + feature.properties.workshopPM + " (" + feature.properties.workshopPMspeakers + ")</td></tr></table>";
              "</div>" +
            "</div>" +
         "</div>"
       } else if (feature.properties.polyType === "No Friday sessions")  { //No Friday conference sessions
                 var content =
                 "<ul class='nav nav-tabs nav nav-justified' id='fullWorkshopContent'>" +
                   "<li class='active'><a href='#wedWorkshops' data-toggle='tab'>Wednesday Workshops</a></li>" +
                   "<li><a href='#thursSessions' data-toggle='tab'>Thursday Sessions</a></li>" +
                 "</ul>" +
                 "<div class='tab-content' id='fullWorkshopContent'>" +
                   "<div class='tab-pane fade active in' id='wedWorkshops'>" +
                     "<div class='modal-body'>" +
                       "<table class='table table-striped table-bordered table-condensed'>" +
                         "<tr><th scope='row'>9:00 am - 12:15 pm</th><td>" + feature.properties.workshopAMnumber + ": " + feature.properties.workshopAM + " (" + feature.properties.workshopAMspeakers + ")</td></tr>" +
                         "<tr><th scope='row'>1:15 pm - 4:30 pm</th><td>" + feature.properties.workshopPMnumber + ": " + feature.properties.workshopPM + " (" + feature.properties.workshopPMspeakers + ")</td></tr></table>" +
                     "</div>" +
                 "</div>" +
                    "<div class='tab-pane fade' id='thursSessions'>" +
                      "<div class='modal-body'>" +
                        "<table class='table table-striped table-bordered table-condensed'>" +
                        "<tr><th scope='row'>10:30 am - 12:00 pm</th><td>" + feature.properties.thursdaySession1 + "</td></tr>" +
                        "<tr><th scope='row'>1:30 pm - 3:00 pm</th><td>" + feature.properties.thursdaySession2 + "</td></tr>" +
                        "<tr><th scope='row'>3:30 pm - 5:00 pm</th><td>" + feature.properties.thursdaySession3 + "</td></tr></table>" +
                      "</div>" +
                    "</div>" +
               "</div>"
       	      } else if (feature.properties.polyType === "No values") { //AM only workshop
            var content =
            "<ul class='nav nav-tabs nav nav-justified' id='noValuesContent'>" +
              "<li class='active'><a href='#notAvailable' data-toggle='tab'>Not available</a></li>" +
            "</ul>" +
            "<div class='tab-content' id='noValuesContent'>" +
              "<div class='tab-pane fade active in' id='notAvailable'>" +
                "<div class='modal-body'>" +
                  "<table class='table table-striped table-bordered table-condensed'>" +
                    "<tr><th scope='row'>Not available</th><td>No workshops and/or sessions offered.</td></tr></table>";
              "</div>" +
            "</div>" +
         "</div>"
          } else { //Conference Workshops/Sessions
          var content =
          "<ul class='nav nav-tabs nav nav-justified' id='fullWorkshopContent'>" +
            "<li class='active'><a href='#wedWorkshops' data-toggle='tab'>Wednesday Workshops</a></li>" +
            "<li><a href='#thursSessions' data-toggle='tab'>Thursday Sessions</a></li>" +
            "<li><a href='#friSessions' data-toggle='tab'>Friday Sessions</a></li>" +
          "</ul>" +
          "<div class='tab-content' id='fullWorkshopContent'>" +
            "<div class='tab-pane fade active in' id='wedWorkshops'>" +
              "<div class='modal-body'>" +
                "<table class='table table-striped table-bordered table-condensed'>" +
                  "<tr><th scope='row'>9:00 am - 12:15 pm</th><td>" + feature.properties.workshopAMnumber + ": " + feature.properties.workshopAM + " (" + feature.properties.workshopAMspeakers + ")</td></tr>" +
                  "<tr><th scope='row'>1:15 pm - 4:30 pm</th><td>" + feature.properties.workshopPMnumber + ": " + feature.properties.workshopPM + " (" + feature.properties.workshopPMspeakers + ")</td></tr></table>" +
              "</div>" +
          "</div>" +
             "<div class='tab-pane fade' id='thursSessions'>" +
               "<div class='modal-body'>" +
                 "<table class='table table-striped table-bordered table-condensed'>" +
                 "<tr><th scope='row'>10:30 am - 12:00 pm</th><td>" + feature.properties.thursdaySession1 + "</td></tr>" +
                 "<tr><th scope='row'>1:30 pm - 3:00 pm</th><td>" + feature.properties.thursdaySession2 + "</td></tr>" +
                 "<tr><th scope='row'>3:30 pm - 5:00 pm</th><td>" + feature.properties.thursdaySession3 + "</td></tr></table>" +
               "</div>" +
             "</div>" +
             "<div class='tab-pane fade' id='friSessions'>" +
               "<div class='modal-body'>" +
                 "<table class='table table-striped table-bordered table-condensed'>" +
                 "<tr><th scope='row'>8:30 am - 10:00 am</th><td>" + feature.properties.fridaySession1 + "</td></tr>" +
                 "<tr><th scope='row'>10:30 am - 12:00 pm</th><td>" + feature.properties.fridaySession2 + "</td></tr></table>"
             "</div>" +
           "</div>" +
        "</div>"
	      } //End Popup
        layer.on({
          click: function (e) {
            $("#feature-title").html(feature.properties.NAME);
            $("#feature-info").html(content);
            $("#featureModal").modal("show");
          }
        });
  }
});
$.getJSON("data/duluth/deccSkyway.geojson", function (data) {
	deccSkyway.addData(data);
});

//DECC Skyway Labels
var deccSkywayLabels = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
			return new L.CircleMarker(latlng, {
			radius: 5,
			fillColor: "none",
			color: "none",
			weight: 1,
			opacity: 1,
			clickable: false
			});
	},
  onEachFeature: function (feature, layer) {
    layer.bindLabel(
        feature.properties.NAME, {
          noHide: true,
          clickable: true
    });
  }
});
$.getJSON("data/duluth/deccSkywayPoints.geojson", function (data) {
	deccSkywayLabels.addData(data);
});

//DECC Third Floor
var deccThirdFloor = L.geoJson(null, {
style: function (feature) {
    return {
        color: "#A50541",
        dashArray: "2",
        weight: 1,
        fillColor: "#A13336",
        fillOpacity: 0.1,
        opacity: 1,
        clickable: true
    };
  },
  onEachFeature: function (feature, layer) {
	    if (feature.properties) { //Popup
        var content =
          "<ul class='nav nav-tabs nav nav-justified' id='harborBallroomContent'>" +
            "<li class='active'><a href='#wed' data-toggle='tab'>Wednesday</a></li>" +
            "<li><a href='#thurs' data-toggle='tab'>Thursday</a></li>" +
            "<li><a href='#fri' data-toggle='tab'>Friday</a></li>" +
          "</ul>" +
          "<div class='tab-content' id='harborBallroomContent'>" +
            "<div class='tab-pane fade active in' id='wed'>" +
              "<div class='modal-body'>" +
                "<table class='table table-striped table-bordered table-condensed'>" +
                  "<tr><th scope='row'>12:00 pm</th><td>" + feature.properties.activityWed1 + "</td></tr>" +
                  "<tr><th scope='row'>12:15 pm - 1:00 pm</th><td>" + feature.properties.activityWed2 + "</td></tr></table>" +
              "</div>" +
          "</div>" +
             "<div class='tab-pane fade' id='thurs'>" +
               "<div class='modal-body'>" +
                 "<table class='table table-striped table-bordered table-condensed'>" +
                  "<tr><th scope='row'>8:30 am - 9:00 am</th><td>" + feature.properties.activityThurs1 + "</td></tr>" +
                  "<tr><th scope='row'>9:00 am - 10:15 am</th><td>" + feature.properties.activityThurs2 + "</td></tr>" +
                  "<tr><th scope='row'>12:00 pm - 1:00 pm</th><td>" + feature.properties.activityThurs3+ "</td></tr></table>" +
               "</div>" +
             "</div>" +
             "<div class='tab-pane fade' id='fri'>" +
               "<div class='modal-body'>" +
                 "<table class='table table-striped table-bordered table-condensed'>" +
                 "<tr><th scope='row'>12:15 pm</th><td>" + feature.properties.activityFri1 + "</td></tr>" +
                 "<tr><th scope='row'>12:30 pm - 2:30 pm</th><td>" + feature.properties.activityFri2 + "</td></tr></table>"
             "</div>" +
           "</div>" +
        "</div>"

	        layer.on({
	          click: function (e) {
	            $("#feature-title").html(feature.properties.NAME);
	            $("#feature-info").html(content);
	            $("#featureModal").modal("show");
	          }
	        });
	      } //End Popup
  }
});
$.getJSON("data/duluth/deccThirdFloor.geojson", function (data) {
	deccThirdFloor.addData(data);
});

//DECC Third Floor Labels
var deccThirdFloorLabels = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
			return new L.CircleMarker(latlng, {
			radius: 5,
			fillColor: "none",
			color: "none",
			weight: 1,
			opacity: 1,
			clickable: false
			});
	},
  onEachFeature: function (feature, layer) {
    layer.bindLabel(
        feature.properties.NAME, {
          noHide: true,
          clickable: true
    });
  }
});
$.getJSON("data/duluth/deccThirdFloorPoints.geojson", function (data) {
	deccThirdFloorLabels.addData(data);
});

//Fun run route geojson layer
var funRunWalkRoute = L.geoJson(null, {
	  style: function (feature) {
	      return {
	        color: "#ff3135",
	        dashArray: '4',
	        weight: 3,
	        opacity: 0.6
	      };
	  },
	  onEachFeature: function (feature, layer) {
	    if (feature.properties) {
	      var content =
	      "<table class='table table-striped table-bordered table-condensed'>" +
	      "<tr><th scope='row'>Start Time</th><td>" + "Friday, Oct. 28, 2016 @ 6:15 a.m." + "</td></tr>" +
	      "<tr><th scope='row'>Start/Finish Location</th><td>" + "Canal Park Lodge Parking Lot (Northwest Corner)" + "</td></tr>" +
	      "<tr><th scope='row'>Start/Finish Address</th><td>" + "250 Canal Park Drive, Duluth" + "</td></tr>" +
	      "<tr><th scope='row'>Cost</th><td>" + "Free! Finishers will recieve a commemorative t-shirt after completion." + "</td></tr>" +
	      "<tr><th scope='row'>Race Details</th><td>" + "Race route is 'out and back' and follows the Lakewalk trail. Signage (illuminated with glow sticks) will indicate the route and the 'turn around point'. Please dress for the weather! For more information, check out the <a href='docs/2016_FunRunMap.pdf' target='_blank'> official map (download) <i class='fa fa-download'></i></a> (PDF)." + "</td></tr>" + "<table>";
	      layer.on({
	        click: function (e) {
	          $("#feature-title").html("Official 5k Fun Run/Walk Route");
	          $("#feature-info").html(content);
	          $("#featureModal").modal("show");

	        }
	      });
	    }
	    layer.on({
	      mouseover: function (e) {
	        var layer = e.target;
	        layer.setStyle({
	          weight: 3,
	          color: "#00FFFF",
	          opacity: 1
	        });
	        if (!L.Browser.ie && !L.Browser.opera) {
	          layer.bringToFront();
	        }
	      },
	      mouseout: function (e) {
	        funRunWalkRoute.resetStyle(e.target);
	      }
	    });
	  }
	});
	$.getJSON("data/duluth/funRoute.geojson", function (data) {
	  funRunWalkRoute.addData(data);
	  map.almostOver.addLayer(funRunWalkRoute);
	});

/* Empty layer placeholder to add to layer control for listening when to add/remove attractions to markerClusters layer */
var hotelsLayer = L.geoJson(null);
var hotels = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
    	icon: hotelMarker,
    	title: feature.properties.NAME,
    	riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {

        var content = "<table class='table table-striped table-bordered table-condensed'>" +
        "<tr><th scope='row'>Address</th><td>" + feature.properties.ADDRESS + "</td></tr>" +
        "<tr><th scope='row'>Phone Number</th><td>" + feature.properties.PHONE + "</td></tr>" +
        "<tr><th scope='row'>Cost</th><td>" + feature.properties.COST + "</td></tr>" +
        "<tr><th scope='row'>Group Code</th><td>" + feature.properties.GROUPCODE + "</td></tr>" +
        "<tr><th scope='row'>Website</th><td><a href='" + feature.properties.URL + "'>Online reservations</a></td></tr>" + "</table>";
        layer.bindPopup("<strong>" + feature.properties.NAME + "</strong>");

    layer.on({
        mouseover: function(e) {
          var layer = e.target;

          // Get the GeoJSON from establishments and hotels
          var establishmentFeatures = establishments.toGeoJSON();
          var hotelFeatures = hotels.toGeoJSON();

          // Using Turf, find the nearest establishment to hotel moused-over
          var nearestEstablishment = turf.nearest(e.target.feature, establishmentFeatures);

          // Highlight hotel
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], e.target.feature.geometry.coordinates[0]], {
            stroke: false,
            fillColor: "#00FFFF",
            fillOpacity: 0.7,
            radius: 10
          }));

          // Set content for and open a popup and highlight the nearest pubs
          establishments.eachLayer(function(layer) {

                if (layer.feature.id === nearestEstablishment.id) {
                  var distance = turf.distance(e.target.feature, layer.feature, "kilometers");
                  var distanceInMeters = Math.round(distance * 1000);
                  nearestFeature = layer;

                  // Highlight nearest pub
                  highlight.addLayer(L.circleMarker([layer.feature.geometry.coordinates[1], layer.feature.geometry.coordinates[0]], {
                    stroke: false,
                    fillColor: "#008800",
                    fillOpacity: 0.7,
                    radius: 10
                  }));

                  // Using Turf, find and highlight the next nearest establishment - think pub crawl :-)
                  establishmentFeatures.features = establishmentFeatures.features.filter(function(feature) {
                                                    return feature.id != nearestEstablishment.id;
                                                  });
                  var nextNearestEstablishment = turf.nearest(nearestEstablishment, establishmentFeatures);
                  var nextDistance = turf.distance(nextNearestEstablishment, e.target.feature, "kilometers");
                  var nextDistanceInMeters = Math.round(nextDistance * 1000);

                  highlight.addLayer(L.circleMarker([nextNearestEstablishment.geometry.coordinates[1], nextNearestEstablishment.geometry.coordinates[0]], {
                    stroke: false,
                    fillColor: "#FF0E1D",
                    fillOpacity: 0.7,
                    radius: 10
                  }));

                  // Set content of popup to include hotel name and nearest pubs + distances
                  e.target.setPopupContent('<h4>' + e.target.feature.properties.NAME + '</h4><strong>Nearest Pubs:</strong><br><i class="fa fa-cutlery" aria-hidden="true" style="color:#008800"></i> ' + layer.feature.properties.NAME + ' (' + distanceInMeters.toString() + ' meters)<br><i class="fa fa-cutlery" aria-hidden="true" style="color:#FF0E1D"></i> ' + nextNearestEstablishment.properties.NAME + ' (' + nextDistanceInMeters.toString() + " meters)", { closeButton: true });
                  e.target.openPopup();

                }
              });
        },

        click: function (e) {

          // Find all pubs within 1km
          var establishmentFeatures = establishments.toGeoJSON();
          kmBuffer = turf.buffer(e.target.feature,1,'kilometers');
          nearbyPubs = turf.within(establishmentFeatures,kmBuffer);

          // Calculate Distances to all nearby pubs and Generate HTML Table
          var pubs = {};
          nearbyPubs.features.forEach(function(feature) {
            var distance = turf.distance(e.target.feature, feature, "kilometers");
            if (distance < 1) {
              var distanceInMeters = Math.round(distance * 1000);
              pubs[feature.properties.NAME] = distanceInMeters;
            }
          });

          // Sort pub names by distance
          pubsSorted = Object.keys(pubs).sort(function(a,b){return pubs[a]-pubs[b]})

          // Build an HTML table of pubs
          var pubsHTML = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th scope='row'>Nearby Pubs (<1km)</th><th>Distance (meters)</th></tr>";
          for (var pub of pubsSorted) {
            pubsHTML += "<tr><td scope='row'>" + pub + "</td><td>" + pubs[pub] + "</td></tr>";
          }
          pubsHTML += "</table>";

          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content + pubsHTML);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            stroke: false,
            fillColor: "#00FFFF",
            fillOpacity: 0.7,
            radius: 10
          }));

          map.closePopup();
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="'+L.stamp(layer)+'"><td style="vertical-align: middle;"><span class="fa-stack"><i class="fa fa-square fa-stack-2x" style="color: #406573;"></i><i class="fa fa-bed fa-stack-1x" style="color: white;"></i></span></td><td class="feature-name">'+layer.feature.properties.NAME+'</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      hotelSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADDRESS,
        source: "Hotels",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});

$.getJSON("data/duluth/hotels.geojson", function (data) {
  hotels.addData(data);
  map.addLayer(hotelsLayer);
});

var eventsLayer = L.geoJson(null);
var events = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
    	icon: starMarker,
    	title: feature.properties.NAME,
    	riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" +
      "<tr><th scope='row'>Event Information</th><td>" + feature.properties.DETAILS + " (" + feature.properties.EVENTHOURS + ")</td></tr>" +
      "<tr><th scope='row'>Address</th><td>" + feature.properties.ADDRESS + "</td></tr>" +
      "<tr><th scope='row'>Full Hours</th><td>" + feature.properties.HOURS + "</td></tr>" +
      "<tr><th scope='row'>Discount</th><td>" + feature.properties.DISCOUNT_NOTES + "</td></tr>" +
      "<tr><th scope='row'>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + " (new window) <i class='fa fa-external-link-square'></i></a></td></tr><table>";
      layer.on({
        click: function (e) {
	      $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            stroke: false,
            fillColor: "#00FFFF",
            fillOpacity: 0.7,
            radius: 10
          }));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="'+L.stamp(layer)+'"><td style="vertical-align: middle;"><span class="fa-stack"><i class="fa fa-square fa-stack-2x" style="color: #B74448;"></i><i class="fa fa-star fa-stack-1x" style="color: white;"></i></span></td><td class="feature-name">'+layer.feature.properties.NAME+'</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      eventsSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADDRESS,
        source: "Events",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/duluth/events.geojson", function (data) {
  events.addData(data);
  map.addLayer(eventsLayer);
});

var attractionsLayer = L.geoJson(null);
var attractions = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
    	icon: attractionMarker,
    	title: feature.properties.NAME,
    	riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" +
      "<tr><th scope='row'>Address</th><td>" + feature.properties.ADDRESS + "</td></tr>" +
      "<tr><th scope='row'>Hours</th><td>" + feature.properties.HOURS + "</td></tr>" +
      "<tr><th scope='row'>Cost</th><td>" + feature.properties.COST + "</td></tr>" +
   	  "<tr><th scope='row'>Website</th><td><a class='url-break' href='" + feature.properties.WEBSITE + "' target='_blank'>" + feature.properties.WEBSITE + " (new window) <i class='fa fa-external-link-square'></i></a></td></tr>" + "<table>";
      layer.on({
        click: function (e) {
	      $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            stroke: false,
            fillColor: "#00FFFF",
            fillOpacity: 0.7,
            radius: 10
          }));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="'+L.stamp(layer)+'"><td style="vertical-align: middle;"><span class="fa-stack"><i class="fa fa-square fa-stack-2x" style="color: #72AF26;"></i><i class="fa fa-binoculars fa-stack-1x" style="color: white;"></i></span></td><td class="feature-name">'+layer.feature.properties.NAME+'</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      attractionsSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADDRESS,
        source: "Attractions",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/duluth/attractions.geojson", function (data) {
  attractions.addData(data);
  map.addLayer(attractionsLayer);
});

/* Empty layer placeholder to add to layer control for listening when to add/remove establishments to markerClusters layer */
var establishmentsLayer = L.geoJson(null);
var establishments = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
    	icon: establishmentMarker,
    	title: feature.properties.NAME,
    	riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" +
      "<tr><th scope='row'>Address</th><td>" + feature.properties.ADDRESS + "</td></tr>" +
      "<tr><th scope='row'>Hours</th><td>" + feature.properties.HOURS + "</td></tr>" +
      "<tr><th scope='row'>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + " (new window) <i class='fa fa-external-link-square'></i></a></td></tr>" +
      "<tr><th scope='row'>Discount</th><td>" + feature.properties.DISCOUNT_NOTES + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            stroke: false,
            fillColor: "#00FFFF",
            fillOpacity: 0.7,
            radius: 10
          }));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="'+L.stamp(layer)+'"><td style="vertical-align: middle;"><span class="fa-stack"><i class="fa fa-square fa-stack-2x" style="color: #EB902E;"></i><i class="fa fa-cutlery fa-stack-1x" style="color: white;"></i></span></td><td class="feature-name">'+layer.feature.properties.NAME+'</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      establishmentsSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADDRESS,
        source: "Establishments",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/duluth/establishments.geojson", function (data) {
  establishments.addData(data);
  map.addLayer(establishmentsLayer);
});

//Define the map bounds constraint
var southWest = L.latLng(46.6300, -92.5000),
	northEast = L.latLng(46.8805, -91.9201),
	bounds = L.latLngBounds(southWest, northEast);

map = L.map("map", {
  zoom: 18,
  center: [46.781235, -92.097792],
  layers: [mqStreetBasemap, deccPoly, deccGround, funRunWalkRoute, markerClusters, highlight],
  maxBounds: bounds,
  zoomControl: false,
  attributionControl: false
});

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
  if (e.layer === attractionsLayer) {
    markerClusters.addLayer(attractions);
  }
  if (e.layer === hotelsLayer) {
	    markerClusters.addLayer(hotels);
	  }
  if (e.layer === establishmentsLayer) {
    markerClusters.addLayer(establishments);
  }
  if (e.layer === eventsLayer) {
    markerClusters.addLayer(events);
  }
});

map.on("overlayremove", function(e) {
  if (e.layer === attractionsLayer) {
    markerClusters.removeLayer(attractions);
  }
  if (e.layer === eventsLayer) {
    markerClusters.removeLayer(events);
  }
  if (e.layer === hotelsLayer) {
	    markerClusters.removeLayer(hotels);
	  }
  if (e.layer === establishmentsLayer) {
    markerClusters.removeLayer(establishments);
  }
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point.",
    outsideMapBoundsMsg: "You seem to be located outside the boundaries of the map."
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Streets": mqStreetBasemap,
  "Aerial Imagery": mqSatBasemap,
  "Hybrid": mqHybridBasemap
};

var groupedOverlays = {
  "DECC": {
	   "&nbsp;1st Floor (Ground)": deccGround,
	    "&nbsp;2nd Floor (Skyway)": deccSkyway,
      "&nbsp;3rd Floor (Harbor Ballroom)": deccThirdFloor
  },
  "Places of Interest": {
		  "&nbsp;5k Fun Run/Walk Route": funRunWalkRoute,
		  "<span class='fa-stack fa-lg'><i class='fa fa-square fa-stack-2x' style='color: #406573;'></i><i class='fa fa-bed fa-stack-1x' style='color: white;'></i></span>&nbsp;Hotels": hotelsLayer,
      "<span class='fa-stack fa-lg'><i class='fa fa-square fa-stack-2x' style='color: #B74448;'></i><i class='fa fa-star fa-stack-1x' style='color: white;'></i></span>&nbsp;Conference Events": eventsLayer,
		  "<span class='fa-stack fa-lg'><i class='fa fa-square fa-stack-2x' style='color: #72AF26;'></i><i class='fa fa-binoculars fa-stack-1x' style='color: white;'></i></span>&nbsp;Attractions": attractionsLayer,
		  "<span class='fa-stack fa-lg'><i class='fa fa-square fa-stack-2x' style='color: #EB902E;'></i><i class='fa fa-cutlery fa-stack-1x' style='color: white;'></i></span>&nbsp;Establishments": establishmentsLayer
  }
};

var options = { exclusiveGroups: ["DECC"],
		collapsed: isCollapsed
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, options, {
  collapsed: isCollapsed
}).addTo(map);

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

//TODO: Results are cleared when the text is cleared
//Clear Search with clicking close
$("#searchclear").on("click", function(e){
    e.preventDefault();
    $("#sidebar-search").val("");
    sidebarSearch();
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});

  var attractionsBH = new Bloodhound({
    name: "Attractions",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: attractionsSearch,
    limit: 10
  });

  var eventsBH = new Bloodhound({
    name: "Events",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: eventsSearch,
    limit: 10
  });

  var hotelsBH = new Bloodhound({
	    name: "Hotels",
	    datumTokenizer: function (d) {
	      return Bloodhound.tokenizers.whitespace(d.name);
	    },
	    queryTokenizer: Bloodhound.tokenizers.whitespace,
	    local: hotelSearch,
	    limit: 10
	  });

  var establishmentsBH = new Bloodhound({
    name: "Establishments",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: establishmentsSearch,
    limit: 10
  });

  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=mnhealth&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
            settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });


  attractionsBH.initialize();
  establishmentsBH.initialize();
  eventsBH.initialize();
  hotelsBH.initialize();
  geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "Attractions",
    displayKey: "name",
    source: attractionsBH.ttAdapter(),
    templates: {
    	header: "<h4 class='typeahead-header'><span class='fa-stack'><i class='fa fa-square fa-stack-2x' style='color: #72AF26;'></i><i class='fa fa-binoculars fa-stack-1x' style='color: white;'></i></span>&nbsp;Attractions</h4>",
    	suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
	  }, {
      name: "Events",
      displayKey: "name",
      source: eventsBH.ttAdapter(),
      templates: {
      	header: "<h4 class='typeahead-header'><span class='fa-stack'><i class='fa fa-square fa-stack-2x' style='color: #B74448;'></i><i class='fa fa-star fa-stack-1x' style='color: white;'></i></span>&nbsp;Events</h4>",
      	suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
      }
  	  },{
	    name: "Hotels",
	    displayKey: "name",
	    source: hotelsBH.ttAdapter(),
	    templates: {
	      header: "<h4 class='typeahead-header'><span class='fa-stack'><i class='fa fa-square fa-stack-2x' style='color: #406573;'></i><i class='fa fa-bed fa-stack-1x' style='color: white;'></i></span>&nbsp;Hotels</h4>",
	      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
	    }
	  }, {
    name: "Establishments",
    displayKey: "name",
    source: establishmentsBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><span class='fa-stack'><i class='fa fa-square fa-stack-2x' style='color: #EB902E;'></i><i class='fa fa-cutlery fa-stack-1x' style='color: white;'></i></span>&nbsp;Establishments</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
	  if (datum.source === "Attractions") {
      if (!map.hasLayer(attractionsLayer)) {
        map.addLayer(attractionsLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
	  if (datum.source === "Hotels") {
	  if (!map.hasLayer(hotelsLayer)) {
	  	map.addLayer(hotelsLayer);
	  }
	  map.setView([datum.lat, datum.lng], 17);
	  if (map._layers[datum.id]) {
		  map._layers[datum.id].fire("click");
	  }
	}
    if (datum.source === "Establishments") {
      if (!map.hasLayer(establishmentsLayer)) {
        map.addLayer(establishmentsLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Events") {
      if (!map.hasLayer(eventsLayer)) {
        map.addLayer(eventsLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});

//AlmostOver: Define a circle
var circle = L.circleMarker([0, 0], {radius: 5, fillColor: 'white', fillOpacity: 1});

//AlmostOver: Map functionality that displays the circle and makes it seem like the user is hovering over the polyline
map.on('almost:over', function (e) {
  map.addLayer(circle);
  e.layer.setStyle({weight: 3, color: "#00FFFF"});
});

//AlmostOver: Map functionality to have the circle displayed along the line (using the lat/long of the polyline)
map.on('almost:move', function (e) {
  circle.setLatLng(e.latlng);
});

//AlmostOver: Once the user has gone 'off' the line, reset the feature
map.on('almost:out', function (e) {
  map.removeLayer(circle);
  e.layer.setStyle({weight: 3, color: "#FF3135", dashArray: 4, opacity: 0.6});
});

//AlmostOver: Mobile functionality that displays the original line style (also on desktop)
$('#featureModal').on('hidden.bs.modal', function () {
  map.removeLayer(circle);
  funRunWalkRoute.setStyle({weight: 3, color: "#FF3135", dashArray: 4, opacity: 0.6});
})

//AlmostOver: When the user is almost clicking on the polyline, show the attribute table
map.on('almost:click', function (e) {
  e.layer.setStyle({weight: 3, color: "#00FFFF"});
      var content =
      "<table class='table table-striped table-bordered table-condensed'>" +
      "<tr><th scope='col'>Start Time</th><td>" + "Friday, Oct. 28, 2016 @ 6:15 a.m." + "</td></tr>" +
      "<tr><th scope='col'>Start/Finish Location</th><td>" + "Canal Park Lodge Parking Lot (Northwest Corner)" + "</td></tr>" +
      "<tr><th scope='col'>Start/Finish Address</th><td>" + "250 Canal Park Drive, Duluth" + "</td></tr>" +
      "<tr><th scope='col'>Cost</th><td>" + "Free! Finishers will recieve a commemorative t-shirt after completion." + "</td></tr>" +
      "<tr><th scope='col'>Race Details</th><td>" + "Race route is 'out and back' and follows the Lakewalk trail. Signage (illuminated with glow sticks) will indicate the route and the 'turn around point'. Please dress for the weather! For more information, check out the <a href='docs/2016_FunRunMap.pdf' target='_blank'> official map (download) <i class='fa fa-download'></i></a>." + "</td></tr>" + "<table>";
          $("#feature-title").html("Official 5k Fun Run/Walk Route");
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
});

// Add labels
map.on('zoomend overlayadd', function () {
  if (map.getZoom() >= 18) {
    if (map.hasLayer(deccGround)) {
      if (map.hasLayer(deccGroundLabels) == false) { map.addLayer(deccGroundLabels); }
      if (map.hasLayer(deccSkywayLabels)) { map.removeLayer(deccSkywayLabels); }
      if (map.hasLayer(deccThirdFloorLabels)) { map.removeLayer(deccThirdFloorLabels); }
    } else if (map.hasLayer(deccSkyway)) {
      if (map.hasLayer(deccSkywayLabels) == false) { map.addLayer(deccSkywayLabels); }
      if (map.hasLayer(deccGroundLabels)) { map.removeLayer(deccGroundLabels); }
      if (map.hasLayer(deccThirdFloorLabels)) { map.removeLayer(deccThirdFloorLabels); }
  } else if (map.hasLayer(deccThirdFloor)) {
      if (map.hasLayer(deccThirdFloorLabels) == false) { map.addLayer(deccThirdFloorLabels); }
      if (map.hasLayer(deccGroundLabels)) { map.removeLayer(deccGroundLabels); }
      if (map.hasLayer(deccSkywayLabels)) { map.removeLayer(deccSkywayLabels); }
  } else {
    // Do nothing
  }
} else {
  if (map.hasLayer(deccGroundLabels)) { map.removeLayer(deccGroundLabels); }
  if (map.hasLayer(deccSkywayLabels)) { map.removeLayer(deccSkywayLabels); }
  if (map.hasLayer(deccThirdFloorLabels)) { map.removeLayer(deccThirdFloorLabels); }
}
});

// Hide nearest pub popup/highlights if another pub is clicked or map itself
establishments.on('click', function() {
  map.closePopup();
});
map.on('click', function() {
  map.closePopup();
});
map.on('popupclose', function() {
  highlight.clearLayers();
});