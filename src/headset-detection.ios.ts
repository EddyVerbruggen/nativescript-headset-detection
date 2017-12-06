import { ios as iOSApplication } from "tns-core-modules/application";

const HEADPHONE_ROUTES = [
  AVAudioSessionPortHeadphones,
  AVAudioSessionPortBluetoothHFP,
  AVAudioSessionPortBluetoothA2DP,
  AVAudioSessionPortBluetoothLE
];

export function isConnected(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    resolve(_isConnected());
  });
}

export function onConnectionStateChanged(callback: (connected: boolean) => void): void {
  iOSApplication.addNotificationObserver(AVAudioSessionRouteChangeNotification, (notification) => {
    const reason: number = notification.userInfo.objectForKey(AVAudioSessionRouteChangeReasonKey);
    if (reason === AVAudioSessionRouteChangeReason.NewDeviceAvailable) {
      callback(true);
    } else if (reason === AVAudioSessionRouteChangeReason.OldDeviceUnavailable) {
      callback(false);
    }
  });
}

function _isConnected(): boolean {
  const route = AVAudioSession.sharedInstance().currentRoute;
  for (let i = 0; i < route.outputs.count; i++) {
    const portDescription = route.outputs.objectAtIndex(i);
    if (HEADPHONE_ROUTES.indexOf(portDescription.portType) > -1) {
      return true;
    }
  }
  return false;
}