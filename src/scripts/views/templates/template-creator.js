import CONFIG from '../../globals/config';

const createHeroTemplate = ({ heroImg, title, description }) => `<div class="hero">
<div class="image-wrapper">
    <img id="img-hero" src="images/heros/${heroImg}" alt="">
    <div class="trans"></div>
</div>
<div class="text">
    <h1>${title}</h1>
    <p>${description}</p>
</div>
</div>`;

const createRestaurantDetailTemplate = (restaurant) => `<div class="image-box">
<img src="${CONFIG.BASE_IMAGE_URL}large/${restaurant.pictureId}" alt="${restaurant.name}">
</div>
<div class="content-box">
<button class="like" aria-label="add or remove to like"></button>
<h1>${restaurant.name}</h1>
<custom-rating rating="${restaurant.rating}" max-rating="5"></custom-rating>
<span class="address"><i class="material-icons">place</i> ${restaurant.address}, ${restaurant.city}</span>
<div class="chips"></div>
<p>${restaurant.description}</p>
</div>
`;

const createRestaurantItemTemplate = (restaurant) => `<div class="card">
<div class="city"><i class="material-icons">place</i> ${restaurant.city}</div>
<a href="/#/detail/${restaurant.id}">
    <div class="image-box">
        <img src="${CONFIG.BASE_IMAGE_URL}medium/${restaurant.pictureId}" alt="${restaurant.name}">
    </div>
</a>
<div class="content-box">
<custom-rating rating="${restaurant.rating}" max-rating="5"></custom-rating>
    <h4><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h4>
    <p>${restaurant.description}</p>
</div>
</div>`;

const createPlaceholderDetailTemplate = () => `<div class="image-box"></div>
<div class="content-box">
<div class="line big"></div>
<custom-rating rating="0" max-rating="5"></custom-rating>
<div class="line medium"></div>
<div class="chips"><div class="chip"></div></div>
<div class="line small"></div>
<div class="line small"></div>
<div class="line small"></div>
<div class="line small"></div>
<div class="line small"></div>
<div class="line small"></div>
<div class="line small"></div>
<div class="line small"></div>
</div>`;

const createPlaceholderItemTemplate = () => `<div class="card placeholder">
<div class="image-box"></div>
<div class="content-box">
    <div class="line big"></div>
    <div class="line small"></div>
    <div class="line small"></div>
    <div class="line small"></div>
</div>
</div>`;

const createMenuItemTemplate = (menu, type) => `<div class="menu">
<img src="images/${type}-default.png" alt="">
<span>${menu.name}</span>
</div>`;

const createReviewItemTemplate = (review) => `<div class="review">
<img src="images/user-default.png"  alt="">
    <div class="review-box">
    <span>${review.name}</span>
    <small>${review.date}</small>
    <p>${review.review}</p>
    </div>
</div>`;

const createReviewItemPlaceholderTemplate = () => `<div class="review placeholder">
<img src="images/user-default.png" alt="" >
    <div class="review-box">
    <div class="line big"></div>
    <div class="line medium"></div>
    <div class="line small"></div>
    <div class="line small"></div>
    </div>
</div>`;

const createCategoriesTemplate = (categories) => {
  let template = '';
  categories.forEach((category) => {
    template += `<div class="chip">${category.name}</div>`;
  }); return template;
};

const createMspPageTemplate = ({ title, message, button = {} }) => {
  const a = typeof button.element === 'string' && button.element === 'a' ? 'a' : 'button';
  return `
    <div class="page-info"><div>
    <i class="material-icons">hourglass_empty</i>
    <span>${title}</span>
    <p>${message}</p>
    ${typeof button === 'object' ? `<${a} class="btn border" 
    ${typeof button.href === 'string' ? `href="${button.href}"` : ''}
    ${typeof button.id === 'string' ? `id="${button.id}"` : ''}
    >${button.name}</${a}>` : ''}
    </div>
    </div>
  `;
};

export {
  createHeroTemplate,
  createRestaurantDetailTemplate,
  createRestaurantItemTemplate,
  createMenuItemTemplate,
  createReviewItemTemplate,
  createPlaceholderDetailTemplate,
  createPlaceholderItemTemplate,
  createCategoriesTemplate,
  createReviewItemPlaceholderTemplate,
  createMspPageTemplate,
};
