2016 MN GIS/LIS Conference Map  
==============

Contribute to the official [26th Annual Conference Map](http://geospatialem.github.io/conference-map) held in Duluth, Minnesota this October! Enhanced functionality and new places welcome!  

The map includes:  
* The conference host site  
* Hotels with conference rates  
* The 5k fun run/walk route  
* Establishments to get cuisine and/or order #geobeers  
* Area attractions  

## Future Enhancements  

*  **_In progress:_** Organize locations for future conferences using a folder structure (e.g. Bemidji, Duluth, Rochester, St. Cloud, etc.).   This includes conference site, establishments, and JavaScript.
* **_In progress:_** Simplify the scheduling for improvements and maintenance.  
* **_In progress:_** Code refactoring for future maintenance.  

## Framework and Libraries  
* <a href="https://github.com/bmcbride/bootleaf">Bootleaf</a>, a compilation of the <a href="https://github.com/twbs/bootstrap">Bootstrap</a> and <a href="https://github.com/Leaflet/Leaflet/">Leaflet</a> libraries.  
* <a href="https://github.com/lvoogdt/Leaflet.awesome-markers">Leaflet.awesome-markers</a>; a colorful iconic & retina-proof markers for Leaflet, based on the Glyphicons / Font-Awesome icons.  
* [Leaflet.AlmostOver](https://github.com/makinacorpus/Leaflet.AlmostOver) plugin, allowing the detection of mouse click and overing events on lines, with a tolerance distance. It is useful if paths are drawn with a very small weight, or for clicks detection on mobile devices, for which finger precision can be a problem.  

## Changing Cities  
To change cities, edit the last script reference in index.html by changing the `city` value, like so:

### Duluth  
```javascript
<script src="assets/js/app.js" id="conference-city" city="duluth"></script>
```

### Bemidji  
```javascript
<script src="assets/js/app.js" id="conference-city" city="bemidji"></script>
```

Additional instructions coming soon.

## Sharing the Map (on the Consortium's website)  
To embed the map on a page add in the following HTML content to the page:  

```html
<iframe src="http://geospatialem.github.io/conference-map" frameborder="0" width="600" height="400"></iframe>   
```
