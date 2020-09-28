const TabInitiator = {
  init({ containerTab, data }) {
    this._containerTab = containerTab;
    this._data = data;

    this._renderTab();
  },

  _renderTab() {
    this._containerTab.innerHTML = '<ul class="tabs"></ul><div class="content-tabs"></div>';
    const tabs = this._containerTab.querySelector('.tabs');
    const content = this._containerTab.querySelector('.content-tabs');
    this._data.forEach((tab, index) => {
      tabs.innerHTML += `<li class="${index === 0 ? 'active' : ''}"><button id="btn-${tab.id}">${tab.name}</button></li>`;
      content.innerHTML += `<div id="${tab.id}" class="${index === 0 ? 'view' : ''}"></div>`;
    });

    const btns = tabs.querySelectorAll('button');
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this._viewTab(tabs, content, btn);
      });
    });
  },

  _viewTab(tabs, contents, current) {
    tabs.querySelector('.active').classList.remove('active');
    contents.querySelector('.view').classList.remove('view');
    current.parentElement.classList.add('active');
    const id = current.getAttribute('id').split('-');
    contents.querySelector(`#${id[1]}`).classList.add('view');
  },
};

export default TabInitiator;
