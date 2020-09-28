import RestaurantSource from '../data/restaurant-source';
import Snackbar from './snackbar';
import { createReviewItemTemplate, createReviewItemPlaceholderTemplate } from '../views/templates/template-creator';

const Review = async ({ id, name, review }) => {
  const contentReviews = document.querySelector('#content-reviews');
  const countReview = contentReviews.parentNode.querySelector('h3');
  const reviews = contentReviews.innerHTML;

  contentReviews.innerHTML = '';
  contentReviews.innerHTML += createReviewItemPlaceholderTemplate();
  contentReviews.innerHTML += reviews;

  try {
    const response = await RestaurantSource.addReview({ id, name, review });
    contentReviews.innerHTML = '';

    if (response.error) {
      Snackbar.create({
        message: response.message,
        root: contentReviews,
      }).show();
    } else {
      countReview.innerHTML = `Reviews(${response.customerReviews.length})`;
      contentReviews.innerHTML = createReviewItemTemplate({
        name,
        review,
        date: new Date().toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      });
    }
    contentReviews.innerHTML += reviews;
  } catch (error) {
    contentReviews.innerHTML = reviews;
    Snackbar.create({
      message: `Error: ${error}`,
      root: contentReviews,
    }).show();
  }
};

export default Review;
