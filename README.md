# NativeScript Headset Detection plugin

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
