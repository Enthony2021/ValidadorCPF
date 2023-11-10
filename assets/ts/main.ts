import ValidaCPF from "./ValidaCPF";
import "../css/style.css";

class ValidaFormulario {
  private formulario: HTMLFormElement | null;
  private inputSenha: HTMLInputElement | null;
  private inputRepetirSenha: HTMLInputElement | null;

  constructor() {
    this.formulario = document.querySelector('.formulario');
    this.inputSenha = document.querySelector('.senha');
    this.inputRepetirSenha = document.querySelector('.repetir-senha');

    this.eventos();
  }

  eventos(): void {
    this.formulario?.addEventListener('submit', e => {
      this.handleSubmit(e);
    });
  }

  private handleSubmit(e: SubmitEvent): void {
    e.preventDefault();
    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasSaoValidas();

    if(camposValidos && senhasValidas) {
      alert('Formulário enviado.');
      this.formulario?.submit();
    }
  }

  private senhasSaoValidas(): boolean {
    let valid: boolean = true;
    const valueSenha: string = this.inputSenha ? this.inputSenha.value : '';
    const valueRepetirSenha: string = this.inputRepetirSenha ? this.inputRepetirSenha.value : ''; 
    
    if(valueSenha !== valueRepetirSenha) {
      valid = false;
      if(this.inputSenha) this.criaErro(this.inputSenha, 'Campos senha e repetir senha precisar ser iguais.');
      if(this.inputRepetirSenha) this.criaErro(this.inputRepetirSenha, 'Campos senha e repetir senha precisar ser iguais.');
    }

    if(valueSenha.length < 6 || valueSenha.length > 12) {
      valid = false;
      if(this.inputSenha) this.criaErro(this.inputSenha, 'Senha precisa estar entre 6 e 12 caracteres.');
    }

    return valid;
  }

  private camposSaoValidos(): boolean {
    let valid = true;

    if(this.formulario)
    for(let errorText of this.formulario.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    if(this.formulario) 
    for(let campo of this.formulario.querySelectorAll('.validar')) {
      const labelText: string | undefined = campo.previousElementSibling?.innerHTML;

      if(campo instanceof HTMLInputElement && !campo.value ) {
        this.criaErro(campo, `Campo "${labelText}" não pode estar em branco.`);
        valid = false;
      }

      if(campo.classList.contains('cpf') && campo instanceof HTMLInputElement) {
        if(!this.validaCPF(campo)) valid = false;
      }

      if(campo.classList.contains('usuario') && campo instanceof HTMLInputElement) {
        if(!this.validaUsuario(campo)) valid = false;
      }
    }

    return valid;
  }

  private validaUsuario(campo: HTMLInputElement) {
    const usuario = campo.value;
    let valid = true;

    if(usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres.');
      valid = false;
    }

    if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(campo, 'Nome de usuário precisar conter apenas letras e/ou números.');
      valid = false;
    }

    return valid;
  }

  private validaCPF(campo: HTMLInputElement): boolean {
    const cpf: ValidaCPF = new ValidaCPF(campo.value);

    if(!cpf.valida()) {
      this.criaErro(campo, 'CPF inválido.');
      return false;
    }

    return true;
  }

  private criaErro(campo: Element, msg: string): void {
    const div: HTMLDivElement = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    campo.insertAdjacentElement('afterend', div);
  }
}

const valida = new ValidaFormulario();
