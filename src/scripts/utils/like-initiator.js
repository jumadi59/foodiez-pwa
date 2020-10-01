import RestaurantIdb from '../data/restaurant-db';

const LikeButtonInitiator = {
  async init({ container, data }) {
    this._container = container;
    this._restaurant = data;

    await this._renderButton();

    const likeButton = this._container.querySelector('.like');
    likeButton.addEventListener('click', async () => {
      const { id } = this._restaurant;
      if (await this._isRestaurantExist(id)) {
        await RestaurantIdb.deleteRestaurant(id);
      } else {
        await RestaurantIdb.putRestaurant(this._restaurant);
      }
      await this._renderButton();
    });
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
    const likeButton = this._container.querySelector('.like');
    likeButton.classList.remove('liked');
    likeButton.innerHTML = "<i class='material-icons'>favorite_border</i>";
  },

  _renderLiked() {
    const likeButton = this._container.querySelector('.like');
    likeButton.classList.add('liked');
    likeButton.innerHTML = "<i class='material-icons'>favorite</i>";
  },
};

export default LikeButtonInitiator;
