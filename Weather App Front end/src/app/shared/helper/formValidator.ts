import { AbstractControl, ValidatorFn } from "@angular/forms";

export class FormValidator{
    static usernameValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
          const value = control.value;
          const regex = /^[A-Za-z]+[0-9]*$/;
      
          if (value && !regex.test(value)) {
            return { invalidUsername: true };
          }
      
          return null;
        };
    }

    static lengthValidator(length: number) {
      return (control: AbstractControl) => {
        const value = control.value;
        if (value && value.length !== length) {
          return { exactLength: true };
        }
        return null;
      };
    }

    static addressValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        const regex = /\w+/;
    
        if (value && !regex.test(value)) {
          return { invalidAddress: true };
        }
    
        return null;
      };
    }
}