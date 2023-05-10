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
    
    const header = document.querySelector("#header");

		header.outerHTML = `
    <header id="header" class="header container-fluid fixed-top">
      <div class="container d-block d-lg-none">
      <div class="row py-2">
        <div class="col-4 justify-content-start align-items-end">
          <button class="btn h-100" id="js-mobile-menu">
            <i class="fa-solid fa-bars text-20"></i>
          </button>
        </div>
        <div class="col d-flex justify-content-center align-items-center">
          <a href="../page/home.html"><img class="img-fluid" src="../img/shared/header/logo.png" alt=""></a>
        </div>
        <div class="col-4 d-flex justify-content-center">
          <button class="btn" id="js-search-menu">
            <i class="fa-sharp fa-solid fa-magnifying-glass text-20"></i>
          </button>
          <button class="btn">
          <a href="../page/cart.html" class="header__link text-hover-main">
          <span class="fs-4">
            <i class="fa-solid fa-solid fa-cart-shopping position-relative text-black">
              <span class="bg-main text-blue position-absolute top-0 start-100 translate-middle badge rounded-pill"
                style="font-size: 10px">${isLogin ? cartQuantity : 0}</span>
            </i>
          </span>
          </a>
          </button>
        </div>
      </div>
    </div>
    <div id="mobile-left" class="position-fixed w-100 h-100 bg-white top-0  d-block d-lg-none inset-0"
      style="z-index: 10; transform: translateX(-120%); transition: all .5s ease">
      <div class="p-4">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div>
            <a href="../page/home.html"><img class="d-block" src="../img/shared/header/logo.png" alt=""></a>
          </div>
          <button class="btn" id="js-left-close">
            <i class="fs-1 fa-solid fa-xmark"></i>
          </button>
        </div>

        <div>
          <nav class="nav d-flex flex-column">
            <a href="./home.html" class="nav-link text-20 text-hover-main text-black">Trang chủ</a>
            <a href="./allcategory.html" class="nav-link text-20 text-hover-main text-black">Danh mục</a>
            <a href="./info.html" class="nav-link text-20 text-hover-main text-black">Giới thiệu</a>
            <hr>
            ${
				isLogin
					? `<a href="" class="nav-link text-20 text-hover-main text-black" ><span><i class="fa-solid fa-user me-2"></i> ${
							new UserStored().name
					  }</span>
            <a href="./cart.html" class="nav-link text-20 text-hover-main text-black"><i class="fa-solid fa-cart-shopping me-2"></i> Giỏ hàng</a>
            <a class="nav-link text-20 text-hover-main text-black" href="../page/home.html" id="btn-logout2"><i class="fa-solid fa-right-from-bracket me-2"></i>Đăng xuất</a>
            `
					: `
            <a href="./login.html" class="nav-link text-20 text-hover-main text-black">Đăng nhập</a>
            <a href="./sign-up.html" class="nav-link text-20 text-hover-main text-black">Đăng ký</a>`
			}
          </nav>
        </div>
      </div>
    </div>
    <div id="mobile-right" class="position-fixed w-100 h-100 bg-white top-0 d-block d-lg-none  inset-0" style="z-index: 10; transform: translateX(200%); transition: all .5s ease;">
      <div class="p-4">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h3>Tìm kiếm sản phẩm</h3>
          <button class="btn" id="js-right-close">
            <i class="fs-1 fa-solid fa-xmark"></i>
          </button>
        </div>

    <div class="row">
      <div class="input-group">
        <input type="text" class="form-control py-2" id="js-search-input2" placeholder="Tìm kiếm"
          list="search-previous" />
        <button class="btn btn-warning px-4" id="js-search-btn2">
          <i class="fa-solid fa-magnifying-glass fs-5"></i>
        </button>
      </div>
    </div>
  </div>
</div>
<!-- PC -->
    <div class="container py-2 d-none d-lg-block">
      <!-- Search + Address Row -->
      <div class="row align-items-center">
        <a class="col col-4 col-lg-1" href="../page/home.html">
          <img class="img-fluid" src="../img/shared/header/logo.png" alt="logo" />
        </a>
        <div class="col col-8 col-lg-5 ">
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
        <div class="col-md-3 d-none d-lg-flex text-end ms-auto fw-semibold gap-4 text-nowrap">
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
      <div class="row align-items-center justify-content-between mt-2 mt-lg-0">
        <!-- Nav -->
        <div class="col col-8 d-none d-md-block" id="header__nav">
          <nav class="navbar">
            <ul class="navbar-nav d-flex flex-row gap-3">
              <li class="nav-item ${
					window.location.href.includes("/home.html") ? "active" : ""
				}">
                <a class="nav-link fw-semibold text-14  text-blue text-hover-main" href="../page/home.html">
                  Trang chủ
                </a>
              </li>
              <li class="nav-item ${
					window.location.href.includes("/allcategory.html")
						? "active"
						: ""
				}">
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
              <li class="nav-item ${
					window.location.href.includes("/info.html") ? "active" : ""
				}">
                <a class="nav-link fw-semibold text-14 text-blue text-hover-main" href="../page/info.html">Giới thiệu</a>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Cart + Sign in/Sign up -->
        <div class="cart-sign-block col col-10 ms-auto col-md-4 d-flex gap-4 align-items-center fw-semibold">
          <div class="cart d-flex align-items-center gap-2 ms-md-auto" id="js-cart">
          
          <a href="../page/cart.html" class="header__link text-hover-main d-flex align-items-center gap-2">
            <span class="fs-4">
              <i class="fa-solid fa-solid fa-cart-shopping position-relative text-black">
                <span class="bg-main text-blue position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style="font-size: 10px">${isLogin ? cartQuantity : 0}</span>
                  </i>
                  </span>
                  <span class="d-none d-md-inline">Giỏ hàng</span>
          </a>
            
          </div>
          <div class="user d-md-flex align-items-center gap-2">
            <span class="fs-4 d-none d-md-block">
              <i class="fa-solid fa-user"></i>
            </span>
            ${
				isLogin
					? `<a href="" >
          <span >${new UserStored().name}</span>
          <div class="user-menu">
              <ul>
                <li id="btn-logout"><i class="fa-solid fa-right-from-bracket me-2"></i>Đăng xuất</li>
              </ul>
          </div>
          </a>`
					: `<a href="../page/sign-up.html" class="header__link text-hover-main">ĐĂNG KÝ</a>
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
			const input =
				$("#js-search-input").val() || $("#js-search-input2").val();
			const localSearchInput = new SearchStored();
			localSearchInput.input = input;
			localSearchInput.saveToLocalStorage();

			window.location.href = "../page/search.html";
		}

		$("#js-search-btn").on("click", handleSearch);
		$("#js-search-input").on("keydown", (e) => {
			if (e.key == "Enter") handleSearch();
		});

		$("#js-search-btn2").on("click", handleSearch);
		$("#js-search-input2").on("keydown", (e) => {
			if (e.key == "Enter") handleSearch();
		});

		$("#btn-logout").on("click", () => {
			const localUser = new UserStored();
			localUser.logout();
			localUser.saveToLocalStorage();
		});

		$("#btn-logout2").on("click", () => {
			const localUser = new UserStored();
			localUser.logout();
			localUser.saveToLocalStorage();
		});

		headerLayer.addEventListener("mouseenter", toggleLayer);

		// mobile

		$("#js-mobile-menu").on("click", () => {
			document.querySelector("#mobile-left").style.transform =
				"translateX(0)";
		});
		$("#js-left-close").on("click", () => {
			document.querySelector("#mobile-left").style.transform =
				"translateX(-120%)";
		});

		$("#js-search-menu").on("click", () => {
			document.querySelector("#mobile-right").style.transform =
				"translateX(0)";
		});
		$("#js-right-close").on("click", () => {
			document.querySelector("#mobile-right").style.transform =
				"translateX(200%)";
		});

		activeSubCategory();
		activeCategory();
	}
}

headerRender();

export { headerRender };
