import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title = 'qrcodemaster';
  data='';
  logoUrl="/assets/images/download.png";
  // logoUrl="";
  line1='';
  line2='';
  line3='';


  maxLetters=135;
  remainLetters=this.maxLetters;

  
  constructor() {}

  public user:any={
    username:'aa',
    age:20,
    gender:'male'
  }



  ngOnInit(): void {
    //this.data=JSON.stringify(this.user);
  }
  // onSubmit(){
  //   this.data=JSON.stringify(this.user);
  // }


  check(){
    this.remainLetters=this.maxLetters - this.data.length;
  }


}
