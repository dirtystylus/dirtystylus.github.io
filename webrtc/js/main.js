'use strict';

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {
  audio: false,
  video: true
};

var video = document.querySelector('video');
var consoleOutput = document.querySelector('.console-output');

function successCallback(stream) {
  window.stream = stream; // stream available to console
  video.srcObject = stream;
}

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.mediaDevices.enumerateDevices()
.then(function(devices) {
  devices.forEach(function(device) {
    console.log(device.kind + ": " + device.label +
                " id = " + device.deviceId);
    consoleOutput.innerHTML += device.kind + ": " + device.label +
    " id = " + device.deviceId + "<br>";
    
  });
})
.catch(function(err) {
  console.log(err.name + ": " + err.message);
});
navigator.getUserMedia(constraints, successCallback, errorCallback);
