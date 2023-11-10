"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidaCPF_1 = __importDefault(require("./ValidaCPF"));
require("../css/style.css");
class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.inputSenha = document.querySelector('.senha');
        this.inputRepetirSenha = document.querySelector('.repetir-senha');
        this.eventos();
    }
    eventos() {
        var _a;
        (_a = this.formulario) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }
    handleSubmit(e) {
        var _a;
        e.preventDefault();
        const camposValidos = this.camposSaoValidos();
        const senhasValidas = this.senhasSaoValidas();
        if (camposValidos && senhasValidas) {
            alert('Formulário enviado.');
            (_a = this.formulario) === null || _a === void 0 ? void 0 : _a.submit();
        }
    }
    senhasSaoValidas() {
        let valid = true;
        const valueSenha = this.inputSenha ? this.inputSenha.value : '';
        const valueRepetirSenha = this.inputRepetirSenha ? this.inputRepetirSenha.value : '';
        if (valueSenha !== valueRepetirSenha) {
            valid = false;
            if (this.inputSenha)
                this.criaErro(this.inputSenha, 'Campos senha e repetir senha precisar ser iguais.');
            if (this.inputRepetirSenha)
                this.criaErro(this.inputRepetirSenha, 'Campos senha e repetir senha precisar ser iguais.');
        }
        if (valueSenha.length < 6 || valueSenha.length > 12) {
            valid = false;
            if (this.inputSenha)
                this.criaErro(this.inputSenha, 'Senha precisa estar entre 6 e 12 caracteres.');
        }
        return valid;
    }
    camposSaoValidos() {
        var _a;
        let valid = true;
        if (this.formulario)
            for (let errorText of this.formulario.querySelectorAll('.error-text')) {
                errorText.remove();
            }
        if (this.formulario)
            for (let campo of this.formulario.querySelectorAll('.validar')) {
                const labelText = (_a = campo.previousElementSibling) === null || _a === void 0 ? void 0 : _a.innerHTML;
                if (campo instanceof HTMLInputElement && !campo.value) {
                    this.criaErro(campo, `Campo "${labelText}" não pode estar em branco.`);
                    valid = false;
                }
                if (campo.classList.contains('cpf') && campo instanceof HTMLInputElement) {
                    if (!this.validaCPF(campo))
                        valid = false;
                }
                if (campo.classList.contains('usuario') && campo instanceof HTMLInputElement) {
                    if (!this.validaUsuario(campo))
                        valid = false;
                }
            }
        return valid;
    }
    validaUsuario(campo) {
        const usuario = campo.value;
        let valid = true;
        if (usuario.length < 3 || usuario.length > 12) {
            this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres.');
            valid = false;
        }
        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaErro(campo, 'Nome de usuário precisar conter apenas letras e/ou números.');
            valid = false;
        }
        return valid;
    }
    validaCPF(campo) {
        const cpf = new ValidaCPF_1.default(campo.value);
        if (!cpf.valida()) {
            this.criaErro(campo, 'CPF inválido.');
            return false;
        }
        return true;
    }
    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }
}
const valida = new ValidaFormulario();
