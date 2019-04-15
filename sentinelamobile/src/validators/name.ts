import { FormControl } from '@angular/forms';

export class NameValidator {

  static isValid(control: FormControl): any {
    if(control.value.trim().length==0){
      return {
        "Invalid Name": true
      };
    }
    return null;
  }
}
