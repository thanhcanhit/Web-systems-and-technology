import CartStored from "../store/CartStored.js";
import SearchStored from "../store/SearchStored.js";
import UserStored from "../store/UserStored.js";
import { getAllCategoryData, getSubcategoriesWithCategory } from "./data.js";
import { activeCategory, activeSubCategory } from "./shared.js";

// Render header
async function headerRender() {
	const header = document.querySelector("#header");
	if (header) {
		const isLogin = new UserStored().isLogin();
		const cartQuantity = new CartStored().list.length;
		const categoryList = await getAllCategoryData();
		const subcategoryListArray = await Promise.all(
			categoryList.map(async (category) => {
				return await getSubcategoriesWithCategory(category.id);
			})
		);

		header.outerHTML = `
  <header id="header" class="header container-fluid fixed-top">
    <div class="container py-2 d-none d-lg-block">
      <!-- Search + Address Row -->
      <div class="row align-items-center">
        <a class="logo col col-1" href="../page/home.html">
          <img class="img-fluid" src="../img/shared/header/logo.png" alt="logo" />
        </a>
        <div class="col col-5">
          <div class="input-group">
            <input type="text" class="form-control py-2" id="js-search-input" placeholder="Tìm kiếm" list="search-previous" />
            <button class="btn btn-warning px-4" id="js-search-btn">
              <i class="fa-solid fa-magnifying-glass fs-5"></i>
            </button>
          </div>

          <!-- Suggest for search bar -->
          <datalist id="search-previous" hidden>
            <option value="Áo polo"></option>
            <option value="Quần tây nam"></option>
            <option value="Áo khoác"></option>
            <option value="Đồ thể thao"></option>
          </datalist>
        </div>
        <div class="col col-3 text-end ms-auto d-flex fw-semibold gap-4 text-nowrap">
          <div>
            <a class="header__link" href="#">
              <i class="fa-solid fa-location-dot"></i>
              <span class="text-14 text-hover-main">Tìm
                <span class="fs-6 text-black">220</span>
                cửa hàng</span>
            </a>
          </div>
          <div>
            <a class="header__link" href="tel:+1800 2086">
              <i class="fa-solid fa-phone"></i>
              <span>1800 2086</span>
            </a>
            <span class="badge bg-warning text-black rounded-4 py-2 ms-2">FREE</span>
          </div>
        </div>
      </div>

      <!-- Navigation + Sign in/Sign up Row-->
      <div class="row align-items-center justify-content-between">
        <!-- Nav -->
        <div class="col col-8">
          <nav class="navbar">
            <ul class="navbar-nav d-flex flex-row gap-3">
              <li class="nav-item ${window.location.href.includes('/home.html')? 'active': ''}">
                <a class="nav-link fw-semibold text-14 text-blue text-hover-main" href="../page/home.html">
                  Trang chủ
                </a>
              </li>
              <li class="nav-item ${window.location.href.includes('/allcategory.html')? 'active': ''}">
                <a class="nav-link fw-semibold text-14 text-blue text-hover-main"
                  href="../page/allcategory.html">Danh mục</a>
                <div class="sub-nav container">
                  <div class="sub-nav__content row mx-auto p-4">
                    <div class="col col-9 row row-gap-4">
                    ${categoryList
						.map(
							(category, index) => `
                                <div class="col col-3">
                                  <ul class="sub-nav__list">
                                    <li class="sub-nav__item">
                                     <a href="../page/category.html" data-category="${
											category.id
										}">
                                      <h4 class="sub-nav__header">
                                        ${category.name}
                                      </h4>
                                    </a>
                                    </li>
                                    ${subcategoryListArray[index]
										.map(
											(subcategory) => `
                                    <li class="sub-nav__item">
                                      <a class="sub-nav__link" href="../page/category.html" data-subcategory="${subcategory.id}">${subcategory.name}</a>
                                    </li>
                                    `
										)
										.join("")}
                                  </ul>
                                </div>`
						)
						.join("")}
                  </div>
                  <!-- IMG -->
                    <div class="col ms-auto col-3">
                      <a href="">
                        <img class="img-fluid rounded-4 w-75 object-fit-cover mt-4 ms-4"
                          src="../img/shared/header/category_men.jpg" alt="Men category" />
                      </a>
                    </div>
                </div>
              </li>
              <li class="nav-item ${window.location.href.includes('/info.html')? 'active': ''}">
                <a class="nav-link fw-semibold text-14 text-blue text-hover-main" href="../page/info.html">Giới thiệu</a>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Cart + Sign in/Sign up -->
        <div class="cart-sign-block col col-4 d-flex gap-4 align-items-center fw-semibold">
          <div class="cart d-flex align-items-center gap-2 ms-auto" id="js-cart">
            <span class="fs-4">
              <i class="fa-solid fa-solid fa-cart-shopping position-relative">
                <span class="bg-main text-blue position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style="font-size: 10px">${isLogin ? cartQuantity : 0}</span>
              </i>
            </span>
            <a href="../page/cart.html" class="header__link text-hover-main"><span>GIỎ HÀNG</span></a>
            
          </div>
          <div class="user d-flex align-items-center gap-2">
            <span class="fs-4">
              <i class="fa-solid fa-user"></i>
            </span>
            ${
				isLogin
					? `<a href="">
          ${new UserStored().name}
          <div class="user-menu">
              <ul>
                <li id="btn-logout"><i class="fa-solid fa-right-from-bracket me-2"></i>Đăng xuất</li>
              </ul>
          </div>
          </a>`
					: `<a href="../page/signin.html" class="header__link text-hover-main">ĐĂNG KÝ</a>
          <span>/</span>
          <a href="../page/login.html" class="header__link text-hover-main">ĐĂNG NHẬP</a>`
			}
          </div>
        </div>
      </div>
    </div>

    <div class="layer"></div>
  </header>`;
		const headerLayer = document.querySelector(".layer");

		const toggleLayer = () => {
			const subNavList = document.querySelectorAll(".sub-nav");
			const subNavDisplay = (() => {
				for (let i = 0; i < subNavList.length; i++) {
					if (
						window.getComputedStyle(subNavList[i]).display ==
						"block"
					)
						return true;
				}
				return false;
			})();

			if (subNavDisplay) $(".layer").show();
			else {
				$(".layer").fadeOut();
			}
		};

		document.querySelectorAll(".nav-item").forEach((item) => {
			item.addEventListener("mouseenter", toggleLayer);
			item.addEventListener("mouseout", toggleLayer);
		});

		function handleSearch() {
			const input = $("#js-search-input").val();
			const localSearchInput = new SearchStored();
			localSearchInput.input = input;
			localSearchInput.saveToLocalStorage();

			window.location.href = "../page/search.html";
		}

		$("#js-search-btn").on("click", handleSearch);
		$("#js-search-input").on("keydown", (e) => {
			if (e.key == "Enter") handleSearch();
		});

		$("#btn-logout").on("click", () => {
			const localUser = new UserStored();
			localUser.logout();
			localUser.saveToLocalStorage();
		});

		headerLayer.addEventListener("mouseenter", toggleLayer);

		activeSubCategory();
		activeCategory();
	}
}

headerRender();

export { headerRender };
