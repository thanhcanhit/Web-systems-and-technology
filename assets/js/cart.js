import { getImgPath, formatVND } from "./utility.js";
import { getAllItemData } from "./data.js";
import CartStored from "../store/CartStored.js";

function EmptyCard() {
	return `
    <div class="cart__empty">
      <img src="/assets/img/cart/blank_cart.svg" alt="" />
      <span class="text-14 fw-medium">Giỏ hàng của bạn trống</span>
      <div>
        <a href="" class="mb-2 main-button">Đăng nhập/Đăng
          ký</a>
        <a href="" class="main-button">Mua ngay</a>
      </div>
    </div>`;
}

function CardListRender(dataList, itemsData) {
	let subTotal = 0;
	const htmlRender = dataList.map((cartItem) => {
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

		return CartItem(item, color, size, quantity, salePrice, sum);
	});

	return { subTotal, listRender: htmlRender.join("") };
}

function CartItem(item, color, size, quantity, salePrice, sum) {
	return `
<tr class="cart__item">
  <td>
    <div class="row">
      <div class="col col-3">
        <img class="img-fluid" src=${getImgPath(color, item.id)} alt=${
		item.name
	}>
      </div>
      <div class="col col-9">
        <div class="h-100 d-flex flex-column justify-content-between">
          <span class="name">${item.name}</span>
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
      <button type="button" class="btn border">-</button>
      <button type="button" class="btn border disabled fw-semibold">${quantity}</button>
      <button type="button" class="btn border ">+</button>
    </div>
  </td>
  <td>
    <div class="h-100 d-flex flex-column justify-content-between">
      <p class="total fw-semibold">${formatVND(sum)}</p>
      <div class="cart__remove mt-auto">
        <i class="fa-solid fa-trash-can"></i>
      </div>
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

function CardRender() {
	const domCart = document.querySelector("#js-cart");
	if (domCart) {
		const dataList = new CartStored().list;

		// Nếu giỏ hàng trống
		if (dataList.length == 0) {
			domCart.innerHTML = EmptyCard();
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
		});
	}
}

CardRender();
