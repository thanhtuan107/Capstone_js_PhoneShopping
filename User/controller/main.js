import api from "./../services/api.js";
import renderListCart from "./../controller/main_cart.js";
import ProductList from "../models/ProductList.js";

export const getEleId = (id) => document.getElementById(id);

export let cartArr = [];

const productList = new ProductList();

const renderListProduct = (data) => {
  let content = "";
  data.forEach((product, i) => {
    const { name, screen, backCamera, frontCamera, img, desc, type, price } =
      product;

    content += `
          <div class="card__item hover:shadow-lg w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          <div>
            <div class="card__phone w-3/4 lg:w-full ">
              <img
                class="p-8 rounded-t-lg cardPhone__img"
                src="${product.img}"
                alt="product image"
              />
            </div>
            <div class="px-5 pb-16">
            <div>
                <p
                  class="text-3xl font-bold text-red-600 mb-5"
                  >$${product.price}</p
                >
              </div>
              <a href="#">
                <h5
                  class="text-3xl lg:text-xl font-semibold tracking-tight text-gray-900 " id="cardPhone__title"
                >
                ${product.name}
                </h5>
              </a>
              <div class="cardPhone__text">
                <p class="py-2 text-gray-500 " id="cardPhone__desc">
                <i class="fa-solid fa-clipboard"></i>
                ${product.desc}
                </p>
                <p class="py-2 text-gray-500" id="cardPhone__screen">
                <i class="fa-solid fa-mobile-screen"></i>
                ${product.screen}
                </p>
                <p class="py-2 text-gray-500" id="cardPhone__backCamera">
                <i class="fa-solid fa-camera"></i>
                ${product.backCamera}
                </p>
                <p class="py-2 text-gray-500" id="cardPhone__frontCamera">
                <i class="fa-solid fa-camera-rotate"></i>
                ${product.frontCamera}
                </p>
                <p class="py-2 text-gray-500" id="cardPhone__type">
                <i class="fa-solid fa-tag"></i>
                ${product.type}
                </p>
                <Button
                  class="absolute bottom-5 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onclick="addToCart(${product.id})">Add to cart</Button
                >
                

              </div>
              
              
            </div>
            </div>
                  `;
  });
  getEleId("mainProduct").innerHTML = content;
};

const getListProduct = () => {
  const promise = api.fetchData();
  promise
    .then((result) => {
      renderListProduct(result.data);
      productList.arr = result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

getListProduct();

// Lưu giỏ hàng vào localStorage
export function saveCart(cart) {
  localStorage.setItem("CART__LIST", JSON.stringify(cart));
}

// Popup notification
const showPopup = (message) => {
  const popup = document.createElement("div");
  popup.className = "popup-notification";
  popup.innerText = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 1000);
};

/**
 * Add to cart
 */
const addToCart = (id) => {
  const promise = api.getDataById(id);
  promise
    .then((result) => {
      const { data } = result;
      const existingProduct = cartArr.find((product) => product.id === data.id);
      if (existingProduct) {
        existingProduct.quality += 1;
      } else {
        data.quality = 1;
        cartArr.push(data);
      }

      // Lưu giỏ hàng vào localStorage
      saveCart(cartArr);

      renderListCart();

      // Show popup notification
      showPopup("Sản phẩm đã được thêm vào giỏ hàng!");
    })
    .catch((error) => {
      console.log(error);
    });
};
window.addToCart = addToCart;

const showCart = () => {
  getEleId("cart").style.display = "block";
};
window.showCart = showCart;

const closeCart = () => {
  getEleId("cart").style.display = "none";
};
window.closeCart = closeCart;

/**
 * Filter Product
 */
getEleId("selLoai").addEventListener("change", function () {
  const type = getEleId("selLoai").value;
  console.log(type);

  const productsFilter = productList.filterProduct(type);
  renderListProduct(productsFilter);
});
