import { LoginPage } from "./pages/atrium/login/login";
import { ConsultasPage } from "./pages/modulos/cad/consultas/consultas.page";
import { SolicitacaosPage } from "./pages/modulos/cad/solicitacao/solicitacao.page";
import { RespostasPage } from "./pages/modulos/cad/respostas/respostas.page";

export const AppRoutes = [
  { path: 'login', component: LoginPage },
  { path: '', loadChildren: './pages/pasageway/menu/menu.module#MenuPageModule' },
  { path: 'home', loadChildren: './pages/pasageway/home/home.module#HomePageModule' },
  { path: 'consultas', component: ConsultasPage },
  { path: 'solicitacao', component: SolicitacaosPage },
  { path: 'respostas/:id', component: RespostasPage }
];
