import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function nomeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valor = control.value;

        if (!valor) {
            return { nomeObrigatorio: true };
        }

        if (valor.length < 3) {
            return { nomeMinimo: true };
        }

        if (valor.length > 150) {
            return { nomeMaximo: true };
        }

        return null;
    }
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const valor = control.value;

    if (!valor) {
      return { emailObrigatorio: true };
    }

    if (valor.length > 150) {
      return { emailMaximo: true };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(valor)) {
      return { emailInvalido: true };
    }

    return null;
  };
}

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const valor = control.value;

    if (!valor) {
      return { cpfObrigatorio: true };
    }

    const cpfNumeros = valor.replace(/\D/g, '');

    if (cpfNumeros.length !== 11) {
      return { cpfFormatoInvalido: true };
    }

    return null;
  };
}