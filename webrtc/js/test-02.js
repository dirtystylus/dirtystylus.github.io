/*
*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

'use strict';

var videoElement = document.querySelector('video');
var audioInputSelect = document.querySelector('select#audioSource');
var audioOutputSelect = document.querySelector('select#audioOutput');
var videoSelect = document.querySelector('select#videoSource');
var selectors = [audioInputSelect, audioOutputSelect, videoSelect];
var consoleOutput = document.querySelector('#console-output');
var deviceMeta;

audioOutputSelect.disabled = !('sinkId' in HTMLMediaElement.prototype);

function gotDevices(deviceInfos) {
  for (var i = 0; i !== deviceInfos.length; ++i) {
    var deviceInfo = deviceInfos[i];
    deviceMeta = deviceInfo;
    console.log('deviceInfo: ' + deviceInfo.deviceId + ' label: ' + deviceInfo.label);
    consoleOutput.innerHTML += 'deviceInfo: ' + deviceInfo.deviceId + ' label: ' + deviceInfo.label + '<br>';

    // if (deviceInfo.label === 'Back Camera') {
    //   console.log('back camera!');
    //   var constraints = {
    //     audio: false,
    //     video: {deviceId: deviceInfo.deviceId}
    //   };

    //   navigator.getUserMedia(constraints, camSwitchCallback, errorCallback);
    //   return;
    // }
  }
}


function gotDeviceInfo(deviceInfos) {
  var cameraCount = 0;
  for (var i = 0; i !== deviceInfos.length; ++i) {
    var deviceInfo = deviceInfos[i];
    deviceMeta = deviceInfo;
    console.log('deviceInfo: ' + deviceInfo.deviceId);
    consoleOutput.innerHTML += 'deviceInfo: ' + deviceInfo.deviceId + ' label: ' + deviceInfo.label + '<br>';
  }
}

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}

function start() {
    var constraints = {
      audio: false,
      video: {facingMode: "environment"}
    };

  
  // var constraints = {
  //   audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
  //   video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  // };
  // navigator.mediaDevices.getUserMedia(constraints).
      // then(gotStream).then(gotDevices).catch(handleError);
  navigator.getUserMedia(constraints, successCallback, errorCallback);
}

// navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
start();

function successCallback(stream) {
  window.stream = stream; // stream available to console
  videoElement.srcObject = stream;
  navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
}

function camSwitchCallback(stream) {
  window.stream = stream; // stream available to console
  videoElement.srcObject = stream;
  // navigator.mediaDevices.enumerateDevices().then(gotDeviceInfo).catch(handleError);
}

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}