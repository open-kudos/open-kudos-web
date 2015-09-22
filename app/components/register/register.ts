import {Component, View} from 'angular2/angular2';
import {HTTP_BINDINGS, Http} from 'angular2/http';
import {CORE_DIRECTIVES, FormBuilder, ControlGroup, FORM_DIRECTIVES} from 'angular2/angular2';


@Component({
  selector: 'register',
  viewBindings: [FormBuilder, HTTP_BINDINGS]
})
@View({
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  templateUrl: './components/register/register.html'
})
export class Register {
  RegisterForm: ControlGroup;

  constructor(private http:Http, fb: FormBuilder) {
    this.RegisterForm = fb.group({
      "firstName": "",
      "lastName": "",
      "email": "",
      "password": "",
      "confirmPassword": ""
    })
  }

  Register(value) {
    console.log(JSON.stringify(value));
    var email = value.email;
    var password = value.password;
    var confirmPassword = value.confirmPassword;
   return this.http.post('http://79.98.29.151:8080/register?email='+email+'&password='+password+'&confirmPassword='+confirmPassword, "", {
   });

   };
 }
