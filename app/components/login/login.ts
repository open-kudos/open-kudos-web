import {Component, View} from 'angular2/angular2';
import {HTTP_BINDINGS, Http} from 'angular2/http';
import {CORE_DIRECTIVES, FormBuilder, ControlGroup, FORM_DIRECTIVES} from 'angular2/angular2';
import {Router} from 'angular2/router';


@Component({
  selector: 'login',
  viewBindings: [FormBuilder, HTTP_BINDINGS]
})
@View({
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  templateUrl: './components/login/login.html'
})
export class Login {
  LoginForm: ControlGroup;

  constructor(private http:Http, fb: FormBuilder, router: Router) {
    this.LoginForm = fb.group({
      "email": "",
      "password": ""
    })
  }

  SubmitLogin(value) {
    console.log(JSON.stringify(value));
    var email = value.email;
    var password = value.password;
    this.http.post('http://79.98.29.151:8080/login?email='+email+'&password='+password, "", {
   }).observer({
      next: (res) => {
        if(res.json()._error_type){
          console.log('Error Occured');
        }
        console.log(res);
      },
      return: () => {
        console.log("Logged In");
        return "LoggedIn Success"
      }}
    );;

   };
 }
