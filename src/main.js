let shoppingCart;
const cartCookieName = 'shopping-shminpage.com';

document.addEventListener('DOMContentLoaded', () => {
  shoppingCart = new ShoppingCart();
});

function addProduct(productId) {
  shoppingCart.addToCart(productId);
}
