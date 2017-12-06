import { Observable } from 'tns-core-modules/data/observable';
import { alert } from 'tns-core-modules/ui/dialogs';
import * as headsetDetection from 'nativescript-headset-detection';

export class HelloWorldModel extends Observable {
  public connectionState: string;

  constructor() {
    super();
    this.set("connectionState", "Press a button..");
  }

  isConnected(): void {
    headsetDetection.isConnected()
        .then(connected => {
          this.set("connectionState", `Connected? ${connected}`);
        })
        .catch(this.onError);
  }

  addConnectionStateChangedListener(): void {
    headsetDetection.onConnectionStateChanged(connected => {
      this.set("connectionState", `Connection changed to: ${connected}`);
    });
    this.set("connectionState", "Listening to changes..");
  }

  private onSuccess(result: any): void {
    // noinspection JSIgnoredPromiseFromCall
    alert({
      title: "Success",
      message: result,
      okButtonText: "OK"
    });
  }

  private onError(error?: any): void {
    // noinspection JSIgnoredPromiseFromCall
    alert({
      title: "Error",
      message: error ? `${error.description} (code ${error.code})` : null,
      okButtonText: "OK"
    });
  }
}
