# NativeScript Headset Detection plugin

> I made this plugin for a client who doesn't want to give it away for free. So if you want to use this plugin please contact me (my email address is on my Github profile page) and I'm sure we can work something out. The client will get 50% of anything you pay me - that's the deal we made. 💰

## Installation

```bash
tns plugin add ./path/to/the/plugin.tgz
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
To listen to changes to the headset state, use this one;
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
