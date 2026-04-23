import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function codigoValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valor = control.value;

        if (!valor) {
            return { codigoObrigatorio: true };
        }

        if (valor.length < 3) {
            return { codigoMinimo: true };
        }

        if (valor.length > 50) {
            return { codigoMaximo: true };
        }

        return null;
    }
}

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
  };
}

export function descricaoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const valor = control.value;

    if (valor === null || valor === '') {
      return null;
    }

    if (valor.length < 3) {
        return { descricaoMinimo: true };
    }

    if (valor.length > 500) {
      return { descricaoMaximo: true };
    }

    return null;
  };
}

export function categoriaValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const valor = control.value;

    if (!valor) {
      return { categoriaObrigatorio: true };
    }

    return null;
  };
}

export function statusValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const valor = control.value;

    if (!valor) {
      return { statusObrigatorio: true };
    }

    return null;
  };
}

export function marcaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valor = control.value;

        if (!valor) {
            return { marcaObrigatoria: true };
        }

        if (valor.length > 100) {
            return { marcaMaximo: true };
        }

        return null;
    }
}

export function numeroNaoNegativoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = parseFloat(control.value);

    if (control.value === null || control.value === '') {
      return null; // deixa required pra outro validator se quiser
    }

    if (isNaN(valor)) {
      return { valorInvalido: true };
    }

    if (valor < 0) {
      return { valorNegativo: true };
    }

    return null;
  };
}

export function precoPromocionalValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const precoNormal = parseFloat(form.get('precoNormal')?.value);
    const precoPromo = parseFloat(form.get('precoPromocional')?.value);

    if (!precoPromo) {
      return null; // promocional é opcional
    }

    if (isNaN(precoNormal) || isNaN(precoPromo)) {
      return null;
    }

    if (precoPromo >= precoNormal) {
      return { precoPromocionalInvalido: true };
    }

    return null;
  };
}

export function obrigatorioValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value && control.value !== 0) {
      return { obrigatorio: true };
    }
    return null;
  };
}