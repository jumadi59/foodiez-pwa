import { createLikeButtonTemplate } from '../views/templates/template-creator';
import RestaurantIdb from '../data/restaurant-db';

const LikeButtonInitiator = {
  async init({ container, data }) {
    this._container = container;
    this._restaurant = data;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await RestaurantIdb.getRestaurant(id);
    console.log(!!restaurant);
    return !!restaurant;
  },

  _renderLike() {
    this._crearElement();
    this._container.innerHTML += createLikeButtonTemplate({ label: 'like this restaurant', iconName: 'favorite_border' });
    const likeButton = this._container.querySelector('#likeButton');

    likeButton.addEventListener('click', async () => {
      await RestaurantIdb.putRestaurant(this._restaurant);
      await this._renderButton();
    });
  },

  _renderLiked() {
    this._crearElement();
    this._container.innerHTML += createLikeButtonTemplate({ label: 'unlike this restaurant', iconName: 'favorite' });
    const likeButton = this._container.querySelector('#likeButton');

    likeButton.addEventListener('click', async () => {
      const { id } = this._restaurant;
      await RestaurantIdb.deleteRestaurant(id);
      await this._renderButton();
    });
  },

  _crearElement() {
    const likeButton = this._container.querySelector('#likeButton');
    if (likeButton) {
      likeButton.parentNode.removeChild(likeButton);
    }
  },
};

export default LikeButtonInitiator;
