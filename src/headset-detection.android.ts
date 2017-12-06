import { android as AndroidApplication } from "tns-core-modules/application";

declare const android: any;

let lazyAudioManager;
let hasRegisteredHeadsetPlugBroadcastReceiver: boolean;

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

  AndroidApplication.registerBroadcastReceiver(android.content.Intent.ACTION_HEADSET_PLUG, (context, intent) => {
    const state: number = intent.getIntExtra("state", -1);
    if (state === 0) {
      callback(false);
    } else if (state === 1) {
      callback(true);
    }
  });
}

function _unregisterHeadsetPlugBroadcastReceiver(): void {
  AndroidApplication.unregisterBroadcastReceiver(android.content.Intent.ACTION_HEADSET_PLUG);
}

function _isConnected(): boolean {
  if (!lazyAudioManager) {
    lazyAudioManager = AndroidApplication.context.getSystemService(android.content.Context.AUDIO_SERVICE);
  }

  return lazyAudioManager.isWiredHeadsetOn() ||
      lazyAudioManager.isBluetoothA2dpOn() ||
      lazyAudioManager.isBluetoothScoOn();
}
