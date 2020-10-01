import { LitElement, html, css } from 'lit-element';

class Rating extends LitElement {
  static get properties() {
    return {
      rating: { type: String },
      'max-rating': { type: String },
    };
  }

  get create() {
    const ratings = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < parseInt(this['max-rating'], 16); index++) {
      const r = `${this.rating}`.split('.');
      const rating = { actived: '', inner: '' };
      if (parseInt(r[1], 16) >= 3 && index === parseInt(r[0], 16)) {
        rating.inner = html`<i></i>`;
      } else {
        rating.actived = index < parseInt(r[0], 16) ? 'actived' : '';
      }
      ratings.push(rating);
    }

    return html`${ratings.map((v) => html`<i class="${v.actived}">${v.inner}</i>`)}`;
  }

  render() {
    return html`<div>
    <small>
    ${parseInt(this.rating, 16) > 0 ? this.rating : ''}
    </small>
    ${this.create}</div>
  `;
  }

  static get styles() {
    return css`
    div {
      display: flex;
      overflow: hidden;
      line-height: 30px;
      align-items: center;
  }
  
  div small {
      font-size: 0.9rem;
      color: var(--grey);
      margin-right: 4px;
      line-height: 1;
  }
  
  div>i {
      cursor:pointer;
      background-color: #ccc;
      font-size: 1.1rem;
      display: block;
      -webkit-mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg"><path d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218" /></svg>');
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center center;
      width: 1.1rem;
      height: 1.1rem;
  }
  
  div>i>i {
      cursor:pointer;
      background-color: #ffc700;
      font-size: 1.1rem;
      display: block;
      -webkit-mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg"><path d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792" /></svg>');-webkit-mask-repeat: no-repeat;
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center center;
      width: 1.1rem;
      height: 1.1rem;
  }
  
  div>i.actived {
      cursor:pointer;
      background-color: #ffc700;
  }`;
  }
}

window.customElements.define('custom-rating', Rating);
