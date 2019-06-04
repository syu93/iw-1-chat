import { LitElement } from 'lit-element';

import firebase from 'firebase/app';
import 'firebase/database';

class ChatData extends LitElement {
  constructor() {
    super();
    this.path = '';
    this.database = {};
    this.data = [];
    this._data = [];
  }

  static get properties() {
    return {
      database: { type: Object },
      path: {
        type: String
      },
      data: {
        type: Array
      },
      _data: {
        type: Array
      }
    }
  }

  firstUpdated() {
    firebase.initializeApp(document.config);
    this.database = firebase.database();

    // this.database.ref().child(this.path).push({name: 'Plop3'});

    this.database.ref().child(this.path).on('value', data => this.nodeHasChanged('value', data));
    this.database.ref().child(this.path).on('child_added', data => this.nodeHasChanged('child_added', data));
    this.database.ref().child(this.path).on('child_changed', data => this.nodeHasChanged('child_changed', data));
    this.database.ref().child(this.path).on('child_moved', data => this.nodeHasChanged('child_moved', data));
    this.database.ref().child(this.path).on('child_removed', data => this.nodeHasChanged('child_removed', data));
  }

  nodeHasChanged(event, data) {
    switch(event) {
      case 'value':
        break;
      case 'child_added':
        this.data = [...this.data, data];
        this._data = this.data.map(item => item.val());
        this.dispatchEvent(new CustomEvent('child-changed', { detail: this._data }));
        break;
      case 'child_removed':
        this.data = this.data.filter(item => item.key != data.key);
        this._data = this.data.map(item => item.val());
        this.dispatchEvent(new CustomEvent('child-changed', { detail: this._data }));
        break;
    }
  }
}
customElements.define('chat-data', ChatData);