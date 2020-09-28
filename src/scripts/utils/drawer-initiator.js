const DrawerInitiator = {
  init({ button, drawer }) {
    this._button = button;
    this._drawer = drawer;
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      this._toggleDrawer();
    });
  },

  hideDrawer() {
    this._button.classList.remove('is-active');
    this._drawer.classList.remove('mobile-nav');
  },

  _toggleDrawer() {
    this._button.classList.toggle('is-active');
    this._drawer.classList.toggle('mobile-nav');
  },
};

export default DrawerInitiator;
