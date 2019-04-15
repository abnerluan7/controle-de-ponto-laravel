import { FormControl } from '@angular/forms';

export class EmailValidator {

  static isValid(control: FormControl): any {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if(!EMAIL_REGEXP.test(control.value)){
      return {
        "Invalid Email": true
      };
    }
    return null;
  }

  static isAvailable(control: FormControl): any {
    //futura busca por email disponivel na base de dados
  }

}
