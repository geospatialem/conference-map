var featureList, boroughSearch = [], theaterSearch = [], museumSearch = [];

$(document).on("click", ".feature-row", function(e) {
	  sidebarClick(parseInt($(this).attr("id"), 10));
	});

	$("#about-btn").click(function() {
	  $("#aboutModal").modal("show");
	  $(".navbar-collapse.in").collapse("hide");
	  return false;
	});

	$("#full-extent-btn").click(function() {
	  //map.fitBounds(boroughs.getBounds());
	  $(".navbar-collapse.in").collapse("hide");
	  return false;
	});

	$("#legend-btn").click(function() {
	  $("#legendModal").modal("show");
	  $(".navbar-collapse.in").collapse("hide");
	  return false;
	});

	$("#login-btn").click(function() {
	  $("#loginModal").modal("show");
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
	  map.addLayer(theaterLayer).addLayer(museumLayer);
	  var layer = markerClusters.getLayer(id);
	  markerClusters.zoomToShowLayer(layer, function() {
	    map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
	    layer.fire("click");
	  });
	  /* Hide sidebar and go to the map on small screens */
	  if (document.body.clientWidth <= 767) {
	    $("#sidebar").hide();
	    map.invalidateSize();
	  }
	}

		var mbAttr = 	'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
						'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
						'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			mbUrl = 	'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';
        
		var grayscale = L.tileLayer(mbUrl, {id: 'examples.map-20v6611k', 	attribution: mbAttr}),
			streets = 	L.tileLayer(mbUrl, {id: 'examples.map-i875mjb7',	attribution: mbAttr});
			satellite = L.tileLayer(mbUrl, {id: 'examples.map-igb471ik',	attribution: mbAttr});
			
		var conferenceMarker = L.AwesomeMarkers.icon({ //conference marker
			icon: 'star', 
			prefix: 'fa', 
			markerColor: 'darkred', 
			});		
			
		var hotelMarker = L.AwesomeMarkers.icon({ //hotel marker
			icon: 'suitcase', 
			prefix: 'fa', 
			markerColor: 'cadetblue', 
			});
		
		var attractionsMarker = L.AwesomeMarkers.icon({ //attractions marker
			icon: 'binoculars', 
			prefix: 'fa', 
			markerColor: 'green', 
			});
		
		var restaurantMarker = L.AwesomeMarkers.icon({ //restaurants marker
			icon: 'cutlery', 
			prefix: 'fa', 
			markerColor: 'orange', 
			});
		
		var coffeeMarker = L.AwesomeMarkers.icon({ //coffee shop marker
			icon: 'coffee', 
			prefix: 'fa', 
			markerColor: 'orange', 
			});
		
		var beverageMarker = L.AwesomeMarkers.icon({ //bar marker
			icon: 'beer', 
			prefix: 'fa', 
			markerColor: 'orange', 
			});
		
//conference site
	var	decc 		= L.marker([46.781194,-92.097675], {icon: conferenceMarker}).bindPopup
			('<b> Duluth Entertainment Convention Center</b><br />' + 
					'350 Harbor Drive <br/ >' + 
					'<a target = "_blank" href="http://www.decc.org/">Website</a><br />' +
					'<img height="140px" width="200px" src="http://www.vital2013.com/wp-content/uploads/2011/10/duluth_DECC.jpg">');
		
//hotels
		holiday 	= L.marker([46.785076, -92.102067], {icon: hotelMarker}).bindPopup
			('<b> Holiday Inn Hotel & Suites</b><br />' + 
					'200 West First St <br/ >' + 
					'218-722-1202 or 800-477-7089 <br />' +
					'$89/night <br />' +
					'<a target = "_blank" href="http://www.holidayinn.com/hotels/us/en/duluth/dulmn/hoteldetail?destination=200+WEST+1ST+STREET+DULUTH+MINNESOTA+United+States&groupCode=GIS">Reservations</a> (Group Code: GIS)' +
					'<img height="150px" width="225px" src="http://www.hiduluth.com/assets/images/page-home.jpg"/>');
		
		innlakesup	= L.marker([46.783051, -92.093390], {icon: hotelMarker}).bindPopup
			('<b>The Inn on Lake Superior </b><br />' + 
					'350 Canal Park Drive <br/ >' + 
					'218-625-0415 or 888-668-4352 <br />' +
					'$105/night <br />' +
			'<a target = "_blank" href="https://reservations.theinnonlakesuperior.com/v1web/Availability.ASP?WCI=Groups&WCE=PickupRoom&V1WebSession=86966">Reservations</a> (Group ID: 752, Password: 37000342)' +
			'<img height="150px" width="225px" src="http://www.tnetnoc.com/hotelphotos/751/657751/2631759-Inn-On-Lake-Superior-Hotel-Exterior-2-DEF.jpg"/>');
		
		radisson    = L.marker([46.781947, -92.105311], {icon: hotelMarker}).bindPopup
		    ('<b>Radisson Duluth Harbor View</b><br />' + 
					'505 West Superior St <br/ >' + 
					'218-727-8981 <br />' +
					'$89/night <br />' +
			'<a target = "_blank" href="http://www.radisson.com/reservation/resEntrance.do?pacLink=y&promoCode=GISLIS&hotelCode=DULUTH">Reservations</a> (Group Code: GISLIS)' +
			'<img height="150px" width="225px" src="http://cache.carlsonhotels.com/ow-cms/rad/images/hotels/DULUTH/new%20CMS/1-Marquee-450x300-.jpg"/>');

		
//attractions
		bridge 		= L.marker([46.779232, -92.093058], {icon: attractionsMarker}).bindPopup
			('<b>Aerial Lift Bridge</b></br >' +
			'601 S Lake Ave </br >' +
			'<img height="112.5px" width="244.5px" src="http://upload.wikimedia.org/wikipedia/commons/9/97/Aerial_lift_bridge_duluth_mn.jpg"/>');
			
		tower		= L.marker([46.776097, -92.125000], {icon: attractionsMarker}).bindPopup
			('<b>Enger Park and Tower</b></br >' +
			'16th Ave W & Skyline Drive </br >' +
			'<img height="150px" width="225px" src="http://www.northernimages.com/Duluth/Duluth-Parks-and-Trails/Enger-Park/i-fMn77f6/1/L/PE-08698-L.jpg"/>');
			
		rose		= L.marker([46.797795, -92.080993], {icon: attractionsMarker}).bindPopup
			('<b>Leif Erickson Park & Rose Garden</b></br >' +
			'12th Ave E & London Road </br >' +
			'<img height="150px" width="225px" src="http://media-cdn.tripadvisor.com/media/photo-s/02/1a/36/40/leif-erickson-park-rose.jpg"/>');

		estate		= L.marker([46.815161, -92.051791], {icon: attractionsMarker}).bindPopup
			('<b>Glensheen Estate</b></br >' +
			'3300 London Rd </br >' +
			'<img height="150px" width="204px" src="http://www.duluthhotelrestaurant.com/images/apg_1356732196.jpg"/>');

		visitor		= L.marker([46.779825, -92.092425], {icon: attractionsMarker}).bindPopup
			('<b>Lake Superior Maritime Visitor Center</b></br >' +
			'600 S Lake Ave </br >' +
			'<img height="150px" width="245px" src="http://www.lakesuperior.com/downloads/2027/download/351marinehd.jpg?cb=9be75471f323b3b6ce8e8f5938dd7ee1"/>');
		
		museum		= L.marker([46.781702, -92.103879], {icon: attractionsMarker}).bindPopup
			('<b>Lake Superior Railroad Museum </b><br />' +
			'506 W Michigan St </br >' +
			'<img height="150px" width="202px" src="https://kiddohub.com/sites/default/files/joomla-business-image--175_image_4.jpg"/>');

		spirit		= L.marker([46.720187, -92.217740], {icon: attractionsMarker}).bindPopup
			('<b>Spirit Mountain </b><br />' +
			'9500 Spirit Mountain Pl </br >' +
			'<img height="150px" width="203px" src="http://www.mtvillas.com/photos/wizardslide1008_300px.jpg"/>');
			
		aqua 		= L.marker([46.779278, -92.100309], {icon: attractionsMarker}).bindPopup
			('<b>Great Lakes Aquarium </b><br />' +
			'353 Harbor Dr <br />' +
			'<img height="150px" width="225px" src="http://aquaviews.net/wp-content/uploads/2009/09/Duluth.jpg"/>');

		zoo 		= L.marker([46.725798, -92.190494], {icon: attractionsMarker}).bindPopup
			('Lake Superior Zoo </b><br />' +
			'7210 Fremont St <br />' +
			'<img height="150px" width="225px" src="http://media-cdn.tripadvisor.com/media/photo-s/05/fb/a0/67/lake-superior-zoo-zoological.jpg"/>');

//restaurants
		grill 		= L.marker([46.760614, -92.130050], {icon: restaurantMarker}).bindPopup		
			('<b>Duluth Grill </b><br />' + 
			'118 S 27th Ave W <br/ >' + 
			'Hours: 7 a.m. - 9 p.m.  <br />' +
			'<a target = "_blank" href="http://www.duluthgrill.com/">Website</a>');
			
		waters 		= L.marker([46.781948, -92.094636], {icon: restaurantMarker}).bindPopup		
			('<b>Northern Waters Smokehaus </b><br />' + 
			'394 Lake Avenue South, Suite 106 <br/ >' + 
			'Hours: 10 a.m. - 8 p.m.  <br />' +
			'<a target = "_blank" href="http://www.northernwaterssmokehaus.com/">Website</a>');
			
//bars
		canal 		= L.marker([46.784832, -92.093830], {icon: beverageMarker}).bindPopup		
			('<b>Canal Park Brewing Company </b><br />' + 
			'300 Canal Park Dr <br/ >' + 
			'Hours: 11 a.m. â€“ 11 p.m. <br />' +
			'<a target = "_blank" href="http://www.canalparkbrewery.com/">Website</a><br />' +
			'<img height="150px" width="225px" src="http://res.cloudinary.com/ratebeer/image/upload/d_plac_def.png/plac_35459.jpg"/>');
			
		fitger 		= L.marker([46.792376, -92.090600], {icon: beverageMarker}).bindPopup		
			('<b>Fitgers Brewhouse Brewery </b><br />' + 
			'600 E Superior St <br/ >' + 
			'Hours: 11 a.m. - 1 a.m.</br >' +
			'<a target = "_blank" href="http://brewhouse.net">Website</a><br />' +
			'<img height="150px" width="200px" src="http://media.yellowbot.com/r/650x500/photos/BdH-2Vv1cF_x--/fitgers-brewery-complex-duluth-mn.jpg"/>');


//identify the layer groups
		var cc = L.layerGroup([decc]); //convention center
		var hotels = L.layerGroup([holiday, innlakesup, radisson]); //hotels
		var attractions = L.layerGroup([bridge, tower, rose, estate, visitor, museum, spirit, aqua, zoo]); //attractions
		var establishments = L.layerGroup([grill, waters, canal, fitger]); //establishments (food and drink)

		
        map = new L.Map('map', { 	//set up the map constraints
            layers: [grayscale, cc, hotels, attractions, establishments],
            center: [46.7830,-92.1005],
            zoom: 16,
            zoomControl: false,
            attributionControl: false
            });
        
        var zoomControl = L.control.zoom({
        	  position: "topleft"
        	}).addTo(map);

        var baseMaps = {         //legend: basemaps
        		"Grayscale": grayscale,
        	    "Streets": streets,
        	    "Imagery": satellite
        	};
        
        var overlayMaps = {        //legend: features
        		"<span class='fa-stack fa-lg'><i class='fa fa-square fa-stack-2x' style='color: #406573;'></i><i class='fa fa-suitcase fa-stack-1x' style='color: white;'></i></span>Hotels": hotels,
        		"<span class='fa-stack fa-lg'><i class='fa fa-square fa-stack-2x' style='color: #72AF26;'></i><i class='fa fa-binoculars fa-stack-1x' style='color: white;'></i></span>&nbsp;Attractions": attractions,
        		"<span class='fa-stack fa-lg'><i class='fa fa-square fa-stack-2x' style='color: #EB902E;'></i><i class='fa fa-beer fa-stack-1x' style='color: white;'></i></span>&nbsp;Bars<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class='fa-stack fa-lg'><i class='fa fa-square fa-stack-2x' style='color: #EB902E;'></i><i class='fa fa-cutlery fa-stack-1x' style='color: white;'></i></span>&nbsp;Restaurants": establishments
        };
        

        L.control.layers(baseMaps, overlayMaps).addTo(map);         //add the legend to the map

        // This example uses OpenStreetMap data, fetched from the OverpassAPI,
        // note however that leaflet-indoor does not fetch any data.
        //
        // 1370729 is the OSM ID for the relation of the building used in this
        // example, it can be viewed online here:
        //   http://www.openstreetmap.org/relation/1370729
        var query = '(relation(1370729);>>->.rels;>;);out;';

        $.get("//overpass-api.de/api/interpreter?data=" + query, function(data) {
            var geoJSON = osmtogeojson(data, {
                polygonFeatures: {
                    buildingpart: true
                }
            });

            var indoorLayer = new L.Indoor(geoJSON, {
                getLevel: function(feature) { 
                    if (feature.properties.relations.length === 0)
                        return null;

                    return feature.properties.relations[0].reltags.level;
                },
                onEachFeature: function(feature, layer) {
                    layer.bindPopup(JSON.stringify(feature.properties, null, 4));
                },
                style: function(feature) {
                    var fill = 'white';

                    if (feature.properties.tags.buildingpart === 'corridor') {
                        fill = '#169EC6';
                    } else if (feature.properties.tags.buildingpart === 'verticalpassage') {
                        fill = '#0A485B';
                    }

                    return {
                        fillColor: fill,
                        weight: 1,
                        color: '#666',
                        fillOpacity: 1
                    };
                }
            });

            indoorLayer.setLevel("0");

            indoorLayer.addTo(map);

            var levelControl = new L.Control.Level({
                level: "0",
                levels: indoorLayer.getLevels()
            });

            
            levelControl.addEventListener("levelchange", indoorLayer.setLevel, indoorLayer); 	// Connect the level control to the indoor layer

            levelControl.addTo(map);
        });

        /* Overlay Layers */
        var highlight = L.geoJson(null);

        /*var boroughs = L.geoJson(null, {
          style: function (feature) {
            return {
              color: "black",
              fill: false,
              opacity: 1,
              clickable: false
            };
          },
          onEachFeature: function (feature, layer) {
            boroughSearch.push({
              name: layer.feature.properties.BoroName,
              source: "Boroughs",
              id: L.stamp(layer),
              bounds: layer.getBounds()
            });
          }
        });
        $.getJSON("data/boroughs.geojson", function (data) {
          boroughs.addData(data);
        });*/

        /* Single marker cluster layer to hold all clusters */
        /*var markerClusters = new L.MarkerClusterGroup({
          spiderfyOnMaxZoom: true,
          showCoverageOnHover: false,
          zoomToBoundsOnClick: true,
          disableClusteringAtZoom: 16
        });*/

        /* Empty layer placeholder to add to layer control for listening when to add/remove theaters to markerClusters layer */
        /*var theaterLayer = L.geoJson(null);
        var theaters = L.geoJson(null, {
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
              icon: L.icon({
                iconUrl: "assets/img/theater.png",
                iconSize: [24, 28],
                iconAnchor: [12, 28],
                popupAnchor: [0, -25]
              }),
              title: feature.properties.NAME,
              riseOnHover: true
            });
          },
          onEachFeature: function (feature, layer) {
            if (feature.properties) {
              var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADDRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
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
              $("#feature-list tbody").append('<tr class="feature-row" id="'+L.stamp(layer)+'"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">'+layer.feature.properties.NAME+'</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
              theaterSearch.push({
                name: layer.feature.properties.NAME,
                address: layer.feature.properties.ADDRESS1,
                source: "Theaters",
                id: L.stamp(layer),
                lat: layer.feature.geometry.coordinates[1],
                lng: layer.feature.geometry.coordinates[0]
              });
            }
          }
        });
        $.getJSON("data/DOITT_THEATER_01_13SEPT2010.geojson", function (data) {
          theaters.addData(data);
          map.addLayer(theaterLayer);
        });*/

        /* Empty layer placeholder to add to layer control for listening when to add/remove museums to markerClusters layer
        var museumLayer = L.geoJson(null);
        var museums = L.geoJson(null, {
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
              icon: L.icon({
                iconUrl: "assets/img/museum.png",
                iconSize: [24, 28],
                iconAnchor: [12, 28],
                popupAnchor: [0, -25]
              }),
              title: feature.properties.NAME,
              riseOnHover: true
            });
          },
          onEachFeature: function (feature, layer) {
            if (feature.properties) {
              var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
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
              $("#feature-list tbody").append('<tr class="feature-row" id="'+L.stamp(layer)+'"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">'+layer.feature.properties.NAME+'</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
              museumSearch.push({
                name: layer.feature.properties.NAME,
                address: layer.feature.properties.ADRESS1,
                source: "Museums",
                id: L.stamp(layer),
                lat: layer.feature.geometry.coordinates[1],
                lng: layer.feature.geometry.coordinates[0]
              });
            }
          }
        });
        $.getJSON("data/DOITT_MUSEUM_01_13SEPT2010.geojson", function (data) {
          museums.addData(data);
        });*/

        /* Layer control listeners that allow for a single markerClusters layer */
        /*map.on("overlayadd", function(e) {
          if (e.layer === theaterLayer) {
            markerClusters.addLayer(theaters);
          }
          if (e.layer === museumLayer) {
            markerClusters.addLayer(museums);
          }
        });

        map.on("overlayremove", function(e) {
          if (e.layer === theaterLayer) {
            markerClusters.removeLayer(theaters);
          }
          if (e.layer === museumLayer) {
            markerClusters.removeLayer(museums);
          }
        });*/

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
          div.innerHTML = "<span class='hidden-xs'></span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
          return div;
        };
        map.addControl(attributionControl);

        /* GPS enabled geolocation control set to follow the user's location */
        /*var locateControl = L.control.locate({
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
          icon: "icon-direction",
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
        }).addTo(map);*/

        /* Larger screens get expanded layer control and visible sidebar */
        if (document.body.clientWidth <= 767) {
          var isCollapsed = true;
        } else {
          var isCollapsed = false;
        }

        /* Highlight search box text on click */
        $("#searchbox").click(function () {
          $(this).select();
        });

        /* Typeahead search functionality */
        $(document).one("ajaxStop", function () {
          $("#loading").hide();
          /* Fit map to boroughs bounds */
          //map.fitBounds(boroughs.getBounds());
          featureList = new List("features", {valueNames: ["feature-name"]});
          featureList.sort("feature-name", {order:"asc"});

          var boroughsBH = new Bloodhound({
            name: "Boroughs",
            datumTokenizer: function (d) {
              return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: boroughSearch,
            limit: 10
          });

          var theatersBH = new Bloodhound({
            name: "Theaters",
            datumTokenizer: function (d) {
              return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: theaterSearch,
            limit: 10
          });

          var museumsBH = new Bloodhound({
            name: "Museums",
            datumTokenizer: function (d) {
              return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: museumSearch,
            limit: 10
          });

          var geonamesBH = new Bloodhound({
            name: "GeoNames",
            datumTokenizer: function (d) {
              return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
              url: "http://api.geonames.org/searchJSON?username=mnhealth&featureClass=P&maxRows=5&countryCode=US&adminCode1=MN&name_startsWith=%QUERY",
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
                  $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
                },
                complete: function (jqXHR, status) {
                  $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
                }
              }
            },
            limit: 10
          });
          boroughsBH.initialize();
          theatersBH.initialize();
          museumsBH.initialize();
          geonamesBH.initialize();

          /* instantiate the typeahead UI */
          $("#searchbox").typeahead({
            minLength: 3,
            highlight: true,
            hint: false
          }, {
            name: "Boroughs",
            displayKey: "name",
            source: boroughsBH.ttAdapter(),
            templates: {
              header: "<h4 class='typeahead-header'>Boroughs</h4>"
            }
          }, {
            name: "Theaters",
            displayKey: "name",
            source: theatersBH.ttAdapter(),
            templates: {
              header: "<h4 class='typeahead-header'>&nbsp;Theaters</h4>",
              suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
            }
          }, {
            name: "Museums",
            displayKey: "name",
            source: museumsBH.ttAdapter(),
            templates: {
              header: "<h4 class='typeahead-header'>&nbsp;Museums</h4>",
              suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
            }
          }, {
            name: "GeoNames",
            displayKey: "name",
            source: geonamesBH.ttAdapter(),
            templates: {
              header: "<h4 class='typeahead-header'>&nbsp;GeoNames</h4>"
            }
          }).on("typeahead:selected", function (obj, datum) {
            if (datum.source === "Boroughs") {
              map.fitBounds(datum.bounds);
            }
            if (datum.source === "Theaters") {
              if (!map.hasLayer(theaterLayer)) {
                map.addLayer(theaterLayer);
              }
              map.setView([datum.lat, datum.lng], 17);
              if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
              }
            }
            if (datum.source === "Museums") {
              if (!map.hasLayer(museumLayer)) {
                map.addLayer(museumLayer);
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
