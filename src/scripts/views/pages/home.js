import RestaurantSource from '../../data/restaurant-source';
import {
  createHeroTemplate,
  createPlaceholderItemTemplate,
  createRestaurantItemTemplate,
  createMspPageTemplate,
} from '../templates/template-creator';

const Home = {
  async render({ nav, app }) {
    this._app = app;
    nav.classList.remove('nav-white');
    window.addEventListener('scroll', () => {
      const { scrollY } = window;
      if (scrollY > 400) {
        nav.classList.add('nav-trans-white');
      } else {
        nav.classList.remove('nav-trans-white');
      }
    });

    return `${createHeroTemplate({
      heroImg: 'hero-image_4.jpg',
      title: 'Tasty & Delicious Food',
      description: 'We love food, lots of different food, just like you',
    })}
    <main id="maincontent" class="container">
    <h2 class="center">Explore Restaurant</h2>
    <div class="grid" id="restaurants"></div>
    </main>
      `;
  },

  async beforeRender() {
    const restaurantsContainer = document.querySelector('#restaurants');
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 3; index++) {
      restaurantsContainer.innerHTML += createPlaceholderItemTemplate();
    }
  },

  async afterRender() {
    try {
      const data = await RestaurantSource.restaurants();

      const restaurantsContainer = document.querySelector('#restaurants');
      restaurantsContainer.innerHTML = '';
      data.restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } catch (error) {
      const main = document.querySelector('main');
      main.innerHTML = createMspPageTemplate({
        title: '  Error request',
        message: `Error: ${error}`,
        button: {
          id: 'home-retry',
          name: 'Retry',
        },
      });
      const retry = document.getElementById('home-retry');
      retry.addEventListener('click', async () => {
        await this._app.renderPage();
      });
    }
  },
};

export default Home;
