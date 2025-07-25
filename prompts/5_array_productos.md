# Prompt (HTML → Array JS)

Toma la siguiente **estructura HTML** de tarjetas de producto y extrae/transforma los datos para rellenar **exactamente** este array en JavaScript (solo el código, sin explicaciones ni comentarios):

```js
this.productos = [
  {
    id: <secuencia 1,2,3…>,
    name: <nombre del producto, inferido del HTML>,
    description: <descripción del producto, extraída o generada>,
    image: { src: "/assets/productX.webp", alt: <alt del `<img>`> },
    thumbnail: "/assets/productX.webp",
    price: <número del precio sin “$” ni “MXN”>,
    total: <igual a price>,
    rating: 0.0,
    reviews: 0,
    category: "",
    badge: <texto de badge si existe o "" si no>,
    features: []
  },
  // …uno por tarjeta HTML
];
```

---

**CONTENIDO HTML**:

```html
<!-- tu HTML aquí -->
```
