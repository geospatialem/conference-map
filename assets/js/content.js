/* Purpose: City-specific HTML dynamically added text */

/* List items */
var fullExtentListItem = "";
var conferenceExtentListItem = "";

if (conferenceCity == "bemidji") {
    fullExtentListItem += "<i class=\"fa fa-arrows-alt\" aria-hidden=\"true\"><\/i>&nbsp;&nbsp;Zoom to Bemidji";
    conferenceExtentListItem += "<i class=\"fa fa-search\" aria-hidden=\"true\"><\/i><\/i>&nbsp;&nbsp;Zoom to Sanford Center";

} else if (conferenceCity == "duluth") {
  fullExtentListItem += "<i class=\"fa fa-arrows-alt\" aria-hidden=\"true\"><\/i>&nbsp;&nbsp;Zoom to Duluth";
  conferenceExtentListItem += "<i class=\"fa fa-search\" aria-hidden=\"true\"><\/i><\/i>&nbsp;&nbsp;Zoom to DECC";

} else {
    fullExtentListItem += "<i class=\"fa fa-arrows-alt\" aria-hidden=\"true\"><\/i>&nbsp;&nbsp;Zoom to City";
    conferenceExtentListItem += "<i class=\"fa fa-search\" aria-hidden=\"true\"><\/i><\/i>&nbsp;&nbsp;Zoom to Conference City";
    console.log("Add '" + conferenceCity + "' to the fullExtentListItem & conferenceExtentListItem js/content.js file.");
}

$('#full-extent-btn').html(fullExtentListItem); //Link the content to the div
$('#conference-extent-btn').html(conferenceExtentListItem); //Link the content to the div

/* About the Conference Dialog Text */
var aboutConferenceText = "";

    //TODO: Change annually
    aboutConferenceText += "<p>The official conference map for the 28th Annual Minnesota GIS\/LIS Conference held Wednesday, October 3rd through Friday, October 5th, 2018 in Duluth.<\/p>";
    aboutConferenceText += "<p>What is the conference schedule? What workshops and sessions are offered? Where are the rooms? Where can one grab dinner or a #geobeer? What other great things can you do while visiting? All of these questions, and more can be answered in one place!<\/p>";
    aboutConferenceText += "<p>For more information, please visit the official <a href=\"https:\/\/www.mngislis.org\/page\/Conference_2018\" target=\"_blank\"> Minnesota GIS\/LIS Conference website (new window) <i class=\"fa fa-external-link-square\" aria-hidden=\"true\"><\/i><\/a>.<\/p>";

    aboutConferenceText += "<div class=\"panel panel-primary\">";
    aboutConferenceText += "<div class=\"panel-heading\">Additional Information:<\/div>";
    aboutConferenceText += "<ul class=\"list-group\">";
    aboutConferenceText += "<li class=\"list-group-item\">Join the conversation on social media! We'll be tweeting live at <a href=\"\/\/twitter.com\/mngislis\">@MNGISLIS<\/a> using <a href=\"\/\/twitter.com\/hashtag\/mngislis?f=tweets&vertical=default\">#mngislis<\/a>.<\/li>";

    if (conferenceCity == "bemidji") {
        aboutConferenceText += "<li class=\"list-group-item\">View <a href=\"\/\/www.mngislis.org\/resource\/resmgr\/Docs\/2016_Rates.pdf\" target=\"_blank\">last year's conference rates (new window) <i class=\"fa fa-external-link-square\" aria-hidden=\"true\"><\/i><\/a><\/li>";
        /* TODO: Open registration */
        aboutConferenceText += "<!--<li class=\"list-group-item\">Ready to go? <a href=\"\/\/www.mngislis.org\/event\/26th_Annual_Conference\" target=\"_blank\">Register for the annual conference! (new window) <i class=\"fa fa-external-link-square\" aria-hidden=\"true\"><\/i><\/a> <\/li>-->";
        aboutConferenceText += "<li class=\"list-group-item\">View the official <a href=\"docs\/2017_FunRunMap.pdf\" download=\"2017_FunRunMap.pdf\" target=\"_blank\">5k Fun Run\/Walk Map (download) <i class=\"fa fa-download\" aria-hidden=\"true\"><\/i><\/a> (PDF).<\/li>";
        aboutConferenceText += "<li class=\"list-group-item\">Check out <a href=\"\/\/c.ymcdn.com\/sites\/www.mngislis.org\/resource\/resmgr\/conf2016\/mngislis-onsite-2016.pdf\" target=\"_blank\">last year's on-site program! (new window) <i class=\"fa fa-external-link-square\" aria-hidden=\"true\"><\/i><\/a> <\/li>";

    } else if (conferenceCity == "duluth") {
      aboutConferenceText += "<li class=\"list-group-item\">View the <a href=\"\/\/www.mngislis.org\/page\/2018_conf_rates\" target=\"_blank\">2018 conference rates (new window) <i class=\"fa fa-external-link-square\" aria-hidden=\"true\"><\/i><\/a><\/li>";
      /* TODO: Open registration */
      aboutConferenceText += "<!--<li class=\"list-group-item\">Ready to go? <a href=\"\/\/www.mngislis.org\/event\/26th_Annual_Conference\" target=\"_blank\">Register for the annual conference! (new window) <i class=\"fa fa-external-link-square\" aria-hidden=\"true\"><\/i><\/a> <\/li>-->";
      aboutConferenceText += "<li class=\"list-group-item\">View the official <a href=\"docs\/2018_FunRunMap.pdf\" download=\"2018_FunRunMap.pdf\" target=\"_blank\">5k Fun Run\/Walk Map (download) <i class=\"fa fa-download\" aria-hidden=\"true\"><\/i><\/a> (PDF).<\/li>";
      //aboutConferenceText += "<li class=\"list-group-item\">Check out our <a href=\"\/\/c.ymcdn.com\/sites\/www.mngislis.org\/resource\/resmgr\/conf2016\/mngislis_preliminary_program.pdf\" target=\"_blank\">preliminary program! (new window) <i class=\"fa fa-external-link-square\" aria-hidden=\"true\"><\/i><\/a> <\/li>";

    } else { console.log("Add '" + conferenceCity + "' to the aboutConferenceText js/content.js file."); }

    aboutConferenceText += "<\/ul>";
    aboutConferenceText += "<\/div>";

$('#about').html(aboutConferenceText); //Link the content to the div



/* Schedule Modal Dialog */
//TODO: Use JSON to bring in content
var scheduleModalDialogText = "";

    //TODO: Change annually
    scheduleModalDialogText += "<ul class=\"nav nav-tabs nav nav-justified\" id=\"scheduleTabs\">";
    scheduleModalDialogText += "<li class=\"active\"><a href=\"#tuesday\" data-toggle=\"tab\">Tuesday, Oct. 2<\/a><\/li>";
    scheduleModalDialogText += "<li><a href=\"#wednesday\" data-toggle=\"tab\">Wednesday, Oct. 3<\/a><\/li>";
    scheduleModalDialogText += "<li><a href=\"#thursday\" data-toggle=\"tab\">Thursday, Oct. 4<\/a><\/li>";
    scheduleModalDialogText += "<li><a href=\"#friday\" data-toggle=\"tab\">Friday, Oct. 5<\/a><\/li>";
    scheduleModalDialogText += "<\/ul>";
    scheduleModalDialogText += "<div class=\"tab-content\" id=\"aboutTabsContent\">";

    if (conferenceCity == "bemidji") {

      //Tuesday
      scheduleModalDialogText += "<div class=\"tab-pane fade active in\" id=\"tuesday\">";
      scheduleModalDialogText += "<table class=\"table table-striped table-bordered table-condensed\">";
      scheduleModalDialogText += "<tr><th scope=\"col\">Time<\/th><th scope=\"col\">Activity<\/th><th scope=\"col\">Location<\/th><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">7:00 pm - 9:30 pm<\/th><td>Tuesday Night Social Event<\/td><td>Bemidji Brewing<\/td><\/tr>";
      scheduleModalDialogText += "<\/table>";
      scheduleModalDialogText += "<\/div>";
      //Wednesday
      scheduleModalDialogText += "<div id=\"wednesday\" class=\"tab-pane fade\">";
      scheduleModalDialogText += "<table class=\"table table-striped table-bordered table-condensed\">";
      scheduleModalDialogText += "<tr><th scope=\"col\">Time<\/th><th scope=\"col\">Activity<\/th><th scope=\"col\">Location<\/th><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">7:30 am - 5:00 pm<\/th><td>Registration<\/td><td>Registration Desk<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">9:00 am - 12:15 pm<\/th><td>Morning Workshops<\/td><td>Sanford Center Rooms<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">12:15 pm - 1:15 pm<\/th><td>Opening Keynote &amp; Luncheon&#58; Kyle Tredinnick &#40;Omaha Public Schools&#41;<\/td><td>Ballroom<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">1:15 pm - 4:30 pm<\/th><td>Afternoon Workshops<\/td><td>Sanford Center Rooms<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">2:00 pm - 5:00 pm<\/th><td>Exhibit Hall &amp; Geolounge Open<\/td><td>Exhibit Hall\/Geolounge<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">7:00 pm - 9:30 pm<\/th><td>Wednesday Welcome Reception<\/td><td>Hampton Inn Ballroom<\/td><\/tr>";
      scheduleModalDialogText += "<\/table>";
      scheduleModalDialogText += "<\/div>";
      //Thursday
      scheduleModalDialogText += "<div id=\"thursday\" class=\"tab-pane fade\">";
      scheduleModalDialogText += "<table class=\"table table-striped table-bordered table-condensed\">";
      scheduleModalDialogText += "<tr><th scope=\"col\">Time<\/th><th scope=\"col\">Activity<\/th><th scope=\"col\">Location<\/th><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">7:30 am - 5:00 pm<\/th><td>Registration<\/td><td>Registration Desk<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">7:00 am - 7:00 pm<\/th><td>Exhibit Hall &amp; Geolounge Open<\/td><td>Exhibit Hall\/Geolounge<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">8:00 am - 10:00 am<\/th><td>Conference Welcome &amp; Keynote&#58; The Great River Road, Mississippi River Parkway Commission<\/td><td>Ballroom<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">10:30 am - 12:00 pm<\/th><td>Conference Sessions<\/td><td>Sanford Center Rooms<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">12:00 pm - 1:00 pm<\/th><td>Awards Luncheon<\/td><td>Ballroom<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">1:30 pm - 3:00 pm<\/th><td>Conference Sessions<\/td><td>Sanford Center Rooms<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">3:30 pm - 5:00 pm<\/th><td>Conference Sessions<\/td><td>Sanford Center Rooms<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">5:00 pm - 7:00 pm<\/th><td>Vendor Reception<\/td><td>Exhibit Hall<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">7:00 pm - 10:00 pm<\/th><td>Thursday Night Social Event<\/td><td>Hampton Inn Ballroom<\/td><\/tr>";
      scheduleModalDialogText += "<\/table>";
      scheduleModalDialogText += "<\/div>";
      //Friday
      scheduleModalDialogText += "<div id=\"friday\" class=\"tab-pane fade\">";
      scheduleModalDialogText += "<table class=\"table table-striped table-bordered table-condensed\">";
      scheduleModalDialogText += "<tr><th scope=\"col\">Time<\/th><th scope=\"col\">Activity<\/th><th scope=\"col\">Location<\/th><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">6:15 am - 7:15 am<\/th><td>5k Fun Run\/Walk<\/td><td>Sanford Center Main Entrance<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">7:30 am - 10:00 am<\/th><td>Registration<\/td><td>Registration Desk<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">8:00 am - 12:00 pm<\/th><td>Exhibit Hall &amp; Geolounge Open<\/td><td>Exhibit Hall\/Geolounge<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">8:30 am - 10:00 am<\/th><td>Conference Sessions<\/td><td>Sanford Center Rooms<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">10:30 pm - 12:00 pm<\/th><td>Conference Sessions<\/td><td>Sanford Center Rooms<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">12:00 pm - 2:30 pm<\/th><td>Closing Keynote &amp; Luncheon&#58; The History of the Leech Lake-Red Lake Trail, Beltrami County Historical Society Representatives<\/td><td>Ballroom<\/td><\/tr>";
      scheduleModalDialogText += "<\/table>";
      scheduleModalDialogText += "<\/div>";

    } else if (conferenceCity == "duluth") {
      //Tuesday
      scheduleModalDialogText += "<div class=\"tab-pane fade active in\" id=\"tuesday\">";
      scheduleModalDialogText += "<table class=\"table table-striped table-bordered table-condensed\">";
      scheduleModalDialogText += "<tr><th scope=\"col\">Time<\/th><th scope=\"col\">Activity<\/th><th scope=\"col\">Location<\/th><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">7:00 pm - 9:30 pm<\/th><td>Tuesday Night Social Event<\/td><td>Hoops Brewing Company<\/td><\/tr>";
      scheduleModalDialogText += "<\/table>";
      scheduleModalDialogText += "<\/div>";
      //Wednesday
      scheduleModalDialogText += "<div id=\"wednesday\" class=\"tab-pane fade\">";
      scheduleModalDialogText += "<table class=\"table table-striped table-bordered table-condensed\">";
      scheduleModalDialogText += "<tr><th scope=\"col\">Time<\/th><th scope=\"col\">Activity<\/th><th scope=\"col\">Location<\/th><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">7:30 am - 5:00 pm<\/th><td>Registration<\/td><td>Registration Desk<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">9:00 am - 12:15 pm<\/th><td>Morning Workshops<\/td><td>DECC Rooms<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">12:15 pm - 1:15 pm<\/th><td>Opening Keynote Matthew Winbigler &amp; Luncheon<\/td><td>Harbor Ballroom<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">1:15 pm - 4:30 pm<\/th><td>Afternoon Workshops<\/td><td>DECC Rooms<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">2:00 pm - 5:00 pm<\/th><td>Exhibit Hall &amp; Geolounge Open<\/td><td>Exhibit Hall\/Geolounge<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">4:00 pm - 7:00 pm<\/th><td>Wednesday Evening Social<\/td><td>Geolounge<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">7:00 pm - 10:00 pm<\/th><td>Wednesday Evening Social Continued &#40;hosted by NSGIC&#41;<\/td><td>Great Lakes Aquarium<\/td><\/tr>";
      scheduleModalDialogText += "<\/table>";
      scheduleModalDialogText += "<\/div>";
      //Thursday
      scheduleModalDialogText += "<div id=\"thursday\" class=\"tab-pane fade\">";
      scheduleModalDialogText += "<table class=\"table table-striped table-bordered table-condensed\">";
      scheduleModalDialogText += "<tr><th scope=\"col\">Time<\/th><th scope=\"col\">Activity<\/th><th scope=\"col\">Location<\/th><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">7:30 am - 5:00 pm<\/th><td>Registration<\/td><td>Registration Desk<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">7:00 am - 7:00 pm<\/th><td>Exhibit Hall &amp; Geolounge Open<\/td><td>Exhibit Hall\/Geolounge<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">8:00 am - 10:00 am<\/th><td>Conference Welcome &amp; Keynote Caroline Torkildson<\/td><td>Harbor Ballroom<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">10:30 am - 12:00 pm<\/th><td>Conference Sessions<\/td><td>DECC Rooms<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">12:00 pm - 1:00 pm<\/th><td>Awards Luncheon<\/td><td>Harbor Ballroom<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">1:30 pm - 3:00 pm<\/th><td>Conference Sessions<\/td><td>DECC Rooms<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">3:30 pm - 5:00 pm<\/th><td>Conference Sessions<\/td><td>DECC Rooms<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">5:00 pm - 7:00 pm<\/th><td>Vendor Reception<\/td><td>Exhibit Hall<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">7:00 pm - 10:00 pm<\/th><td>Thursday Night Social Event<\/td><td>Grandmas Sports Garden<\/td><\/tr>";
      scheduleModalDialogText += "<\/table>";
      scheduleModalDialogText += "<\/div>";
      //Friday
      scheduleModalDialogText += "<div id=\"friday\" class=\"tab-pane fade\">";
      scheduleModalDialogText += "<table class=\"table table-striped table-bordered table-condensed\">";
      scheduleModalDialogText += "<tr><th scope=\"col\">Time<\/th><th scope=\"col\">Activity<\/th><th scope=\"col\">Location<\/th><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">6:15 am - 7:15 am<\/th><td>5k Fun Run\/Walk<\/td><td>Canal Park Lodge Parking Lot<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">7:30 am - 10:00 am<\/th><td>Registration<\/td><td>Registration Desk<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">8:00 am - 12:00 pm<\/th><td>Exhibit Hall &amp; Geolounge Open<\/td><td>Exhibit Hall\/Geolounge<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">8:30 am - 10:00 am<\/th><td>Conference Sessions<\/td><td>DECC Rooms<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">10:30 pm - 12:00 pm<\/th><td>Conference Sessions<\/td><td>DECC Rooms<\/td><\/tr>";
      scheduleModalDialogText += "<tr><th scope=\"row\">12:00 pm - 2:30 pm<\/th><td>Closing Keynote Sam Cook &amp; Luncheon<\/td><td>Harbor Ballroom<\/td><\/tr>";
      scheduleModalDialogText += "<\/table>";
      scheduleModalDialogText += "<\/div>";

    } else { console.log("Add '" + conferenceCity + "' to the scheduleModalDialogText js/content.js file."); }

    scheduleModalDialogText += "<\/div>";


$('#scheduleText').html(scheduleModalDialogText); //Link the content to the div

/* Attribution Dialog Text */
var attributionDialogText = "";
    attributionDialogText += "<div class=\"modal-dialog\">";
    attributionDialogText += "<div class=\"modal-content\">";
    attributionDialogText += "<div class=\"modal-header\">";
    attributionDialogText += "<button class=\"close\" type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;<\/button>";
    attributionDialogText += "<h2 class=\"modal-title\">Map Attribution<\/h2>";
    attributionDialogText += "<\/div>";
    attributionDialogText += "<div class=\"modal-body\">";
    attributionDialogText += "<ul>";
    attributionDialogText += "<li>Basemap tiles 2018 &copy; <a href=\"\/\/developer.mapquest.com\" target=\"_blank\">Mapquest<\/a>, <a href=\"\/\/mapbox.com\" target=\"_blank\">Mapbox<\/a>, <a href=\"\/\/tomtom.com\" target=\"_blank\">TomTom<\/a>.<\/li>";
    attributionDialogText += "<li>Bootleaf Template Developed by <a target=\"_blank\" href=\"\/\/bryanmcbride.com\">Bryan McBride<\/a><\/li>";
    attributionDialogText += "<li>Map Content and Design by <a target=\"_blank\" href=\"\/\/geospatialem.github.io\">Kitty Hurley<\/a><\/li>";
    attributionDialogText += "<li>5k Fun Run\/Walk Route Coordination and Map Design by Geoff Maas<\/li>";
    if (conferenceCity == "duluth") { attributionDialogText += "<li>DECC Ground and Skyway Level Design by Mike Dolbow<\/li>"; }
    attributionDialogText += "<li>Nearest Hotel Pub Analysis and Design by Andy Walz<\/li>";
    attributionDialogText += "<\/div>";
    attributionDialogText += "<\/div>";
    attributionDialogText += "<\/div>";

$('#attributionModal').html(attributionDialogText); //Link the content to the div
