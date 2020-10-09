/* eslint-disable no-undef */
import LikeButtonInitiator from '../src/scripts/utils/like-initiator';
import FavoriteIdb from '../src/scripts/data/restaurant-db';

describe('Unliking A restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></button></div>';
  };

  const createButtonLike = async () => LikeButtonInitiator.init({
    container: document.querySelector('#likeButtonContainer'),
    data: { id: 1 },
  });

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteIdb.deleteRestaurant(1);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await createButtonLike();

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    await createButtonLike();

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await createButtonLike();

    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

    expect(await FavoriteIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await createButtonLike();

    await FavoriteIdb.deleteRestaurant(1);

    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

    expect(await FavoriteIdb.getAllRestaurants()).toEqual([]);
  });
});
