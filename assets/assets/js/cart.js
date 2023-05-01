import { getImgPath, formatVND } from "./utility.js";
import { getAllItemData } from "./data.js";
import CartStored from "../store/CartStored.js";
import ItemViewStored from "../store/ItemViewStored.js";
import { headerRender } from "./header.js";
import UserStored from "../store/UserStored.js";

const isLogin = new UserStored().isLogin();

console.log(isLogin);

// Trả về thẻ div mô tả giỏ hàng trống
function EmptyCard() {
	return `
    <div class="cart__empty py-5">
      <img src="../img/cart/blank_cart.svg" alt="" />
      <span class="text-14 fw-medium">Giỏ hàng của bạn trống</span>
      <div>
        <a href="../page/allcategory.html" class="main-button">Mua ngay</a>
      </div>
    </div>`;
}
// Render
function CartListRender(dataList, itemsData) {
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
      <a class="cart__remove mt-auto" data-cart=${index} style="cursor: pointer" data-bs-toggle="modal" data-bs-target="#confirm-modal">
        <i class="fa-solid fa-trash-can"></i>
      </a>
    </div>
  </td>
</tr>
`;
}

function CartTotal(subTotal, qty) {
	return `
  <div class="d-flex align-items-center justify-content-between text-14 fw-semibold bg-white p-2 py-3 rounded-2 mb-2">
  <p class="m-0">Tổng đơn hàng (Tạm tính) :</p>
  <span class="text-main text-20">${formatVND(subTotal)}</span>
  </div>
  <button class="main-button">Đặt hàng (${qty})</button>
`;
}

function CartRender() {
	const domCart = document.querySelector("#js-cart");
	if (domCart) {
		const dataList = new CartStored().list;

		// Chưa đăng nhập
		if (!isLogin) {
			document.querySelector(
				"#js-cart-show"
			).innerHTML = `<div class="cart__empty py-5">
										<img src="../img/cart/blank_cart.svg" alt="" />
										<span class="text-14 fw-medium">Bạn phải đăng nhập để sử dụng giỏ hàng</span>
										<div class="d-flex flex-column gap-2">
											<a href="../page/login.html" class="main-button">Đăng nhập</a>
											<a href="../page/signing.html" class="main-button">Đăng ký</a>
										</div>
									</div>`;
			return;
		}

		// Giỏ hàng trống
		if (dataList.length == 0) {
			document.querySelector("#js-cart-show").innerHTML = EmptyCard();
			return;
		}

		getAllItemData().then((data) => {
			const domCartList = document.querySelector("#js-cart-list");
			const domSubTotal = document.querySelector("#sub-total");

			let subTotal = 0; // Tổng tiền giỏ hàng
			let htmlList;
			({ subTotal, listRender: htmlList } = CartListRender(
				dataList,
				data
			));

			domCartList.innerHTML = htmlList;

			domSubTotal.innerHTML = CartTotal(subTotal, dataList.length);

			// Trash event
			(() => {
				const list = document
					.querySelectorAll("*[data-cart]")
					.forEach((item) =>
						item.addEventListener("click", (e) => {

							$("#modal-footer").html(`
							<button type="button" class="btn btn-primary" id="confirm-btn" data-bs-dismiss="modal">Xác nhận</button>
							<button type="button" class="btn btn-warning text-white" data-bs-dismiss="modal">Hủy</button>`);

							$("#confirm-btn").on("click", () => {
								const index = item.dataset.cart;
								const cartLocal = new CartStored();

								cartLocal.removeItem(index);
								cartLocal.saveToLocalStorage();

								headerRender();
								CartRender();
							});
						})
					);
			})();

			(() => {
				$("*[data-item]").on("click", (e) => {
					const localItem = new ItemViewStored();
					localItem.itemID = Number(e.target.dataset.item);
					localItem.saveToLocalStorage();
					window.location.href = "../page/item.html";
				});
			})();
		});
	}
}

CartRender();
