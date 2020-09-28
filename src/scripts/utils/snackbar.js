class Snackbar {
  static create({ message, durationLenght, root }) {
    return new Snackbar({ message, durationLenght, root });
  }

  constructor({ message, durationLenght, root }) {
    const parent = typeof root !== 'undefined' ? root : document.getElementById('app');
    this._id = Math.random().toString(16).slice(2);
    this._durationLenght = durationLenght;
    const html = `<div class="snackbar" id="${this._id}"><span>${message}</span></div`;
    parent.innerHTML += html;
  }

  show() {
    const snackbar = document.getElementById(`${this._id}`);
    snackbar.classList.add('show');
    setTimeout(() => {
      snackbar.classList.remove('show');
      this.hide();
    }, (typeof this._durationLenght === 'number') ? this._durationLenght : 6000);
  }

  hide() {
    const snackbar = document.getElementById(`${this._id}`);
    snackbar.classList.add('hide');
    setTimeout(() => {
      snackbar.parentNode.removeChild(snackbar);
    }, 300);
  }
}

export default Snackbar;
