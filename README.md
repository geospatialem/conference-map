2015 MN GIS/LIS Conference Map
==============

Contribute to the official [25th Annual Conference Map](http://geospatialem.github.io/conference-map) held in Duluth, Minnesota this October! Enhanced functionality and new places welcome! 

The map includes: The Duluth Entertainment Convention Center (DECC), Hotels with conference rates, 5k fun run/walk route, Establishments to get cuisine, Establishments to order #geobeers, Attractions around Duluth, and much more!

1. Utilizes the <a href="https://github.com/bmcbride/bootleaf">Bootleaf</a> template, a compilation of the <a href="https://github.com/twbs/bootstrap">Bootstrap</a> and <a href="https://github.com/Leaflet/Leaflet/">Leaflet</a> libraries.

2. Uses <a href="https://github.com/lvoogdt/Leaflet.awesome-markers">Leaflet.awesome-markers</a>; colorful iconic & retina-proof markers for Leaflet, based on the Glyphicons / Font-Awesome icons.

3. Uses the [Leaflet.GeometryUtil](https://github.com/makinacorpus/Leaflet.GeometryUtil) and [Leaflet.AlmostOver](https://github.com/makinacorpus/Leaflet.AlmostOver) plugins, allowing the detection of mouse click and overing events on lines, with a tolerance distance. It is useful if paths are drawn with a very small weight, or for clicks detection on mobile devices, for which finger precision can be a problem.


## Future Enhancements

- More effective [Leaflet.AlmostOver](https://github.com/makinacorpus/Leaflet.AlmostOver) mobile support to ensure mobile device experience is the same as desktop browsers.

- An indoor map of the DECC using the [Leaflet-indoor](https://github.com/cbaines/leaflet-indoor) plugin to provide a layer intended for displaying indoor data (rooms, corridors, etc.) with an accompanying control component to change the floor level displayed.

## Embedding the Map
To embed the map on a page add in the following HTML content to the page:

```html 
<iframe src="http://geospatialem.github.io/conference-map" frameborder="0" width="600" height="400"></iframe>   
```
