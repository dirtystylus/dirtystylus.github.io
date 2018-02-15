/*
*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

'use strict';

var videoElement = document.querySelector('video');
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

start();

function successCallback(stream) {
  window.stream = stream; // stream available to console
  videoElement.srcObject = stream;
  navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}