/* eslint-disable no-undef */
import LikeButtonInitiator from '../src/scripts/utils/like-initiator';
import FavoriteIdb from '../src/scripts/data/restaurant-db';

describe('Liking A restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  const createButtonLike = async () => LikeButtonInitiator.init({
    container: document.querySelector('#likeButtonContainer'),
    data: { id: 1 },
  });

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await createButtonLike();

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await createButtonLike();

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await createButtonLike();

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteIdb.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });

    FavoriteIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await createButtonLike();

    await FavoriteIdb.putRestaurant({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteIdb.getAllRestaurants()).toEqual([{ id: 1 }]);

    FavoriteIdb.deleteRestaurant(1);
  });

  xit('should not add a restaurant when it has no id', async () => {
    await createButtonLike();

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteIdb.getAllRestaurants()).toEqual([]);
  });
});
