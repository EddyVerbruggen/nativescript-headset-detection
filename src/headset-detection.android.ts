import { android as AndroidApplication } from "tns-core-modules/application";

declare const android: any;

let lazyAudioManager;
let hasRegisteredHeadsetPlugBroadcastReceiver: boolean;

const bluetoothHeadsetStateChangedAction = "android.bluetooth.a2dp.profile.action.CONNECTION_STATE_CHANGED";

export function isConnected(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    resolve(_isConnected());
  });
}

export function onConnectionStateChanged(callback: (connected: boolean) => void): void {
  if (hasRegisteredHeadsetPlugBroadcastReceiver) {
    _unregisterHeadsetPlugBroadcastReceiver();
  }
  hasRegisteredHeadsetPlugBroadcastReceiver = true;

  // this one reports its state immediately.. for parity with bluetooth and iOS we suppress that
  let isInitialWiredStateReport = true;
  AndroidApplication.registerBroadcastReceiver(android.content.Intent.ACTION_HEADSET_PLUG, (context, intent) => {
    if (isInitialWiredStateReport) {
      isInitialWiredStateReport = false;
      return;
    }

    const state: number = intent.getIntExtra("state", -1);
    if (state === 0) {
      callback(false);
    } else if (state === 1) {
      callback(true);
    }
  });

  AndroidApplication.registerBroadcastReceiver(bluetoothHeadsetStateChangedAction, (context, intent) => {
    if (!lazyAudioManager) {
      lazyAudioManager = AndroidApplication.context.getSystemService(android.content.Context.AUDIO_SERVICE);
    }

    // needs a timeout to be able to report the correct state
    setTimeout(() => {
      callback(lazyAudioManager.isBluetoothA2dpOn() || lazyAudioManager.isBluetoothScoOn());
    }, 500);
  });
}

function _unregisterHeadsetPlugBroadcastReceiver(): void {
  AndroidApplication.unregisterBroadcastReceiver(android.content.Intent.ACTION_HEADSET_PLUG);
  AndroidApplication.unregisterBroadcastReceiver(bluetoothHeadsetStateChangedAction);
}

function _isConnected(): boolean {
  if (!lazyAudioManager) {
    lazyAudioManager = AndroidApplication.context.getSystemService(android.content.Context.AUDIO_SERVICE);
  }

  return lazyAudioManager.isWiredHeadsetOn() ||
      lazyAudioManager.isBluetoothA2dpOn() ||
      lazyAudioManager.isBluetoothScoOn();
}
