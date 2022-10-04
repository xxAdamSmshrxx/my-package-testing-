'use babel';

import MyPackageTesting-View from './my-package-testing--view';
import { CompositeDisposable } from 'atom';

export default {

  myPackageTesting-View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.myPackageTesting-View = new MyPackageTesting-View(state.myPackageTesting-ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myPackageTesting-View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-package-testing-:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.myPackageTesting-View.destroy();
  },

  serialize() {
    return {
      myPackageTesting-ViewState: this.myPackageTesting-View.serialize()
    };
  },

  toggle() {
    console.log('MyPackageTesting- was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
