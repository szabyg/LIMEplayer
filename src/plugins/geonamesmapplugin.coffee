class window.GeoNamesMapPlugin extends window.LimePlugin
  init: ->
    @name = 'GeoNamesMapPlugin'
    annotation = undefined
    console.info "Initialize GeoNamesMapPlugin"

    for annotation in @lime.annotations
      jQuery(annotation).bind "becomeActive", (e) =>
        annotation = e.target
        if annotation.resource.value.indexOf("geonames") > 0 && annotation.resource.value.indexOf("about.rdf") < 0
          domEl = @lime.allocateWidgetSpace("GeoNamesMapPlugin")
          if domEl

            if annotation.ldLoaded
              domEl.html @renderAnnotation(annotation)
              $(domEl).slideDown 500
            else
              jQuery(annotation).bind "ldloaded", (e) =>
                annotation = e.target
                domEl.html @renderAnnotation(annotation)
                $(domEl).slideDown 500
            # insert widget click function
            domEl.click => #click behaviour - highlight the related widgets by adding a class to them
              @lime.player.pause()
              @displayModal annotation

            annotation.widgets.DBPediaAbstractPlugin = domEl

      jQuery(annotation).bind "becomeInactive", (e) =>
        annotation = e.target
        #console.info(annotation, 'became inactive');
        if annotation.widgets.DBPediaAbstractPlugin
          annotation.widgets.DBPediaAbstractPlugin.find(".utility-icon").attr "src", "img/mapIcon_gr.png"
          annotation.widgets.DBPediaAbstractPlugin.find(".utility-text").css "color", "#c6c4c4"
          return

  renderAnnotation: (annotation) ->

    hasCoord = false

    #var locationName = "";
    queryString = ""

    #	console.log("rendering geonamesAnn: ", annotation);
    #props = annotation.entity[annotation.resource.value];
    #console.log("Propo: "+props);
    try
      if window.XMLHttpRequest # code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest()
      else # code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
      xmlhttp.open "POST", annotation.resource.value + "/about.rdf", false
      xmlhttp.send()
      xmlDoc = xmlhttp.responseXML

      #document.write("<table border='1'>");
      x = xmlDoc.getElementsByTagName("Feature")
      i = 0
      while i < x.length

        #document.write("<tr><td>");
        locationName = x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue

        #document.write("</td><td>");
        latitude = x[i].getElementsByTagName("lat")[0].childNodes[0].nodeValue

        #document.write("</td><td>");
        longitude = x[i].getElementsByTagName("long")[0].childNodes[0].nodeValue
        i++

      #document.write("</td></tr>");
      if latitude isnt "" and longitude isnt "" and locationName isnt ""

        #	console.log("has latitude, longitude and locationName");
        hasCoord = true
        queryString = "http://maps.google.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=9&size=400x300&format=png&maptype=roadmap&markers=color:green|label:x|" + latitude + "," + longitude + "&sensor=false"

    #console.log("hasCoord: " + hasCoord);
    returnResult = "<p> Should be a Map here </p>"
    if hasCoord
      returnResult = """
        <div class="GeoNamesMapWidget">
        <table style="margin:0 auto; width: 100%;">
        <tr>
          <td>
             <b class="utility-text">#{ locationName } Map </b>
           </td>
            <td>
              <img class="utility-icon" src="img/mapIcon.png" style="float: right; width: 25px; height: 25px; " >
            </td>
            </tr>
          </table>
        </div>
        """

    else
      returnResult = " "
    return returnResult;

  showInModalWindow: (outputElement) ->
    output = document.getElementById(outputElement)
    latlng = new google.maps.LatLng(latitude, longitude)

    #	console.log("latitude: " + latitude + " longitude: " + longitude + " = latlong: " + latlng);
    myOptions =
      zoom: 13
      center: latlng
      mapTypeId: google.maps.MapTypeId.ROADMAP

    map = new google.maps.Map(output, myOptions)
    return;

  displayModal: (annotation) -> # Modal window script usin jquery
    # Get Modal Window
    #var modalcontainer;
    if @lime.player.isFullScreen
      modalcontainer = $(".modalwindow")
    else
      modalcontainer = $("#modalWindow")

    # Get mask element
    mask = undefined
    if @lime.player.isFullScreen
      mask = $(".mask")
    else
      mask = $("#mask")
    $(modalcontainer).css "height", "70%"
    $(modalcontainer).css "max-height", "1200px"
    $(modalcontainer).empty()
    $(modalcontainer).append "<a href=\"#\" class=\"close\" role=\"button\"><img src=\"img/close-icon.png\" style=\"width: 22px; height: 22px;\"/></a>"
    $(modalcontainer).append "<div id=\"modalContent\" style=\"height: 95%; width: 100%; position: relative; margin: 0 auto; \"> &nbsp"

    #	$(modalcontainer).append("<div id=\"mapLabel\" style=\"width: inherit; height: 25%; font-family:verdana; font-size:14px; /media/EXPRESSGATE/MyWorks/For_Seekda/TV Emulator/Dev/ConnectMe_1.2/img/sport.pngkground-image: -ms-linear-gradient(bottom, rgb(33,26,20) 32%, rgb(69,61,55) 66%, rgb(28,22,21) 15%); background-image: -webkit-gradient(	linear,	left bottom, left top, color-stop(0.32, rgb(33,26,20)), color-stop(0.66, rgb(69,61,55)), color-stop(0.15, rgb(28,22,21))); color: white\"> " + "<table> <tr> <td> <img src=\"img/mapIcon.png\" style=\"width: 40px; height: 40px;\" ></td><td><em style=\"font-size:18px; color: white;\">" + locationName + "</em></td></tr></table>" + "&nbsp;&nbsp;  lat: " + latitude + "; long: " + longitude + "</div>");
    $(modalcontainer).append "</div>"

    #	console.log("$(modalcontainer) = " + $(modalcontainer).html() + " modalcontainer " + modalcontainer.html());

    #Get the screen height and width
    maskHeight = $(window).height()
    maskWidth = $(window).width()

    #Set heigth and width to mask to fill up the whole screen
    $(mask).css
      width: maskWidth
      height: maskHeight


    #transition effect
    $(mask).fadeIn 100
    $(mask).fadeTo "fast", 0.8

    #Get the window height and width
    winH = $(window).height()
    winW = $(window).width()

    #Set the popup window to center
    $(modalcontainer).css "top", winH / 2 - $(modalcontainer).height() / 2
    $(modalcontainer).css "left", winW / 2 - $(modalcontainer).width() / 2

    #transition effect
    $(modalcontainer).fadeIn 100

    #if close button is clicked
    $(".close").click (e) =>

      #Cancel the link behavior
      e.preventDefault()
      $(mask).hide()
      $(modalcontainer).hide()


    #if mask is clicked
    $(mask).click (e) =>
      $(this).hide()
      $(modalcontainer).hide()
      return;

    $(window).resize(e) =>

      #var box = modalcontainer;

      #Get the screen height and width
      maskHeight = $(document).height()
      maskWidth = $(document).width()

      #Set height and width to mask to fill up the whole screen
      $(mask).css
        width: maskWidth
        height: maskHeight


      #Get the window height and width
      winH = $(window).height()
      winW = $(window).width()

      #Set the popup window to center
      $(modalcontainer).css "top", winH / 2 - $(modalcontainer).height() / 2
      $(modalcontainer).css "left", winW / 2 - $(modalcontainer).width() / 2
      return;


    #box.blur(function() { setTimeout(<bluraction>, 100); });
    @showInModalWindow "modalContent"

  #$(modalcontainer).css('height', "70%");
