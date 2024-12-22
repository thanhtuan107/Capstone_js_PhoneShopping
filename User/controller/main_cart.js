import { getEleId, saveCart } from "./main.js";
import { cartArr } from "./main.js";

// create new object from class CartList

const renderListCart = () => {
  // Lấy dữ liệu từ localStorage
  const dataString = localStorage.getItem("CART__LIST");

  let total = 0;
  let giaTT = 0;
  let soLuongSanPham = 0;

  if (cartArr.length === 0) {
    getEleId("cart__soluong").innerHTML = 0;
    getEleId("cart__giaTT").innerHTML = 0;
    getEleId("cart__tong").innerHTML = 0;
    getEleId("cart__count").style.display = "none";
  }

  // Kiểm tra xem có dữ liệu không
  if (dataString) {
    // Chuyển dữ liệu JSON thành array
    const data = JSON.parse(dataString);

    // Render data
    data.forEach((product) => {
      const { price, quality } = product;

      giaTT += price * quality;
      soLuongSanPham += quality;
    });

    getEleId("cart__soluong").innerHTML = soLuongSanPham;
    getEleId("cart__giaTT").innerHTML = giaTT;
    total = giaTT;
    getEleId("cart__tong").innerHTML = total;
    getEleId("cart__count").style.display = "block";
    getEleId("cart__count").innerHTML = data.length;

    let content = "";
    data.forEach((product) => {
      const { id, name, img, price, quality } = product;
      content += `
        <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div class="space-y-6">
              <div
                class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
              >
                <div
                  class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0"
                >
                  <a href="#" class="shrink-0 order-1">
                    <img
                      class="h-20 w-20 dark:hidden"
                      src="${img}"
                      alt="imac image"
                    />
                  </a>

                  <div
                    class="w-full min-w-0 flex-1 space-y-4 order-2 md:max-w-md"
                  >
                    <a
                      id="cart__name"
                      href="#"
                      class="text-base font-medium text-gray-900 hover:underline dark:text-white"
                    >${name}</a>
                  </div>
                  <div
                    class="flex items-center justify-between order-3 md:justify-end"
                  >
                    <div class="flex items-center">
                      <button
                        type="button"
                        id="decrement-button"
                        data-input-counter-decrement="counter-input"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                      >
                        <svg
                          class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        id="count_input"
                        data-input-counter
                        class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                        placeholder=""
                        value="${quality}"
                        required
                      />
                      <button
                        type="button"
                        id="increment-button"
                        data-input-counter-increment="counter-input"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                      >
                        <svg
                          class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                    <div class="text-end order-4 md:w-32 pl-5 cart__price">
                      <p
                        class="text-base font-bold text-gray-900 dark:text-white ml-10"
                      >
                        $${price}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-4 justify-end">
                  <button
                    type="button"
                    class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                  >
                    <svg
                      class="me-1.5 h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                      />
                    </svg>
                    Add to Favorites
                  </button>

                  <button
                    onclick="handleDeleteCart(${id})"
                    type="button"
                    class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                  >
                    <svg
                      class="me-1.5 h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                    Remove
                  </button>
                </div>
              </div> 
            </div>
            `;
    });

    // Gắn nội dung vào phần tử với id 'mainCart'
    document.getElementById("mainCart").innerHTML = content;

    getEleId("increment-button").addEventListener("click", () => {
      soLuongSanPham = 2;
    });

    getEleId("decrement-button").addEventListener("click", () => {
      if (getEleId("count_input").value > 1) {
        getEleId("count_input").value--;
      }
    });
  }
};
// Gọi hàm renderListCart khi trang được tải
window.renderListCart = renderListCart;

const handleDeleteCart = (id) => {
  // Xoa cart khỏi mảng
  let index = -1;
  for (let i = 0; i < cartArr.length; i++) {
    const cart = cartArr[i];
    if (cart.id == id) {
      index = i;
    }
  }
  if (index !== -1) {
    cartArr.splice(index, 1);
  }

  // Lưu giỏ hàng vào localStorage
  saveCart(cartArr);

  alert("Remove success");

  // Render Cart list
  renderListCart();
};
window.handleDeleteCart = handleDeleteCart;

const thanhtoan = () => {
  alert("Thanh toán thành công");
  localStorage.clear();
  location.reload();

  renderListCart();
};
window.thanhtoan = thanhtoan;

export default renderListCart;
