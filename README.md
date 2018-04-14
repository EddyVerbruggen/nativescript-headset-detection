# NativeScript Headset Detection plugin

[![Build Status][build-status]][build-url]
[![NPM version][npm-image]][npm-url]
[![Twitter Follow][twitter-image]][twitter-url]

[build-status]:https://travis-ci.org/EddyVerbruggen/nativescript-headset-detection.svg?branch=master
[build-url]:https://travis-ci.org/EddyVerbruggen/nativescript-headset-detection
[npm-image]:http://img.shields.io/npm/v/nativescript-headset-detection.svg
[npm-url]:https://npmjs.org/package/nativescript-headset-detection
[twitter-image]:https://img.shields.io/twitter/follow/eddyverbruggen.svg?style=social&label=Follow%20me
[twitter-url]:https://twitter.com/eddyverbruggen

<img src="media/Demo-iOS.gif">&nbsp;&nbsp;&nbsp;&nbsp;<img src="media/Demo-Android.gif">

## Installation

```bash
tns plugin add nativescript-headset-detection
```

## API

### `isConnected`
To check for a headset at any given moment, use this method:

#### JavaScript

```js
var headsetDetection = require("nativescript-headset-detection");

headsetDetection.isConnected()
    .then(function (connected) { console.log("Connected? " + connected); })
    .catch(function (err) { console.log("Error: " + err)});
```

#### TypeScript

```typescript
import * as headsetDetection from 'nativescript-headset-detection';

headsetDetection.isConnected()
    .then(connected => console.log(`Connected? ${connected}`))
    .catch(err => console.log(`Error: ${err}`));
```

### `onConnectionStateChanged`
To listen to changes to the headset state, use this one (adding it to a high level component like `app.[ts|js] makes sense);
you can pass in a callback function that gets invoked whenever a headset is (dis)connected:

#### JavaScript

```js
var headsetDetection = require("nativescript-headset-detection");

headsetDetection.onConnectionStateChanged(function (connected) {
  console.log("Connection changed to: " + connected);
});
```

#### TypeScript

```typescript
import * as headsetDetection from 'nativescript-headset-detection';

headsetDetection.onConnectionStateChanged(connected => console.log(`Connection changed to: ${connected}`));
```
