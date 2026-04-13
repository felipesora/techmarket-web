import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

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

export function senhaAtualValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valor = control.value;

        if (!valor) {
            return { senhaAtualObrigatoria: true };
        }

        if (valor.length < 6) {
            return { senhaAtualMinimo: true };
        }

        if (valor.length > 100) {
            return { senhaAtualMaximo: true };
        }

        return null;
    }
}

export function novaSenhaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valor = control.value;

        if (!valor) {
            return { novaSenhaObrigatoria: true };
        }

        if (valor.length < 6) {
            return { novaSenhaMinimo: true };
        }

        if (valor.length > 100) {
            return { novaSenhaMaximo: true };
        }

        return null;
    }
}

export function confirmarSenhaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valor = control.value;

        if (!valor) {
            return { confirmarSenhaObrigatoria: true };
        }

        if (valor.length < 6) {
            return { confirmarSenhaMinimo: true };
        }

        if (valor.length > 100) {
            return { confirmarSenhaMaximo: true };
        }

        return null;
    }
}

export function senhasIguaisValidator(form: FormGroup) {
    const novaSenha = form.get('novaSenha')?.value;
    const confirmarSenha = form.get('confirmarSenha')?.value;

    if (!novaSenha || !confirmarSenha) {
      return null;
    }

    if (novaSenha !== confirmarSenha) {
      return { senhaDiferente: true };
    }

    return null;
}