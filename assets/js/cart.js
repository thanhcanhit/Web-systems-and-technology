import { getImgPath, formatVND } from "./utility.js";
import { getAllItemData } from "./data.js";
import CartStored from "../store/CartStored.js";
import ItemViewStored from "../store/ItemViewStored.js";
import { headerRender } from "./header.js";

function EmptyCard() {
	return `
    <div class="cart__empty py-5">
      <img src="/assets/img/cart/blank_cart.svg" alt="" />
      <span class="text-14 fw-medium">Giỏ hàng của bạn trống</span>
      <div>
        <a href="/assets/page/allcategory.html" class="main-button">Mua ngay</a>
      </div>
    </div>`;
}

function CardListRender(dataList, itemsData) {
	let subTotal = 0;
	const htmlRender = dataList.map((cartItem, index) => {
		const item = Array.from(itemsData).find(
			(items) => items.id === cartItem.item_id
		);
		const color = item.colors[cartItem.color];
		const size = item.sizes[cartItem.size];
		const quantity = cartItem.qty;
		const salePrice =
			item.discount && item.discount > 0
				? (item.price * (100 - item.discount)) / 100
				: 0;
		const sum = quantity * (salePrice > 0 ? salePrice : item.price);
		subTotal += sum;

		return CartItem(item, color, size, quantity, salePrice, sum, index);
	});

	return { subTotal, listRender: htmlRender.join("") };
}

function CartItem(item, color, size, quantity, salePrice, sum, index) {
	return `
<tr class="cart__item">
  <td>
    <div class="row" >
      <div class="col col-3">
        <img class="img-fluid" style="cursor: pointer" 
				data-item="${item.id}" src=${getImgPath(color, item.id)} alt=${item.name}>
      </div>
      <div class="col col-9">
        <div class="h-100 d-flex flex-column justify-content-between">
          <span class="name" data-item="${item.id}" style="cursor: pointer" >${
		item.name
	}</span>
          <span class="variant">
            <span class="color">${color}</span>
            /
            <span class="size">${size}</span>
          </span>
        </div>
      </div>
    </div>
  </td>
  <td>
    <div class="cart__item-price">
      ${
			salePrice > 0
				? `<p class="sale-price">${formatVND(salePrice)}</p>`
				: ""
		}
      <p class="price">${formatVND(item.price)}</p>
    </div>
  </td>
  <td>
    <div class="qty btn-group mt-1" role="group" aria-label="Basic example">
      <button type="button" class="btn border disabled fw-semibold">${quantity}</button>
    </div>
  </td>
  <td>
    <div class="h-100 d-flex flex-column justify-content-between">
      <p class="total fw-semibold">${formatVND(sum)}</p>
      <a class="cart__remove mt-auto" data-cart=${index} style="cursor: pointer" >
        <i class="fa-solid fa-trash-can"></i>
      </a>
    </div>
  </td>
</tr>
`;
}

function CartTotal(subTotal, qty) {
	return `
  <div class="d-flex justify-content-between text-14 fw-semibold">
  <p>Tổng đơn hàng (Tạm tính) :</p>
  <span>${formatVND(subTotal)}</span>
  </div>
  <button class="main-button">Đặt hàng (${qty})</button>
`;
}

function CartRender() {
	const domCart = document.querySelector("#js-cart");
	if (domCart) {
		const dataList = new CartStored().list;

		// Nếu giỏ hàng trống
		if (dataList.length == 0) {
			document.querySelector("#js-cart-show").innerHTML = EmptyCard();
			return;
		}

		getAllItemData().then((data) => {
			const domCartList = document.querySelector("#js-cart-list");
			const domSubTotal = document.querySelector("#sub-total");

			let subTotal = 0; // Tổng tiền giỏ hàng
			let htmlList;
			({ subTotal, listRender: htmlList } = CardListRender(
				dataList,
				data
			));

			domCartList.innerHTML = htmlList;

			domSubTotal.innerHTML = CartTotal(subTotal, dataList.length);

			(() => {
				const list = document
					.querySelectorAll("*[data-cart]")
					.forEach((item) =>
						item.addEventListener("click", (e) => {
							const index = item.dataset.cart;
							const cartLocal = new CartStored();
							cartLocal.removeItem(index);
							cartLocal.saveToLocalStorage();
							headerRender();
							CartRender();
						})
					);
			})();

			(() => {
				$("*[data-item]").on("click", (e) => {
					const localItem = new ItemViewStored();
					localItem.itemID = Number(e.target.dataset.item);
					localItem.saveToLocalStorage();
					window.location.href = "/assets/page/item.html";
				});
			})();
		});
	}
}

CartRender();
