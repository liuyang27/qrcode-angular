import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import * as Crypto from "crypto-js";
import { EssenceNg2PrintComponent } from 'essence-ng2-print';


@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
})
export class QrcodeComponent implements OnInit {


  @Input() qrData;
  @Input() logoUrl;
  @Input() line1;
  @Input() line2;
  @Input() line3;

  qrSize=null;
  logoHeight=null;
  shiftPx=null;
  printStyle: string;
  createdCode=null;

  line1_data=null;
  line2_data=null;
  line3_data=null;
  scannedCode=null;
  showdiv:boolean=false;

  logoStyle={
    width:'25%',
    display: 'none',
    top:'0px',
    maxheight:'25%'
  }

  @ViewChild('qrdiv',{static: false}) qrdiv:any;
  @ViewChild('qrcodeborder',{static: false}) qrcodeborder:any;
  // @ViewChild('logo',{static: false}) logo:any;
  @ViewChild('printBtn',{static: false}) printBtn: EssenceNg2PrintComponent;
  @ViewChild('wordsDiv',{static: false}) wordsDiv:any;
  key=null;
  iv=null;
  constructor(private barcodeScanner:BarcodeScanner) { 
    this.key = Crypto.enc.Latin1.parse('saltsalt');
    this.iv = Crypto.enc.Latin1.parse('myoffset');
    this.printStyle = `

        @media print {
  
          @page {     /*A4: 210mm × 297mm*/
            //size: 2.3in 3.4in landscape;
            size: portrait;
            //height:100mm;
            margin: 0;

          }

          body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10pt;
            background: white;
            color: black;
            margin: 0px;
          }

          .qrcode{
            display:none;
            width:190px;
            height:190px;
            //width: 35%;
            //float: left;
            overflow: hidden;
            margin:0 auto;
            position: relative;
            text-align:center;
          }

          #snapshot {
            //border:solid;
            width:190px;
            height:190px;
            //float: left;
            overflow: hidden;
            margin:0 auto;
            position: relative;
            text-align:center;
          }

      
          #wordsDiv{
            //border:solid;
            padding-left:10px;
            padding-right:10px;
          }
          #wordsDiv p {
            word-break: break-all;

          }

        }

    `;
  }

  ngOnInit() {}

  scanCode(){
    this.barcodeScanner.scan().then(barcodeData =>{
    this.scannedCode=this.decrypt(barcodeData.text);
    })
  }


  strlen=null;
  strlenbefore=null;
  createCode(){
    if(this.qrData){
      // this.createdCode=this.encrypt(this.qrData);
      this.createdCode=this.qrData;
      this.strlen=this.createdCode.length;
      this.strlenbefore=this.qrData.length;

      this.line1_data=this.line1;
      this.line2_data=this.line2;
      this.line3_data=this.line3;

      if(this.logoUrl != null && this.logoUrl != ""){
        setTimeout(() => {
          this.addLogo();
        },500);
      }else{
        setTimeout(() => {
          var qrcodeCanvas:any=document.querySelector(".qrcode canvas");
          var dataUrl =qrcodeCanvas.toDataURL();
          var x:any= document.getElementById("snapshot");
          x.src=dataUrl;
          qrcodeCanvas.style.display="none";
        },500);
      }


    }
   
  }


  encrypt(data){
    let res = Crypto.AES.encrypt(JSON.stringify(data), this.key, {
      iv: this.iv,
      mode: Crypto.mode.CBC,
      padding: Crypto.pad.Pkcs7
    }).toString();
    return res;
  }

 
  decrypt(data) {
    let res = Crypto.AES.decrypt(data, this.key, {
      iv: this.iv,
      mode: Crypto.mode.CBC,
      padding: Crypto.pad.Pkcs7
    })
    return Crypto.enc.Utf8.stringify(res);
  }


  print() {
    this.showdiv=true;
    this.printBtn.print(); 
    setTimeout(() => {
      this.showdiv=false;
    },500);

  }

  addLogo(){
    var qrcodeCanvas:any=document.querySelector(".qrcode canvas");
    var ctx = qrcodeCanvas.getContext('2d');
    var qrsize= qrcodeCanvas.width;
    var maxlogosize = qrsize*0.18;
    var r;
    var imgObj = new Image();
    imgObj.src = this.logoUrl;
    imgObj.onload = function(){ 
        var logoWidth=imgObj.width;
        var logoHeight=imgObj.height;
        if(logoWidth>maxlogosize || logoHeight>maxlogosize){
            if(logoWidth>=logoHeight){
                r=maxlogosize/logoWidth;
                logoWidth=maxlogosize;
                logoHeight=logoHeight*r;
            }else{
                r=maxlogosize/logoWidth;
                logoHeight=maxlogosize;
                logoWidth=logoWidth*r;
            }
        }
        ctx.drawImage(this,qrsize/2-maxlogosize/2,qrsize/2-maxlogosize/2,logoWidth,logoHeight);
        
        var dataUrl =qrcodeCanvas.toDataURL();
        var x:any= document.getElementById("snapshot");
        x.src=dataUrl;
        qrcodeCanvas.style.display="none";
    }
  }

}
