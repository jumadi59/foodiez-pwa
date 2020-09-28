import RestaurantSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';
import Like from '../../utils/like-initiator';
import Tab from '../../utils/tab-initiator';
import Review from '../../utils/review';

import {
  createPlaceholderDetailTemplate,
  createRestaurantDetailTemplate,
  createMenuItemTemplate,
  createReviewItemTemplate,
  createCategoriesTemplate,
  createReviewItemPlaceholderTemplate,
  createMspPageTemplate,
} from '../templates/template-creator';

const Detail = {
  async render({ nav, app }) {
    this._app = app;
    nav.classList.add('nav-white');

    return `<main id="maincontent" class="container bottom-navbar">
    <div class="details" id="content-detail"></div>
    <h2 class="center">Menus</h2>
    <div class="container-tabs"></div>
    <div class="reviews" id="reviews">
      <h3>Reviews</h3>
      <div class="review">
        <img src="images/user-default.png" >
        <div class="review-box">
        <div class="input-field">
        <label for="input-name">Name</label>
          <input name="name" type="text" placeholder="" id="input-name" required />
        </div>
        <div class="input-field">
        <label for="input-review">Review</label>
        <textarea name="review" placeholder="" id="input-review" required></textarea>
        </div>
          <button type="submit" class="btn" id="post-review">Post</button>
        </div>
      </div>
      <div id="content-reviews"></div>
    </div>
    </main>`;
  },

  async beforeRender() {
    const content = document.querySelector('#content-detail');
    content.classList.add('placeholder');
    content.innerHTML = createPlaceholderDetailTemplate();
    Tab.init({
      containerTab: document.querySelector('.container-tabs'),
      data: [{ id: 'drinks', name: 'Drinks' }, { id: 'foods', name: 'Foods' }],
    });
    const foods = document.querySelector('#foods');
    foods.classList.add('placeholder');
    foods.innerHTML = '<div class="line ful"></div>';
    const drinks = document.querySelector('#drinks');
    drinks.classList.add('placeholder');
    drinks.innerHTML = '<div class="line full"></div>';

    const contentReviews = document.querySelector('#content-reviews');
    contentReviews.innerHTML = createReviewItemPlaceholderTemplate();
    contentReviews.innerHTML += createReviewItemPlaceholderTemplate();
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    try {
      const data = await RestaurantSource.detailRestaurant(url.id);
      this._renderDetail(url, data.restaurant);
    } catch (error) {
      const main = document.querySelector('main');
      main.innerHTML = createMspPageTemplate({
        title: '  Error request',
        message: `Error: ${error}`,
        button: {
          id: 'detail-retry',
          name: 'Retry',
        },
      });
      const retry = document.getElementById('detail-retry');
      retry.addEventListener('click', async () => {
        await this._app.renderPage();
      });
    }
  },

  _renderDetail(url, restaurant) {
    const content = document.querySelector('#content-detail');
    content.innerHTML = createRestaurantDetailTemplate(restaurant);
    content.classList.remove('placeholder');
    Like.init({ container: content, data: restaurant });
    const tab = document.querySelector('.container-tabs');
    Tab.init({
      containerTab: tab,
      data: [{ id: 'drinks', name: 'Drinks' }, { id: 'foods', name: 'Foods' }],
    });

    const chips = content.querySelector('.chips');
    chips.innerHTML = createCategoriesTemplate(restaurant.categories);

    const drinks = document.querySelector('#drinks');
    restaurant.menus.drinks.forEach((menu) => {
      drinks.innerHTML += createMenuItemTemplate(menu, 'drinks');
    });

    const foods = document.querySelector('#foods');
    restaurant.menus.foods.forEach((menu) => {
      foods.innerHTML += createMenuItemTemplate(menu, 'foods');
    });

    const contentReviews = document.querySelector('#content-reviews');
    const countReview = contentReviews.parentNode.querySelector('h3');
    contentReviews.innerHTML = '';
    countReview.innerHTML += `(${restaurant.consumerReviews.length})`;
    restaurant.consumerReviews.reverse();
    restaurant.consumerReviews.forEach((review) => {
      contentReviews.innerHTML += createReviewItemTemplate(review);
    });

    const inputName = document.querySelector('#input-name');
    const inputReview = document.querySelector('#input-review');
    const btnPost = document.querySelector('#post-review');

    btnPost.addEventListener('click', (e) => {
      e.preventDefault();
      if (inputName.value === '' || inputReview.value === '') {
        if (inputName.value === '') {
          inputName.focus();
        } else {
          inputReview.focus();
        }
      } else {
        Review({ id: url.id, name: inputName.value, review: inputReview.value });
        inputName.value = '';
        inputReview.value = '';
      }
    });
  },
};

export default Detail;
