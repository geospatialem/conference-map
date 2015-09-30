var map, featureList, hotelSearch = [], attractionsSearch = [], establishmentsSearch = [];

$(document).on("click", ".feature-row", function(e) {
  sidebarClick(parseInt($(this).attr("id"), 10));
});

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
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

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
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
  map.addLayer(hotelsLayer).addLayer(attractionsLayer).addLayer(establishmentsLayer);
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

/* Basemap Layers */
var streets = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
	  maxZoom: 19,
	  subdomains: ["otile1", "otile2", "otile3", "otile4"],
	  attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
});

var satellite = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
	  maxZoom: 18,
	  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
	  attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
});

var hybrid = L.layerGroup([L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
	maxZoom: 18,
	subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"]
}), L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png", {
	maxZoom: 19,
	subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
	attribution: 'Labels courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
})]);

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

//DECC Point (lat, long)
var mainLayer = L.geoJson(null);
var main = L.geoJson(null, {
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
      "<tr><th>Address</th><td>" + feature.properties.ADDRESS + "</td></tr>" +
      "<tr><th>Hours</th><td>" + feature.properties.HOURS + "</td></tr>" +
      "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.WEBSITE + "' target='_blank'>" + feature.properties.WEBSITE + "</a></td></tr>" + "<table>";

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
    }
  }
});
$.getJSON("data/main.geojson", function (data) {
  main.addData(data);
  map.addLayer(mainLayer);
});

//DECC Polygon
var deccPoly = L.geoJson(null, {
style: function (feature) {
    return {
      color: "#A50541",
      weight: 2,
      fillColor: "#A13336",
      fillOpacity: 0.1,
      opacity: 1,
      dashArray: '3',
      clickable: false
    };
  }
});
$.getJSON("data/deccLayout.geojson", function (data) {
	deccPoly.addData(data);
});

//DECC Ground Floor
var deccGround = L.geoJson(null, {
style: function (feature) {
    return {
      color: "#A50541",
      weight: 1.5,
      fillColor: "#A13336",
      fillOpacity: 0.1,
      opacity: 1,
      dashArray: '2',
      clickable: true
    };
  },
  onEachFeature: function (feature, layer) {
	    if (feature.properties) { //Popup
	        var content = "<table class='table table-striped table-bordered table-condensed'>" +
          "<tr><th>Number of Rooms</th><td>" + feature.properties.ROOMS + "</td></tr>" +
          "<tr><th>Workshops</th><td>" + feature.properties.WORKSHOPS + "</td></tr>" +
          "<tr><th>Sessions</th><td>" + feature.properties.SESSIONS + "</td></tr>" + "<table>";
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
$.getJSON("data/deccGround.geojson", function (data) {
	deccGround.addData(data);
});

//DECC Skyway Level
var deccSkyway = L.geoJson(null, {
style: function (feature) {
    return {
        color: "#A50541",
        weight: 1.5,
        fillColor: "#A13336",
        fillOpacity: 0.1,
        opacity: 1,
        dashArray: '2',
        clickable: true
    };
  },
  onEachFeature: function (feature, layer) {
	    if (feature.properties) { //Popup
	        var content = "<table class='table table-striped table-bordered table-condensed'>" +
          "<tr><th>Number of Rooms</th><td>" + feature.properties.ROOMS + "</td></tr>" +
          "<tr><th>Workshops</th><td>" + feature.properties.WORKSHOPS + "</td></tr>" +
          "<tr><th>Sessions</th><td>" + feature.properties.SESSIONS + "</td></tr>" + "<table>";
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
$.getJSON("data/deccSkyway.geojson", function (data) {
	deccSkyway.addData(data);
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
	      "<tr><th>Start Time</th><td>" + "Friday, Oct. 9, 2015 @ 6:00 a.m." + "</td></tr>" +
	      "<tr><th>Start/Finish Location</th><td>" + "Canal Park Lodge Parking Lot (Northwest Corner)" + "</td></tr>" +
	      "<tr><th>Start/Finish Address</th><td>" + "250 Canal Park Drive, Duluth" + "</td></tr>" +
	      "<tr><th>Cost</th><td>" + "Free! Finishers will recieve a commemorative t-shirt after completion." + "</td></tr>" +
	      "<tr><th>Race Details</th><td>" + "Race route is 'out and back' and follows the Lakewalk trail. Signage (illuminated with glow sticks) will indicate the route and the 'turn around point'. Please dress for the weather! For more information, check out the <a href='docs/2015_FunRunMap.pdf' target='_blank'> official map</a> (PDF)." + "</td></tr>" + "<table>";
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
	$.getJSON("data/funRoute.geojson", function (data) {
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
        "<tr><th>Address</th><td>" + feature.properties.ADDRESS + "</td></tr>" +
        "<tr><th>Phone Number</th><td>" + feature.properties.PHONE + "</td></tr>" +
        "<tr><th>Cost</th><td><strike>" + feature.properties.COST + "</strike></td></tr>" +
        "<tr><th>Group Code</th><td><strike>" + feature.properties.GROUPCODE + "</strike></td></tr>" +
        "<tr><th>Website</th><td> <strike>Reservations</strike> </td></tr>" + "<table>";
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
$.getJSON("data/hotels.geojson", function (data) {
  hotels.addData(data);
  map.addLayer(hotelsLayer);
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
      "<tr><th>Address</th><td>" + feature.properties.ADDRESS + "</td></tr>" +
      "<tr><th>Hours</th><td>" + feature.properties.HOURS + "</td></tr>" +
      "<tr><th>Cost</th><td>" + feature.properties.COST + "</td></tr>" +
   	  "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.WEBSITE + "' target='_blank'>" + feature.properties.WEBSITE + "</a></td></tr>" + "<table>";
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
$.getJSON("data/attractions.geojson", function (data) {
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
      "<tr><th>Address</th><td>" + feature.properties.ADDRESS + "</td></tr>" +
      "<tr><th>Hours</th><td>" + feature.properties.HOURS + "</td></tr>" +
      "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" +
      "<tr><th>Discount</th><td>" + feature.properties.DISCOUNT_NOTES + "</td></tr>" + "<table>";
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
$.getJSON("data/establishments.geojson", function (data) {
  establishments.addData(data);
  map.addLayer(establishmentsLayer);
});

//Define the map bounds constraint
var southWest = L.latLng(46.6300, -92.5000),
	northEast = L.latLng(46.8805, -91.9201),
	bounds = L.latLngBounds(southWest, northEast);

map = L.map("map", {
  zoom: 16,
  center: [46.7830,-92.1005],
  layers: [deccPoly, main, streets, markerClusters, highlight],
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
});

map.on("overlayremove", function(e) {
  if (e.layer === attractionsLayer) {
    markerClusters.removeLayer(attractions);
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

/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

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
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
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
  "Streets": streets,
  "Aerial Imagery": satellite,
  "Hybrid": hybrid
};

var groupedOverlays = {
  "DECC": {
	"&nbsp;Facility": deccPoly,
	"&nbsp;Ground Level": deccGround,
	"&nbsp;Skyway Level": deccSkyway
  },
  "Places of Interest": {
		"&nbsp;5k Fun Run/Walk Route": funRunWalkRoute,
		"<span class='fa-stack fa-lg'><i class='fa fa-square fa-stack-2x' style='color: #406573;'></i><i class='fa fa-bed fa-stack-1x' style='color: white;'></i></span>&nbsp;Hotels": hotelsLayer,
		"<span class='fa-stack fa-lg'><i class='fa fa-square fa-stack-2x' style='color: #72AF26;'></i><i class='fa fa-binoculars fa-stack-1x' style='color: white;'></i></span>&nbsp;Attractions": attractionsLayer,
		"<span class='fa-stack fa-lg'><i class='fa fa-square fa-stack-2x' style='color: #EB902E;'></i><i class='fa fa-cutlery fa-stack-1x' style='color: white;'></i></span>&nbsp;Establishments": establishmentsLayer,
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
  hotelsBH.initialize();
  establishmentsBH.initialize();
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
//TODO: Add mobile functionality that displays the original style
map.on('almost:out', function (e) {
  map.removeLayer(circle);
  e.layer.setStyle({weight: 3, color: "#FF3135", dashArray: 4, opacity: 0.6});
});

//AlmostOver: When the user is almost clicking on the polyline, show the attribute table
map.on('almost:click', function (e) {
  e.layer.setStyle({weight: 3, color: "#00FFFF"});
      var content =
      "<table class='table table-striped table-bordered table-condensed'>" +
      "<tr><th>Start Time</th><td>" + "Friday, Oct. 9, 2015 @ 6:00 a.m." + "</td></tr>" +
      "<tr><th>Start/Finish Location</th><td>" + "Canal Park Lodge Parking Lot (Northwest Corner)" + "</td></tr>" +
      "<tr><th>Start/Finish Address</th><td>" + "250 Canal Park Drive, Duluth" + "</td></tr>" +
      "<tr><th>Cost</th><td>" + "Free! Finishers will recieve a commemorative t-shirt after completion." + "</td></tr>" +
      "<tr><th>Race Details</th><td>" + "Race route is 'out and back' and follows the Lakewalk trail. Signage (illuminated with glow sticks) will indicate the route and the 'turn around point'. Please dress for the weather! For more information, check out the <a href='docs/2015_FunRunMap.pdf' target='_blank'> official map</a> (PDF)." + "</td></tr>" + "<table>";
          $("#feature-title").html("Official 5k Fun Run/Walk Route");
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
});
