class ShoppingCart {
  constructor() {
    this.toast = new ToastManager({ position: 'left' });
    this.localStorageManager = new LocalStorageManager();
    this.cartKey = cartCookieName;

    // Available products
    this.productos = [
      {
        id: 1,
        name: 'desc1',
        description: 'desc1',
        image: { src: '/assets/product1.webp', alt: 'desc1' },
        thumbnail: '/assets/product1.webp',
        price: 99,
        total: 99,
        rating: 5.0,
        reviews: 10,
        category: 'bestseller',
        badge: 'MÁS VENDIDO',
        features: ['100% Algodón', '300 Hilos', 'Antialérgicas'],
      },
      {
        id: 2,
        name: 'desc2',
        description: 'desc2',
        image: { src: '/assets/product2.webp', alt: 'desc2' },
        thumbnail: '/assets/product2.webp',
        price: 99,
        total: 99,
        rating: 5.0,
        reviews: 10,
        category: 'alta calidad',
        badge: 'OFERTA',
        features: ['Materiales de alta calidad', 'Alta resistencia', 'Fácil de mantener'],
      },
      {
        id: 3,
        name: 'desc3',
        description: 'desc3',
        image: { src: '/assets/product3.webp', alt: 'desc3' },
        thumbnail: '/assets/product3.webp',
        price: 85,
        total: 85,
        rating: 4.5,
        reviews: 15,
        category: 'novedad',
        badge: 'NUEVO',
        features: ['Ecológico', 'Suavidad superior', 'Resistente al desgaste'],
      },
      {
        id: 4,
        name: 'desc4',
        description: 'desc4',
        image: { src: '/assets/product4.webp', alt: 'desc4' },
        thumbnail: '/assets/product4.webp',
        price: 110,
        total: 110,
        rating: 4.8,
        reviews: 40,
        category: 'edición limitada',
        badge: 'EXCLUSIVO',
        features: ['Diseño exclusivo', 'Tela premium', 'Costuras reforzadas'],
      },
      {
        id: 5,
        name: 'desc5',
        description: 'desc5',
        image: { src: '/assets/product5.webp', alt: 'desc5' },
        thumbnail: '/assets/product5.webp',
        price: 75,
        total: 75,
        rating: 4.7,
        reviews: 25,
        category: 'eco-friendly',
        badge: 'SUSTENTABLE',
        features: ['Algodón orgánico', 'Certificado GOTS', 'Hipoalergénico'],
      },
      {
        id: 6,
        name: 'desc6',
        description: 'desc6',
        image: { src: '/assets/product6.webp', alt: 'desc6' },
        thumbnail: '/assets/product6.webp',
        price: 95,
        total: 95,
        rating: 4.9,
        reviews: 60,
        category: 'destacado',
        badge: 'RECOMENDADO',
        features: ['Alta densidad de hilos', 'Antimanchas', 'Secado rápido'],
      },
      {
        id: 7,
        name: 'desc7',
        description: 'desc7',
        image: { src: '/assets/product7.webp', alt: 'desc7' },
        thumbnail: '/assets/product7.webp',
        price: 65,
        total: 65,
        rating: 4.4,
        reviews: 30,
        category: 'básico',
        badge: 'ESENCIAL',
        features: ['Precio accesible', 'Fácil mantenimiento', 'Variedad de colores'],
      },
      {
        id: 8,
        name: 'desc8',
        description: 'desc8',
        image: { src: '/assets/product8.webp', alt: 'desc8' },
        thumbnail: '/assets/product8.webp',
        price: 130,
        total: 130,
        rating: 4.6,
        reviews: 50,
        category: 'premium',
        badge: 'LUJO',
        features: ['Tela de satén', 'Toque sedoso', 'Garantía 2 años'],
      },
    ];

    // Elementos del DOM
    this.cartButton = document.getElementById('cart-button');
    this.cartSection = document.getElementById('cart-section');
    this.productList = document.getElementById('product-list');
    this.cartButtonSpan = document.getElementById('cart-button-span');
    this.totalPriceLabel = document.getElementById('total-price');

    this.init();
  }

  init() {
    this.renderInitialCart();
    this.updateCartUI();
  }

  getProductById(id) {
    return this.productos.find(product => product.id === id);
  }

  addToCart(id) {
    const cartItems = this.localStorageManager.getItem(this.cartKey) || [];
    const product = this.getProductById(id);

    const isProductInCart = cartItems.some(item => item.id === product.id);
    if (isProductInCart) {
      this.toast.info('Este producto ya está en tu carrito.');
      return;
    }

    // Agregar quantity inicial al producto
    const productWithQuantity = {
      ...product,
      quantity: 1,
      total: product.price * 1,
    };

    cartItems.push(productWithQuantity);
    this.localStorageManager.setItem(this.cartKey, cartItems);
    this.addProductToDOM(productWithQuantity);
    this.updateCartUI();
    this.toast.success('¡Producto agregado al carrito! 🎉');

    if (this.localStorageManager.getItem(this.cartKey).length === 1) {
      this.cartSection.classList.remove('hidden');
    }
  }

  removeFromCart(id) {
    let cartItems = this.localStorageManager.getItem(this.cartKey) || [];

    const updatedCartItems = cartItems.filter(item => item.id !== id);
    this.localStorageManager.setItem(this.cartKey, updatedCartItems);

    const productElement = document.getElementById(`cart-product-${id}`);
    if (productElement) {
      productElement.remove();
    }

    this.updateCartUI();
    this.toast.error('Producto eliminado del carrito.');
  }

  updateCartUI() {
    this.updateCartCount();
    this.updateTotalPrice();
    this.checkCartVisibility();
  }

  updateCartCount() {
    const cartItems = this.localStorageManager.getItem(this.cartKey) || [];
    // Sumar las cantidades de todos los productos
    const totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    this.cartButtonSpan.textContent = totalQuantity;
  }

  updateTotalPrice() {
    const cartItems = this.localStorageManager.getItem(this.cartKey) || [];
    const totalPrice = cartItems.reduce((total, item) => total + (item.total || item.price), 0);
    this.totalPriceLabel.textContent = totalPrice.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
  }

  updateTotalForProduct(id, quantity) {
    const cartItems = this.localStorageManager.getItem(this.cartKey).map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: parseInt(quantity),
          total: item.price * parseInt(quantity),
        };
      }
      return item;
    });

    this.localStorageManager.setItem(this.cartKey, cartItems);
    this.updateCartUI();

    // Actualizar el precio mostrado en el DOM para este producto específico
    const priceElement = document.querySelector(`#cart-product-${id} .product-total-price`);
    if (priceElement) {
      const updatedItem = cartItems.find(item => item.id === id);
      priceElement.textContent = `$${updatedItem.total.toFixed(2)}`;
    }
  }

  checkCartVisibility() {
    const cartItems = this.localStorageManager.getItem(this.cartKey) || [];
    const hasItems = cartItems.length > 0;
    this.cartButton.classList.toggle('hidden', !hasItems);
    if (!hasItems) {
      this.cartSection.classList.add('hidden');
    }
  }

  toggleCartSection() {
    this.cartSection.classList.toggle('hidden');
  }

  generateQuantityOptions(selectedQuantity) {
    let options = '';
    for (let i = 1; i <= 5; i++) {
      const selected = i === selectedQuantity ? 'selected' : '';
      options += `<option value="${i}" ${selected}>${i}</option>`;
    }
    return options;
  }

  addProductToDOM(product) {
    const quantity = product.quantity || 1;
    const totalPrice = product.total || product.price;

    const productHTML = `
          <article id="cart-product-${product.id}" class="py-4 border-b border-gray-200/10 last:border-none">
            <section class="flex items-center gap-4 w-full">
              <img src="${product.image.src}" alt="${product.image.alt}" class="size-24 object-contain rounded-md" />
              <div class="flex-grow flex flex-col gap-2 w-full">
                <div>
                  <h5 class="font-semibold text-lg">${product.name}</h5>
                  <button onclick="shoppingCart.removeFromCart(${product.id})" class="text-red-500 hover:text-red-400 text-sm transition-colors">
                    Eliminar
                  </button>
                </div>
                <div class="flex items-center justify-between min-w-full">
                  <select 
                    name="quantity" 
                    id="quantity-${product.id}" 
                    class="appearance-none rounded-md border-[1px] border-[#f5f7fa] bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.7em] bg-[right_0.7em_center] bg-no-repeat px-8 py-2 text-sm font-normal shadow-sm outline-none focus:border-primary focus:ring-primary" 
                    onchange="shoppingCart.updateTotalForProduct(${product.id}, this.value)"
                  >
                    ${this.generateQuantityOptions(quantity)}
                  </select>
                  <p class="text-base font-medium product-total-price">&dollar;${totalPrice.toFixed(2)}</p>
                </div>
              </div>
            </section>
          </article>`;
    this.productList.innerHTML += productHTML;
  }

  renderInitialCart() {
    const cartItems = this.localStorageManager.getItem(this.cartKey) || [];
    this.productList.innerHTML = ''; // Limpia la lista antes de renderizar
    cartItems.forEach(product => this.addProductToDOM(product));
  }
}
