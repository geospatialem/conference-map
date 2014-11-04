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
			'Hours: 11 a.m. – 11 p.m. <br />' +
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
            zoom: 16
            });

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
