import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { App } from 'ionic-angular/components/app/app';
import { TajwidProvider } from '../providers/tajwid/tajwid';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'FrontmenuPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private orin: ScreenOrientation, app: App, private serv: TajwidProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.orin.lock(this.orin.ORIENTATIONS.PORTRAIT);
      //statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      if (platform.is('android')) {
        statusBar.styleLightContent();
        statusBar.backgroundColorByHexString('#3b7566');
      }
      splashScreen.hide();

      platform.registerBackButtonAction(() => {
        let nav = app.getActiveNavs()[0];
        let activeView = nav.getActive();
        if (activeView.id === "ScorePage") {
          nav.popToRoot();
        }
        if (activeView.id === "FrontmenuPage") {
          platform.exitApp();
        }
        else {
          nav.pop();
          if(activeView.id === "DescriptionPage") {
            this.serv.stopIt('contoh');
          }
          if(activeView.id === "QuizPage") {
            this.serv.stopIt('listening');
          }
        }
      });
    });
  }
}