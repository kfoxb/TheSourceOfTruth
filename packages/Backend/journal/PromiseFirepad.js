global.window = {};
const Firepad = require('firepad/dist/firepad');

export default class PromiseFirepad {
  constructor(ref) {
    if (!ref) {
      throw new Error('PromiseFirepad requires a ref when instantiated');
    }
    this.ref = ref;
    this.headless = new Firepad.Headless(this.ref);
  }

  getHtml() {
    return this.getPromise('getHtml');
  }

  getId() {
    return this.ref.key;
  }

  getPromise(method) {
    return new Promise((resolve, reject) => {
      try {
        this.headless[method]((result) => {
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getText() {
    return this.getPromise('getText');
  }

  setHtml(html) {
    return this.setPromise(html, 'setHtml');
  }

  setPromise(item, method) {
    return new Promise((resolve, reject) => {
      this.headless[method](item, (error, committed) => {
        if (error) {
          reject(error);
        } else if (committed) {
          resolve();
        } else {
          reject(new Error('Could not write to firepad, conflict in history'));
        }
      });
    });
  }

  setText(text) {
    this.setPromise(text, 'setText');
  }
}
