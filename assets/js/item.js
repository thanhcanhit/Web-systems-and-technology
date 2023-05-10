import ItemViewStored from "../store/ItemViewStored.js";
import { formatVND, getImgPath } from "./utility.js";
import { getAllItemData, getItem, getSubcategory } from "./data.js";
import CartStored from "../store/CartStored.js";
import Item from "../components/Item/Item.js";
import { activeHorizontalSlider, activeItem, activeSubCategory } from "../js/shared.js";
import { headerRender } from "./header.js";
import UserStored from "../store/UserStored.js";

const localID = new ItemViewStored().itemID;
const domItem = document.querySelector("#item");
if (domItem) {
	// Data
	let currentItem = await getItem(localID);
	if (currentItem) {
		let currentSubcategory = await getSubcategory(
			currentItem.subcategory_id
		);

		// Value
		const { colors, id, sizes, comments } = currentItem;
		const salePrice =
			currentItem.discount && currentItem.discount > 0
				? (currentItem.price * (100 - currentItem.discount)) / 100
				: 0;
		let star = (
			currentItem.comments.reduce(
				(sum, current) => sum + current.star,
				0
			) / currentItem.comments.length
		).toFixed(1);
		star = star !== "NaN" ? star : 0;

		// State
		var currentColor = 0;
		var currentSize = 0;
		var currentQty = 1;

		// Title
		window.document.title = currentItem.name;

		function SubcategoryRender() {
			document.querySelector("#js-breadcrumb").innerHTML = `
      <li class="breadcrumb-item"><a href="../page/home.html">Trang chủ</a></li>
      <li class="breadcrumb-item"><a href="../page/category.html" data-subcategory=${currentSubcategory.id}>${currentSubcategory.name}</a></li>
      <li class="breadcrumb-item d-none d-md-inline active" aria-current="page">${currentItem.name}</li>`;
		}

		const modal = (isLogin) => {
			let title = isLogin
				? "Đã thêm vào giỏ hàng thành công"
				: "Bạn phải đăng nhập để sử dụng tính năng này";

			document.querySelector(
				"#js-modal"
			).innerHTML = `<div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addToCartCompleteLabel">${title}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="d-flex justify-content-center"><img src="../img/cart/blank_cart.svg" alt=""></div>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            ${
				isLogin
					? `<a href="../page/cart.html"> <button type="button" class="main-button" data-bs-dismiss="modal">Đi đến
								giỏ hàng</button></a> <a><button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button></a>`
					: `<a href="../page/login.html"> <button type="button" class="main-button" data-bs-dismiss="modal">Đăng nhập</button></a>
					<a href="../page/signin.html"> <button type="button" class="main-button" data-bs-dismiss="modal">Đăng ký</button></a>`
			}
            
          </div>
        </div>`;
		};

		const ItemSizes = () => {
			const wrapper = document.createElement("div");
			wrapper.className = "size__list";
			wrapper.id = "js-size-list";
			sizes.forEach((size, index) => {
				const sizeItem = document.createElement("div");
				sizeItem.className = "size__item";
				sizeItem.classList.toggle("active", index === currentSize);
				sizeItem.innerHTML = `<span>${size}</span>`;
				sizeItem.addEventListener("click", () => {
					currentSize = index;
					ItemInfoRender();
				});
				wrapper.appendChild(sizeItem);
			});

			return wrapper;
		};

		const ItemSizesRender = () => {
			const oldE = domItem.querySelector("#js-size-list");
			const newE = ItemSizes(currentItem.colors, currentItem.id);
			oldE.parentElement.replaceChild(newE, oldE);
		};

		const ItemColors = () => {
			const Wrapper = document.createElement("div");
			Wrapper.className = "color__list";
			Wrapper.id = "js-color-list";

			colors.forEach((color, index) => {
				const colorItem = document.createElement("div");
				colorItem.className = "color__item";
				colorItem.classList.toggle("active", index === currentColor);
				colorItem.dataset.bsTarget = "#item__library";
				colorItem.dataset.bsSlideTo = index;
				colorItem.innerHTML = `<img class="" src=${getImgPath(
					color,
					id
				)} alt=${color} onerror="this.src='../img/shared/error-img.png'" title=${color}>`;
				colorItem.addEventListener("click", () => {
					currentColor = index;
					ItemInfoRender();
				});
				Wrapper.appendChild(colorItem);
			});

			return Wrapper;
		};

		const ItemColorsRender = () => {
			const oldE = domItem.querySelector("#js-color-list");
			const newE = ItemColors(currentItem.colors, currentItem.id);
			oldE.parentElement.replaceChild(newE, oldE);
		};

		const ItemColorsDisplayImg = () => {
			const html = colors.map(
				(color, index) => `
          <div class="carousel-item ${index === currentColor ? "active" : ""}">
          <img src=${getImgPath(
				color,
				id
			)} onerror="this.src='../img/shared/error-img.png'" class="d-block h-100  carousel-img" alt="">
          <div class="carousel-caption d-none d-md-block">
            <span>${color}</span>
          </div>
        </div>
          `
			);
			return html.join("");
		};

		function QtyRender() {
			const qtyDom = document.querySelector(".ca-quantity");

			const remove = document.createElement("button");
			remove.className = "btn btn-outline-secondary";
			remove.type = "button";
			remove.id = "ca-button-remove";
			remove.innerHTML = "-";
			remove.addEventListener("click", () => {
				if (currentQty > 1) currentQty--;
				ItemInfoRender();
			});

			const value = document.createElement("input");
			value.type = "text";
			value.className = "form-control text-center border-1";
			value.id = "ca-value";
			value.value = currentQty;

			const add = document.createElement("button");
			add.className = "btn btn-outline-secondary";
			add.type = "button";
			add.id = "ca-button-add";
			add.innerHTML = "+";
			add.addEventListener("click", () => {
				currentQty++;
				ItemInfoRender();
			});

			qtyDom.replaceChild(
				remove,
				qtyDom.querySelector("#ca-button-remove")
			);
			qtyDom.replaceChild(value, qtyDom.querySelector("#ca-value"));
			qtyDom.replaceChild(add, qtyDom.querySelector("#ca-button-add"));
		}

		const Rating = (quantity) => {
			let html = "";
			for (let i = 0; i < Math.floor(quantity); i++)
				html += '<i class="fa-solid fa-star"></i>';

			return html;
		};

		const ItemComments = () => {
			const html = comments.map(
				(comment) => `
    <div class="comment__item">
      <div class="comment__item-heading d-flex gap-2 align-items-center">
        <b>${comment.user_name}</b>
        <div class="rating text-warning text-12">
          ${Rating(comment.star)}
        </div>
      </div>
      <p
        class="comment__content border-start border-secondary border-2 ps-2 ms-2 mt-2 text-14 fw-medium">
        ${comment.content}</p>
    </div>`
			);
			return html.join("");
		};

		const AddToCartRender = () => {
			const oldBtn = domItem.querySelector("#btn-add-to-cart");
			const newBtn = document.createElement("button");
			newBtn.setAttribute("data-bs-toggle", "modal");
			newBtn.setAttribute("data-bs-target", "#addToCartComplete");

			newBtn.classList = oldBtn.classList;
			newBtn.id = oldBtn.id;
			newBtn.innerHTML = oldBtn.innerHTML;
			newBtn.addEventListener("click", (e) => {
				const isLogin = new UserStored().isLogin();
				modal(isLogin);
				if (!isLogin) return;

				const cartItem = {
					item_id: id,
					qty: currentQty,
					color: currentColor,
					size: currentSize,
				};
				// Add to local storage
				const cartStorage = new CartStored();
				cartStorage.addItem(cartItem);
				cartStorage.saveToLocalStorage();
				headerRender();
			});

			oldBtn.parentElement.replaceChild(newBtn, oldBtn);
		};

		function ItemInfoRender() {
			const domInfo = domItem.querySelector("#js-item-info");

			domInfo.innerHTML = `
    <div class="info" id="item-info">
      <h3 class="name text-20 fw-semibold">${currentItem.name}</h3>
      <div class="rating text-warning">
        ${Rating(star)}
      </div>
      <div class="pricing">
        ${
			salePrice > 0
				? `<span class="sale-price">${formatVND(salePrice)}</span>`
				: ""
		}
        <span class="price">${formatVND(currentItem.price)}</span>
        ${
			currentItem.discount
				? `<span class="sale-percent">-${currentItem.discount}%</span>`
				: ""
		}
      </div>
      <div class="option w-100">
        <div class="option__color">
          <div class="option__name">Màu sắc: 
            <span class="fw-semibold ms-1">
              ${currentItem.colors.find(
					(color, index) => index === currentColor
				)}
            </span>
          </div>
          <div class="color__list" id="js-color-list">
        </div>
        <div class="option__size">
          <div class="option__name">Kích thước: <span class="fw-semibold ms-1">${
				sizes[currentSize]
			}</span></div>
          <div class="size__list" id="js-size-list">
          </div>
        </div>
        <div class="option__quantity">
          <div class="option__name">Số lượng:</div>
          <div class="input-qty">
            <div class="input-group ca-quantity" style="width: 35%;">
              <button class="btn btn-outline-secondary" type="button" id="ca-button-remove">-</button>
              <input  type="text" class="form-control text-center border-1" id="ca-value" placeholder="">
              <button class="btn btn-outline-secondary" type="button" id="ca-button-add">+</button>
            </div>
          </div>
        </div>
      </div>
    <div class="control mt-3 w-100">
      <button class="main-button" id="btn-add-to-cart" >Thêm vào giỏ hàng <i class="fa-solid fa-cart-plus fa-bounce ms-2"></i></button>
    </div>
  </div>`;

			// Render options
			ItemColorsRender();
			ItemSizesRender();
			QtyRender();
			AddToCartRender();
		}

		function ItemRender() {
			domItem.innerHTML = `
    <section class="container">
    <div class="item row pb-5">
      <div class="col col-12 col-md-8">
        <div id="item__library" class="carousel slide w-100" style="overflow: hidden">
          <div class="carousel-inner">
            ${ItemColorsDisplayImg(
				currentItem.colors,
				currentItem.id,
				currentColor
			)}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#item__library" data-bs-slide="prev">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#item__library" data-bs-slide="next">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        <!-- Item more info -->
        <div class="accordion" id="item-more">
          <!-- Properties -->
          <div class="accordion-item">
            <h2 class="accordion-header fw-semibold">
              <button class="accordion-button  bg-white text-black fw-semibold" type="button"
                data-bs-toggle="collapse" data-bs-target="#properties" aria-expanded="true"
                aria-controls="collapseOne">
                <span class="text-uppercase text-14">Đặc tính nổi bật</span>
              </button>
            </h2>
            <div id="properties" class="accordion-collapse collapse show">
              <div class="accordion-body">
                <ul class="text-14 fw-medium d-flex flex-column gap-2">
                  ${currentItem.characteristics
						.map((item) => `<li>${item}</li>`)
						.join("")}
                </ul>
              </div>
            </div>
          </div>
          <!-- Details -->
          ${
				currentItem.details
					? `
            <div class="accordion-item">
            <h2 class="accordion-header fw-semibold">
              <button class="accordion-button  bg-white text-black fw-semibold" type="button"
                data-bs-toggle="collapse" data-bs-target="#details" aria-expanded="true"
                aria-controls="collapseOne">
                <span class="text-uppercase text-14">Chi tiết sản phẩm</span>
              </button>
            </h2>
            <div id="details" class="accordion-collapse collapse show">
              <div class="accordion-body">
                <img class="img-fluid" src=${currentItem.details} alt="">
              </div>
            </div>
          </div>`
					: ""
			}
          <!-- Comments -->
          <div class="accordion-item">
            <h2 class="accordion-header fw-semibold">
              <button class="accordion-button  bg-white text-black fw-semibold" type="button"
                data-bs-toggle="collapse" data-bs-target="#comments" aria-expanded="true"
                aria-controls="collapseOne">
                <span class="text-uppercase text-14">Đánh giá</span>
              </button>
            </h2>
            <div id="comments" class="accordion-collapse collapse show">
              <div class="accordion-body">
                <div class="overall">
                  <div class="score fw-bold fs-2 "><span>${star}</span>/5</div>
                  <div class="rating text-warning fs-3">
                  ${Rating(star)}
                  </div>
                  <div class="quantity">(<span>${
						currentItem.comments.length
					}</span> đánh giá)</div>
                  <button class="btn btn-primary  w-auto mx-auto">Gửi đánh giá của bạn</button>
                </div>

                <hr>

                <!-- Comment list -->
                <div class="comment__list">
                  ${ItemComments(currentItem.comments)}
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <!--Item info -->
      <div class="col col-12 col-lg-4" id="js-item-info">
        
      </div>
			
  </section>`;
		}

		SubcategoryRender();
		ItemRender();
		ItemInfoRender();
	}
}

// Suggest
const dataItems = await getAllItemData();
const filterItems = dataItems.filter(
	(item) => item.subcategory_id === dataItems[localID].subcategory_id
);
const domSuggest = document.querySelector("#js-suggest");
domSuggest.innerHTML = filterItems
	? `
<div class="container">
	<h4 class="mb-4">SẢN PHẨM TƯƠNG TỰ</h4>
	<div class="h-slider">
		<section class="h-slider__list">
			${filterItems.map((item) => Item(item)).join("")}
		</section>
	</div>
</div>`
	: ``;

activeHorizontalSlider();
activeItem();
activeSubCategory();
