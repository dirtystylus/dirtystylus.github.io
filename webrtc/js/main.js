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
var deviceId;

audioOutputSelect.disabled = !('sinkId' in HTMLMediaElement.prototype);

function gotDevices(deviceInfos) {
  console.log('hello');
  // Handles being called several times to update labels. Preserve values.
  var values = selectors.map(function(select) {
    return select.value;
  });
  for (var i = 0; i !== deviceInfos.length; ++i) {
    var deviceInfo = deviceInfos[i];
    console.log('deviceInfo: ' + deviceInfo.label);
    if (deviceInfo.kind === 'videoinput' && deviceInfo.label === 'Back Camera') {
      start(deviceInfo.deviceId);
    } else {
      // console.log('no rear video');
      // start();
    }
  }
}


function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}

function start(p_deviceId) {
  if (p_deviceId) {
    var constraints = {
      audio: false,
      video: {deviceId: p_deviceId}
    };
  } else {
    var constraints = {
      audio: false,
      video: true
    };
  }
  
  // var constraints = {
  //   audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
  //   video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  // };
  // navigator.mediaDevices.getUserMedia(constraints).
      // then(gotStream).then(gotDevices).catch(handleError);
  navigator.getUserMedia(constraints, successCallback, errorCallback);
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
// start();

function successCallback(stream) {
  console.log('success!');
  window.stream = stream; // stream available to console
  video.srcObject = stream;
}

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}