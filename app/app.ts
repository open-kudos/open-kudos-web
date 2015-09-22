import {Component, View, bootstrap} from 'angular2/angular2';
import {RouteConfig, ROUTER_BINDINGS, ROUTER_DIRECTIVES} from 'angular2/router';

import {Home} from './components/home/home';
import {Login} from './components/login/login';
import {Register} from './components/register/register';

@Component({
  selector: 'app'
})
@RouteConfig([
  { path: '/login', component: Login, as: 'login' },
  { path: '/home', component: Home, as: 'home' },
  { path: '/register', component: Register, as: 'register'}
])
@View({
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  directives: [ROUTER_DIRECTIVES]
})
class App {}


bootstrap(App, [ROUTER_BINDINGS]);
