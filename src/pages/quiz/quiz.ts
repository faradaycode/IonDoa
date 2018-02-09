import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TajwidProvider } from '../../providers/tajwid/tajwid';

/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  datas: any = [];
  posquest: number; //to handle when user answering question, to make sure if user in that question
  trueAns: number = 0;
  checkVar: number; //to check if user answered the question
  randAns: any = []; //collect random question array
  totalData: any;
  num: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private serv: TajwidProvider) {
    this.posquest = 0;
    this.checkVar = 0;

    //get json data
    this.serv.jsonCall('quis.json').subscribe(data => {
      this.datas = data;
      this.datas.sort((a, b) => { return Math.random() - 0.5; });
      this.totalData = Object.keys(data).length;
    });
  }

  ionViewDidLoad() {
  }

  //next and previous button 
  nextq(val) {
    this.num = val + 1;
    //this.snumb = num;
    this.posquest = 0; //set to 0 again for next soal
    if (this.checkVar > 0) {
      if (this.num < this.totalData) {
        this.checkVar = 0;
        var divShow = document.getElementById('soal-' + this.num);
        var divHide = document.getElementById('soal-' + val);
        divShow.style.display = 'block';
        divHide.style.display = 'none';
      }
    } else {
      this.serv.onToast('Jawab Dulu Dong');
    }
  }
  //end method

  //script for get answer, only true answer counted
  answerQ(trueVal, ansVal) {
    this.checkVar = 1;
    if (trueVal == ansVal) {
      this.posquest += 1; //if true then counter will + 1
      if (this.posquest == 1) {
        this.trueAns += 1;
      }
    } else {
      if (this.posquest == 1) {
        this.trueAns -= 1;
        this.posquest = 0; //if not, reset to 0
      }
    }
    console.log(this.trueAns);
  }

  finishIt() {
    console.log("Finish");
    this.navCtrl.push('ScorePage', { param: this.trueAns });
  }

  //play sound for listening section
  playQst(folder) {
    let url = 'assets/audio/';
    let ogg = '/1.ogg';
    this.serv.playSound('listening', url + folder + ogg)
  }

}