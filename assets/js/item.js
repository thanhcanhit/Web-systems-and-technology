import StoredItem from "../store/storedItemView.js";
import { formatVND, getImgPath, getTVKhongdau } from "./utility.js";
const localObject = new StoredItem();
const lastId = localObject.getValue();

const itemElement = document.querySelector("#item");
fetch("/assets/data/item.json")
	.then((response) => response.json())
	.then((itemsData) => itemsData.find((item) => item.id === lastId))
	.then((item) => {
		console.log(item);
    window.document.title = item.name;
    window.location.hash = getTVKhongdau(item.name);
		// Breadcrumbs
		fetch("/assets/data/subcategory.json")
			.then((response) => response.json())
			.then((subcategoryData) =>
				subcategoryData.find((sub) => sub.id === item.subcategory_id)
			)
			.then((subcategory) => {
				document.querySelector("#js-breadcrumb").innerHTML = `
      <li class="breadcrumb-item"><a href="/">Trang chủ</a></li>
      <li class="breadcrumb-item"><a href="#">${subcategory.name}</a></li>
      <li class="breadcrumb-item active" aria-current="page">${item.name}</li>`;
			});

		const salePrice =
			item.discount && item.discount > 0
				? (item.price * (100 - item.discount)) / 100
				: 0;
		let currentColor = 0;
		let currentSize = 0;
		let star = (
			item.comments.reduce((sum, current) => sum + current.star, 0) /
			item.comments.length
		).toFixed(1);

		if (star === "NaN") star = 0;

		const renderSize = () => {
			return item.sizes
				.map(
					(size, index) =>
						`<div class="size__item  ${
							index === currentSize ? "active" : ""
						}""><span>${size}</span></div>`
				)
				.join("");
		};

		const renderColor = () => {
			return item.colors
				.map(
					(color, index) => `
      <div 
        class="color__item ${index === currentColor ? "active" : ""}" 
        data-bs-target="#item__library" data-bs-slide-to=${index}
      >
        <img class="" src=${getImgPath(color, item.id)} alt="" title=${color}>
      </div>
      `
				)
				.join("");
		};

		const renderStar = (quantity) => {
			let html = "";
			for (let i = 0; i < Math.floor(quantity); i++)
				html += '<i class="fa-solid fa-star"></i>';

			return html;
		};

		const renderComment = () => {
			return item.comments
				.map(
					(comment) => `
      <div class="comment__item">
        <div class="comment__item-heading d-flex gap-2 align-items-center">
          <b>${comment.user_name}</b>
          <div class="rating text-warning text-12">
            ${renderStar(comment.star)}
          </div>
        </div>
        <p
          class="comment__content border-start border-secondary border-2 ps-2 ms-2 mt-2 text-14 fw-medium">
          ${comment.content}</p>
      </div>`
				)
				.join("");
		};

		// Item
		document.querySelector("#item").innerHTML = `
    <section class="container">
    <div class="item row pb-5">
      <div class="col col-8">
        <div id="item__library" class="carousel slide w-100">
          <div class="carousel-inner">
            ${item.colors
				.map(
					(color, index) => `
            <div class="carousel-item  ${index === 0 ? "active" : ""}">
            <img src=${getImgPath(color, item.id)} class="d-block h-100" alt="">
            <div class="carousel-caption d-none d-md-block">
              <span>${color}</span>
            </div>
          </div>
            `
				)
				.join("")}
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
                  ${item.characteristics
						.map((item) => `<li>${item}</li>`)
						.join("")}
                </ul>
              </div>
            </div>
          </div>
          <!-- Details -->
          ${
				item.details
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
                <img class="img-fluid" src=${item.details} alt="">
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
                  ${renderStar(star)}
                  </div>
                  <div class="quantity">(<span>${
						item.comments.length
					}</span> đánh giá)</div>
                  <button class="btn btn-primary w-50 mx-auto">Gửi đánh giá của bạn</button>
                </div>

                <hr>

                <!-- Comment list -->
                <div class="comment__list">
                  ${renderComment()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- INFO -->
      <div class="col col-4">
        <div class="info" id="item-info">
          <h3 class="name text-20 fw-semibold">${item.name}</h3>
          <div class="rating text-warning">
            ${renderStar(star)}
          </div>
          <div class="pricing">
            ${
				salePrice > 0
					? `<span class="sale-price">${formatVND(salePrice)}</span>`
					: ""
			}
            <span class="price">${formatVND(item.price)}</span>
            ${
				item.discount
					? `<span class="sale-percent">-${item.discount}%</span>`
					: ""
			}
          </div>
          <div class="option w-100">
            <div class="option__color">
              <div class="option__name">Màu sắc: <span class="fw-semibold ms-1">Trắng phối vàng</span></div>
              <div class="color__list">
              ${renderColor()}
            </div>
            <div class="option__size">
              <div class="option__name">Kích thước: <span class="fw-semibold ms-1">M</span></div>
              <div class="size__list">${renderSize()}
              </div>
            </div>
            <div class="option__quantity">
              <div class="option__name">Số lượng:</div>
              <div class="input-qty">
                <div class="input-group" style="width: 35%;">
                  <button class="btn btn-outline-secondary" type="button" id="button-addon1">-</button>
                  <input type="text" class="form-control text-center border-1" value="1" placeholder=""
                    aria-label="Example text with button addon" aria-describedby="button-addon1">
                  <button class="btn btn-outline-secondary" type="button" id="button-addon1">+</button>
                </div>
              </div>
            </div>
          </div>
          <div class="control mt-3 w-100">
            <button class="main-button">Thêm vào giỏ hàng</button>
          </div>
        </div>
      </div>
  </section>`;
	});
