const styleTemplate = `div {
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

class Rating extends HTMLElement {
  static get observedAttributes() {
    return ['rating', 'max-rating'];
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    const div = document.createElement('div');
    root.appendChild(div);
    const style = document.createElement('style');
    style.textContent = styleTemplate;
    root.appendChild(style);
    this.element = root.querySelector('div');
  }

  get maxRating() {
    const rating = +this.getAttribute('max-rating');
    return parseInt(rating, 16);
  }

  set maxRating(value) {
    this.setAttribute('max-rating', value);
  }

  get rating() {
    return parseFloat(+this.getAttribute('rating'));
  }

  set rating(value) {
    this.setAttribute('rating', value);
  }

  render() {
    this.clearElement();

    const smallTemplate = document.createElement('small');
    smallTemplate.textContent = this.rating;
    if (this.rating > 0) {
      this.element.appendChild(smallTemplate);
    }

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < this.maxRating; index++) {
      const r = `${this.rating}`.split('.');
      const starTemplate = document.createElement('i');
      starTemplate.setAttribute('class', `${index < r[0] ? 'actived' : ''}`);
      this.element.appendChild(starTemplate);

      if (r[1] >= 3 && index === parseInt(r[0], 16)) {
        starTemplate.classList.remove('actived');
        const starHalfTemplate = document.createElement('i');
        starTemplate.appendChild(starHalfTemplate);
      }
    }
  }

  clearElement() {
    const nodes = this.element.childNodes;
    if (nodes) {
      while (nodes.length > 0) {
        nodes[0].parentNode.removeChild(nodes[0]);
      }
    }
  }

  connectedCallback() {
    if (!this.maxRating) {
      this.maxRating = 5;
    } else
    if (this.maxRating < 0) {
      throw new Error('The rating must be higher than zero.');
    }
    if (!this.rating) {
      this.rating = 0;
    } else if (this.rating < 0 || this.rating > this.maxRating) {
      throw new Error('The rating must be higher than zero and lower than the maximum.');
    }
    this.dispatchEvent(new CustomEvent('ratingChanged', { detail: this.rating }));
    this.render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) {
      return;
    }

    switch (name) {
      case 'rating':
        this.rating = newVal;
        break;
      case 'max-rating':
        this.maxRating = newVal;
        break;
      default:
        break;
    }
    this.render();
  }
}

window.customElements.define('custom-rating', Rating);
