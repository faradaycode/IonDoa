import { NativeAudio } from '@ionic-native/native-audio';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TajwidProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TajwidProvider {
  public childr: any = [];
  constructor(public http: HttpClient, private toas: ToastController,
    private audio: NativeAudio) {
    console.log('Hello TajwidProvider Provider');
  }

  jsonCall(jsonfile) {
    return this.http.get('assets/' + jsonfile);
  }
  onToast(msg) {
    let tos = this.toas.create({
      message: msg,
      duration: 3000,
      position: "top"
    });
    tos.present();
  }
  playSound(id, sound) {
    this.audio.preloadSimple(id, sound).then(() => {
      this.audio.play(id, () => this.audio.unload(id));
    });
  }
}
