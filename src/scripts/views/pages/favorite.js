import RestaurantDb from '../../data/restaurant-db';
import { createPlaceholderItemTemplate, createRestaurantItemTemplate, createMspPageTemplate } from '../templates/template-creator';

const Favorite = {
  async render({ nav, app }) {
    this._app = app;
    nav.classList.add('nav-white');

    return `<main id="maincontent" class="container bottom-navbar">
    <h1 class="center" style="padding-top: 20px;">Favorite Restaurant</h1>
    <div class="grid" id="restaurants"></div>
    </main>`;
  },

  async beforeRender() {
    const restaurantsContainer = document.querySelector('#restaurants');
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 3; index++) {
      restaurantsContainer.innerHTML += createPlaceholderItemTemplate();
    }
  },

  async afterRender() {
    const restaurants = await RestaurantDb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurantsContainer.innerHTML = '';

    if (restaurants.length === 0) {
      const main = document.querySelector('main');
      main.innerHTML = createMspPageTemplate({
        title: 'Empty favorite',
        message: 'no favorite added, to add a favorite click the &hearts; icon in the page restaurant detail',
        button: {
          name: 'Back to home',
          element: 'a',
          href: '#/',
        },
      });
    }
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Favorite;
