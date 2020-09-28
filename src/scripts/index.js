import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import App from './views/app';
import swRegister from './utils/sw-register';
import './utils/rating';
import CONFIG from './globals/config';
import WebSocketInitiator from './utils/websocket-initiator';

const app = new App({
  button: document.querySelector('.menu-toggle'),
  drawer: document.querySelector('.nav'),
  content: document.querySelector('#app'),
  nav: document.querySelector('.nav-wrapper'),
});

window.addEventListener('hashchange', () => {
  window.scrollTo({ top: 0, behavior: 'auto' });
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
  WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
});
