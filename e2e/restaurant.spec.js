/* eslint-disable no-undef */
const assert = require('assert');

Feature('Like Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorites');
});

Scenario('menampilkan empty restoran', ({ I }) => {
  I.seeElement('.page-info');
  I.see('hourglass_empty', 'i.material-icons');
});

Scenario('menyukai restoran urutan pertama', async ({ I }) => {
  I.see('hourglass_empty', 'i.material-icons');

  I.amOnPage('/');

  I.seeElement('.card a');
  const firstCard = locate('.card a').first();
  const firstCardTitle = await I.grabTextFrom(firstCard);
  I.click(firstCard);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');

  I.seeElement('.card a');
  const likedCardTitle = await I.grabTextFrom('.card a');
  assert.strictEqual(firstCardTitle, likedCardTitle);
});

Scenario('membatalkan like restoran', async ({ I }) => {
  I.see('hourglass_empty', 'i.material-icons');

  I.amOnPage('/');

  I.seeElement('.card a');
  const firstCardHome = locate('.card a').first();
  const likedCardHomeTitle = await I.grabTextFrom(firstCardHome);
  I.click(firstCardHome);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');

  I.seeElement('.card a');
  const firstCardFavorite = locate('.card a').first();
  const likedCardFavoriteTitle = await I.grabTextFrom('.card a');
  assert.strictEqual(likedCardHomeTitle, likedCardFavoriteTitle);

  I.click(firstCardFavorite);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');

  I.seeElement('.page-info');
  const pageEmpty = await I.grabTextFrom('.page-info');
  assert.notStrictEqual(pageEmpty, likedCardFavoriteTitle);
});

Scenario('menambahkan customer review restoran', async ({ I }) => {
  I.see('hourglass_empty', 'i.material-icons');

  I.amOnPage('/');

  I.seeElement('.card a');
  const firstCard = locate('.card a').first();
  I.click(firstCard);

  I.fillField('#input-name', 'boot');
  I.fillField('#input-review', 'testing end to end');
  I.click('#post-review');
});
