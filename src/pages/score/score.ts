import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ScorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-score',
  templateUrl: 'score.html',
})
export class ScorePage {
  public score: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.score = this.navParams.get('param');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScorePage');
  }

}
