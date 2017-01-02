MN GIS/LIS Conference Map  
==============

Contribute to the official [27th Annual Conference Map](//geospatialem.github.io/conference-map) held in Bemidji, Minnesota this October!  

The map includes:  
* The conference host site  
* Hotels (including hotels with conference rates)  
* The 5k fun run/walk route  
* Establishments to get cuisine and/or order #geobeers :beer:  
* Area attractions  

## Frameworks/Libraries  
* [Bootleaf](//github.com/bmcbride/bootleaf), a compilation of the [Bootstrap](//github.com/twbs/bootstrap) and [Leaflet](//github.com/Leaflet/Leaflet) libraries.  
* [Leaflet.awesome-markers](//github.com/lvoogdt/Leaflet.awesome-markers); a colorful iconic & retina-proof markers for Leaflet, based on the Glyphicons / Font-Awesome icons.  
* [Leaflet.AlmostOver](//github.com/makinacorpus/Leaflet.AlmostOver) plugin, allowing the detection of mouse click and overing events on lines, with a tolerance distance. It is useful if paths are drawn with a very small weight, or for clicks detection on mobile devices, for which finger precision can be a problem.  

## Conference location  
The conference moves around the state of Minnesota, and has previously been located in Bemidji, Duluth, Rochester, St. Cloud, and St. Paul.

To accommodate the location changes annually while maintaining content for future years, each city has its own folder within the `data` folder (e.g. `data/duluth`).  

### Required files  
When adding a new city, the following are required within the data folder:   
* data/site/Layout.json  
* data/attractions.geojson  
* data/establishments.geojson    
* data/events.geojson  
* data/funRoute.geojson  
* data/hotels.geojson  

### Changing cities  
To change the view of cities within the webpage, edit the second to last script reference (app.js) in index.html by changing the `city` value:  

#### Bemidji  
```javascript
<script src="assets/js/app.js" id="conference-city" city="bemidji"></script>  
```  

#### Duluth  
```javascript
<script src="assets/js/app.js" id="conference-city" city="duluth"></script>  
```  

### Related city-based files  
In addition to the data folder, content and functionality will be generated based on the selected city within the `assets/js/app.js` and `assets/js/content.js` files.

Content in app.js pertains to JavaScript-specific content, and content.js contains HTML-generated content (using JavaScript).    

If the developer changes the `city` value in the index.html file, that is the city that is generating the content in the JavaScript files.  

For example:     
```javascript  
/* City-Specific JavaScript Content  */
if (conferenceCity == "bemidji") {
  //Bemidji-specific javascript content
} else if (conferenceCity == "duluth") {
  //Duluth-specific javascript content
}
```  

## Sharing the map (on the Consortium's website)  
To embed the map on a page add in the following HTML content to the page:  

```html
<iframe src="//geospatialem.github.io/conference-map" frameborder="0" width="600" height="400"></iframe>   
```  

## Future enhancements  
Pull requests of any kind are welcome, including enhanced functionality and new places! No request is too small!  

## Tasks in progress  
* Simplify the conference schedule modal for improvements and future maintenance.  
* Code refactoring for future maintenance.  
