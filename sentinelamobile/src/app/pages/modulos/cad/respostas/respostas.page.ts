import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsultasProvider } from '../../../../../providers/modulos/cad/consultas/consultas';

@Component({
  selector: 'app-page-home',
  templateUrl: 'respostas.page.html',
  styleUrls: ['respostas.page.scss']
})
export class RespostasPage {

  segment: string;
  page: number;
  items: any = [];
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public consultas: ConsultasProvider
  ) {
    this.id = route.snapshot.paramMap.get('id');
    consultas.carregaResposta(this.id).then((response) => {
      this.items.push(response['data']);
    });
    console.log(this.items);
  }

  nav(){
    this.router.navigateByUrl('/solicitacao');
  }


}
