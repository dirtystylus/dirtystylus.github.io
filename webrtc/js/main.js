/*
*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

'use strict';

var videoElement = document.querySelector('#video-feed');
var consoleOutput = document.querySelector('#console-output');

function gotDevices(deviceInfos) {
  for (var i = 0; i !== deviceInfos.length; ++i) {
    var deviceInfo = deviceInfos[i];
    console.log('deviceInfo: ' + deviceInfo.deviceId + ' label: ' + deviceInfo.label);
    consoleOutput.innerHTML += 'deviceInfo: ' + deviceInfo.deviceId + ' label: ' + deviceInfo.label + '<br>';
  }
}

function start() {
    var constraints = {
      audio: false,
      video: {facingMode: "environment"}
    };
  navigator.getUserMedia(constraints, successCallback, handleError);
}



function successCallback(stream) {
  window.stream = stream; // stream available to console
  videoElement.srcObject = stream;
  navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

start();

function toggleImageOverlay() {
  console.log('hello');
  const imageOverlay = document.querySelector('.image-overlay');
  imageOverlay.style.display === 'block' ? imageOverlay.style.display = 'none' : imageOverlay.style.display = 'block';
}

function toggleVideoOverlay() {
  const videoOverlay = document.querySelector('#video-overlay');
  // videoOverlay.style.display === 'block' ? videoOverlay.style.display = 'none' : videoOverlay.style.display = 'block';
  videoOverlay.play();
}

// const overlayToggleButton = document.querySelector('.image-overlay-toggle');
// overlayToggleButton.addEventListener('click', toggleImageOverlay);

const videoOverlayToggleButton = document.querySelector('.video-overlay-toggle');
videoOverlayToggleButton.addEventListener('click', toggleVideoOverlay);
