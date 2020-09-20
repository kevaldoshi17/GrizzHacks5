// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");
    cameraStart2 = document.querySelector("#camera--start");



 

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

function myFunction() {
var text1= $('Done').val();
  $.ajax({
              url: "/join",
              type: "POST",
              data: {text1}

          }).done(function(response) {

            var html= "<br><br><br><p> <b> RESULT : <b><p>";

            response =response.result;
                 $.each(response,function(key,val){
                 console.log(val);
                    html+="<p>"+val+"<p>"

                });
                html +="<br>";
                $(".show-data").append(html);
            });
};

// var dataURLToBlob = function(dataURL)
// {
//     var BASE64_MARKER = ";base64,";
//     if (dataURL.indexOf(BASE64_MARKER) == -1)
//     {
//         var parts = dataURL.split(",");
//         var contentType = parts[0].split(":")[1];
//         var raw = decodeURIComponent(parts[1]);

//         return new Blob([raw], {type: contentType});
//     }

//     var parts = dataURL.split(BASE64_MARKER);
//     var contentType = parts[0].split(":")[1];
//     var raw = window.atob(parts[1]);
//     var rawLength = raw.length;

//     var uInt8Array = new Uint8Array(rawLength);

//     for (var i = 0; i < rawLength; ++i) {
//         uInt8Array[i] = raw.charCodeAt(i);
//     }

//     return new Blob([uInt8Array], {type: contentType});
// }

// function dataURItoBlob( dataURI ) {

//     var byteString = atob( dataURI.split( ',' )[ 1 ] );
//     var mimeString = dataURI.split( ',' )[ 0 ].split( ':' )[ 1 ].split( ';' )[ 0 ];
    
//     var buffer  = new ArrayBuffer( byteString.length );
//     var data    = new DataView( buffer );
    
//     for( var i = 0; i < byteString.length; i++ ) {
    
//         data.setUint8( i, byteString.charCodeAt( i ) );
//     }
    
//     return new Blob( [ buffer ], { type: mimeString } );
// }

// Take a picture when cameraTrigger is tapped

function capture(){

    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    var dataURL = cameraSensor.toDataURL("image/png");
    var file = (cameraSensor.toDataURL('image/png'));
    file = file.replace(/^data:image\/(png|jpg);base64,/, "")
    cameraOutput.width = 60;
    cameraOutput.classList.add("taken");

    cameraOutput.src = dataURL;

    window.location.pathname = 'results.html'
    track.stop();


$.ajax({
        type: "POST",
        url: "photo_upload.php",
        data: { 
           imgBase64: dataURL
        }
      }).done(function(response) {
        console.log('saved: ' + response); 
      });


};


function new_pag(){

window.location.href = "www.google.com";


}


cameraTrigger.addEventListener("click",() => {    
     capture();
     speak();
 });    

// Start the video stream when the window loads
//window.addEventListener("load", cameraStart, false);
cameraStart2.addEventListener("click", cameraStart);

// Install ServiceWorker
if ('serviceWorker' in navigator) {
  console.log('CLIENT: service worker registration in progress.');
  navigator.serviceWorker.register( '/camera-app/part-2/sw.js' , { scope : ' ' } ).then(function() {
    console.log('CLIENT: service worker registration complete.');
  }, function() {
    console.log('CLIENT: service worker registration failure.');
  });
} else {
  console.log('CLIENT: service worker is not supported.');
}



function dataURItoBlob( dataURI ) {

    var byteString = atob( dataURI.split( ',' )[ 1 ] );
    var mimeString = dataURI.split( ',' )[ 0 ].split( ':' )[ 1 ].split( ';' )[ 0 ];
    
    var buffer  = new ArrayBuffer( byteString.length );
    var data    = new DataView( buffer );
    
    for( var i = 0; i < byteString.length; i++ ) {
    
        data.setUint8( i, byteString.charCodeAt( i ) );
    }
    
    return new Blob( [ buffer ], { type: mimeString } );
}

function autoType(elementClass, typingSpeed){
  var thhis = $(elementClass);
  thhis.css({
    "position": "relative",
    "display": "inline-block"
  });
  thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
  thhis = thhis.find(".text-js");
  var text = thhis.text().trim().split('');
  var amntOfChars = text.length;
  var newString = "";
  thhis.text("|");
  setTimeout(function(){
    thhis.css("opacity",1);
    thhis.prev().removeAttr("style");
    thhis.text("");
    for(var i = 0; i < amntOfChars; i++){
      (function(i,char){
        setTimeout(function() {        
          newString += char;
          thhis.text(newString);
        },i*typingSpeed);
      })(i+1,text[i]);
    }
  },500);
}

$(document).ready(function(){
  // Now to start autoTyping just call the autoType function with the 
  // class of outer div
  // The second paramter is the speed between each letter is typed.  
  //here's where the KM magic happened, this sample text needs to be replaced with whatever process gets the selected response
  var response = null;
  response = "Dude, Could you be any more sleepy? Like seriously, what's wrong with you?";
  document.getElementById("finalt").innerHTML = response;
  autoType(".type-js",100);
}   );
