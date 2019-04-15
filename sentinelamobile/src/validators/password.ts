import { FormControl } from '@angular/forms';

export class PasswordValidator {

  static isValid(control: FormControl): any {
    if(control.value != control.value.replace(' ', '')){
      return {
        "Wrong Password": true
      };
    }
    return null;
  }
}
