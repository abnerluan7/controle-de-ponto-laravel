import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultasProvider } from '../../../../../providers/modulos/cad/consultas/consultas';

@Component({
  selector: 'app-page-home',
  templateUrl: 'consultas.page.html',
  styleUrls: ['consultas.page.scss']
})
export class ConsultasPage {

  segment: string;
  page: number;
  items: any = [];

  constructor(
    private router: Router,
    public consultas: ConsultasProvider
  ) {
    consultas.carregaConsultas().then((response) => {
      response['data'].forEach(element => {
        this.items.push(element);
      });
    });
  }

  nav(){
    this.router.navigateByUrl('/solicitacao');
  }

  opem(id){
    this.router.navigateByUrl('/respostas/' + id);
  }


}
