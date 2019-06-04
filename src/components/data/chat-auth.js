import { LitElement, html, css } from 'lit-element';

import firebase from 'firebase/app';
import 'firebase/auth';

export class ChatAuth extends LitElement {
  constructor() {
    super();
    this.email = '';
    this.password = '';
  }
  static get properties() {
    return {
      email: String,
      password: String,
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  handleForm(e) {
    e.preventDefault();
    if (!this.email || !this.password) return console.error("Email or password are empty :'(");
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        console.log('Registration successful', user);
      }).catch(console.log);
    this.email = '';
    this.password = '';
  }

  render() {
    return html`
      <h1>Register</h1>
      <form @submit="${this.handleForm}">
        <input type="email" .value="${this.email}" @input="${e => this.email = e.target.value}">
        <input type="password" .value="${this.password}" @input="${e => this.password = e.target.value}">
        <button type="submit">Register</button>
      </form>
    `;
  }
}
customElements.define('chat-auth', ChatAuth);