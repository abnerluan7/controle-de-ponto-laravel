import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ConsultasProvider } from '../../../../../providers/modulos/cad/consultas/consultas';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-page-home',
  templateUrl: 'solicitacao.page.html',
  styleUrls: ['solicitacao.page.scss']
})
export class SolicitacaosPage {

  segment: string;
  page: number;
  items: any = [];
  base64Image: any[];

  constructor(
    // private router: Router,
    public consultas: ConsultasProvider,
    //private formBuilder: FormBuilder,
    //private camera: Camera,
    //private storage: Storage
  ) {
    consultas.carregaCampos().then((response) => {
      response['data'].forEach(element => {
        this.items.push(element);
      });
    });
  }


  logForm (form) {
    this.consultas.resposta(form.value);
  }

  /*openCamera (idcampo) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
      var imagem = {
        idcampo: idcampo, 
        imagem: 'data:image/jpeg;base64,' + imageData
      };
      this.base64Image.push(imagem);
    }, (err) => {
     // Handle error
    });
  }*/


}
