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
  public quote: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.score = this.navParams.get('param');
    let rank = this.score / 3;
    if (rank < 5) {
      this.quote = "ayo coba lagi, jangan menyerah";
    }
    if (rank > 5 && rank < 7) {
      this.quote = "Lumayan";
    }
    if (rank > 7 && rank < 10) {
      this.quote = "Bagus, Pertahankan";
    }
    if (rank == 10) {
      this.quote = "Sempurna";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScorePage');
  }

}
