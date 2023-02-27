// Render header
const header = document.querySelector("#header");

const headerClass = "header container-fluid fixed-top";
header.classList = headerClass;

header.innerHTML = `<div class="container py-2">
<!-- Search + Address Row -->
<div class="row align-items-center">
	<a class="col col-1" href="#">
		<img
			class="img-fluid"
			src="./assets/img/shared/header/logo.svg"
			alt="logo"
		/>
	</a>
	<div class="col col-5">
		<div class="input-group">
			<input
				type="text"
				class="form-control py-2"
				placeholder="Tìm kiếm"
				list="search-previous"
			/>
			<button class="btn btn-warning px-4">
				<i
					class="fa-solid fa-magnifying-glass fs-5"
				></i>
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
	<div
		class="col col-3 text-end ms-auto d-flex fw-semibold gap-4 text-nowrap"
	>
		<div>
			<a class="header__link" href="#">
				<i class="fa-solid fa-location-dot"></i>
				<span class="text-14 text-hover-main"
					>Tìm
					<span class="fs-6 text-black">220</span>
					cửa hàng</span
				>
			</a>
		</div>
		<div>
			<a class="header__link" href="tel:+1800 2086">
				<i class="fa-solid fa-phone"></i>
				<span>1800 2086</span>
			</a>
			<span
				class="badge bg-warning text-black rounded-4 py-2 ms-2"
				>FREE</span
			>
		</div>
	</div>
</div>

<!-- Navigation + Sign in/Sign up Row-->
<div class="row align-items-center justify-content-between">
	<!-- Nav -->
	<div class="col col-8">
		<nav class="navbar">
			<ul class="navbar-nav d-flex flex-row gap-5">
				<li class="nav-item active">
					<a
						class="nav-link fw-semibold text-14 text-blue text-hover-main"
						href="#"
					>
						Trang chủ
					</a>
				</li>
				<li class="nav-item">
					<a
						class="nav-link fw-semibold text-14 text-blue text-hover-main"
						href="#"
						>Danh mục</a
					>
					<div class="sub-nav container">
						<div
							class="sub-nav__content row mx-auto p-4"
						>
							<div
								class="col col-9 row row-gap-4"
							>
								<!-- Column 1 -->
								<div class="col col-3">
									<ul class="sub-nav__list">
										<li
											class="sub-nav__item"
										>
											<h4
												class="sub-nav__header"
											>
												ÁO NAM
											</h4>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Áo Polo</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Áo Thun</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Áo khoác</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Áo sơ mi</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Áo len</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Áo nỉ</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Áo vest</a
											>
										</li>
									</ul>
								</div>
								<!-- Column 2 -->
								<div class="col col-3">
									<ul class="sub-nav__list">
										<li
											class="sub-nav__item"
										>
											<h4
												class="sub-nav__header"
											>
												QUẦN NAM
											</h4>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Quần Jeans</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Quần Âu</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Quần Kaki</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Quần Short</a
											>
										</li>
									</ul>
								</div>
								<!-- Column 3 -->
								<div class="col col-3">
									<ul class="sub-nav__list">
										<li
											class="sub-nav__item"
										>
											<h4
												class="sub-nav__header"
											>
												ĐỒ THỂ THAO NAM
											</h4>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Bộ thể thao</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Áo thun thể
												thao</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Áo polo thể
												thao</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Quần thể
												Thao</a
											>
										</li>
									</ul>
								</div>
								<!-- Column 4 -->
								<div class="col col-3">
									<ul class="sub-nav__list">
										<li
											class="sub-nav__item"
										>
											<h4
												class="sub-nav__header text-red"
											>
												NỔI BẬT
											</h4>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Hàng mới về</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Bán chạy
												nhất</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Khử mùi vượt
												trội</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Thoáng mát tối
												đa</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Chống UV</a
											>
										</li>
									</ul>
								</div>
								<!-- Column 5 -->
								<div class="col col-3">
									<ul class="sub-nav__list">
										<li
											class="sub-nav__item"
										>
											<h4
												class="sub-nav__header"
											>
												ĐỒ BỘ NAM
											</h4>
										</li>
									</ul>
								</div>
								<!-- Column 6 -->
								<div class="col col-3">
									<ul class="sub-nav__list">
										<li
											class="sub-nav__item"
										>
											<h4
												class="sub-nav__header"
											>
												ĐỒ MẶC TRONG NAM
											</h4>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Áo ba lỗ</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Áo giữ nhiệt</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Quần lót</a
											>
										</li>
									</ul>
								</div>
								<!-- Column 7 -->
								<div class="col col-3">
									<ul class="sub-nav__list">
										<li
											class="sub-nav__item"
										>
											<h4
												class="sub-nav__header"
											>
												PHỤ KIỆN NAM
											</h4>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Thắt lưng</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Giày</a
											>
										</li>
										<li
											class="sub-nav__item"
										>
											<a
												class="sub-nav__link"
												href=""
												>Phụ kiện
												khác</a
											>
										</li>
									</ul>
								</div>
							</div>

							<!-- IMG -->
							<div class="col col-3">
								<a href="">
									<img
										class="img-fluid rounded-4 w-75 object-fit-cover mt-4 ms-4"
										src="./assets/img/shared/header/category_men.jpg"
										alt="Men category"
									/>
								</a>
							</div>
						</div>
					</div>
				</li>
				<li class="nav-item">
					<a
						class="nav-link fw-semibold text-14 text-blue text-hover-main"
						href="#"
					>
						Bộ sưu tập
					</a>
				</li>
				<li class="nav-item">
					<a
						class="nav-link fw-semibold text-14 text-blue text-hover-main"
						href="#"
						>Đồng phục</a
					>
				</li>
				<li class="nav-item">
					<a
						class="nav-link fw-semibold text-14 text-blue text-hover-main"
						href="#"
						>Thành viên</a
					>
				</li>
			</ul>
		</nav>
	</div>

	<!-- Sign in/Sign up -->
	<div
		class="col col-4 d-flex gap-4 align-items-center fw-semibold"
	>
		<div
			class="cart d-flex align-items-center gap-2 ms-auto"
		>
			<span class="fs-4">
				<i
					class="fa-solid fa-bag-shopping position-relative"
				>
					<span
						class="bg-main text-blue position-absolute top-0 start-100 translate-middle badge rounded-pill"
						style="font-size: 10px"
						>0</span
					>
				</i>
			</span>
			<a href="/cart" class="header__link text-hover-main"
				><span>GIỎ HÀNG</span></a
			>
			<div class="cart__content">
				<div class="cart__empty">
					<img
						src="./assets/img/shared/header/blank_cart.svg"
						alt=""
					/>
					<span class="text-14 fw-medium"
						>Giỏ hàng của bạn trống</span
					>
					<a
						href=""
						class="text-black text-hover-main fw-medium text-decoration-none text-14"
						>Đăng nhập/Đăng ký</a
					>
					<a
						href=""
						class="text-black text-hover-main fw-medium text-decoration-none text-14"
						>Mua ngay</a
					>
				</div>
			</div>
		</div>
		<div class="d-flex align-items-center gap-2">
			<span class="fs-4">
				<i class="fa-solid fa-user"></i>
			</span>
			<a
				href="/sign-up"
				class="header__link text-hover-main"
				>ĐĂNG KÝ</a
			>
			<span>/</span>
			<a
				href="/sign-in"
				class="header__link text-hover-main"
				>ĐĂNG NHẬP</a
			>
		</div>
	</div>
</div>
</div>

<div class="layer"></div>`;

// Handle show/hide cover layer
const headerLayer = document.querySelector(".layer");

const toggleLayer = () => {
	const subNavList = document.querySelectorAll(".sub-nav");
	const subNavDisplay = (() => {
		for (let i = 0; i < subNavList.length; i++) {
			if (window.getComputedStyle(subNavList[i]).display == "block")
				return true;
		}
		return false;
	})();

	if (subNavDisplay) headerLayer.style.display = "block";
	else {
		let opa = 1;
		const hideAnimate = setInterval(() => {
			headerLayer.style.opacity = opa;
			opa -= 0.03;

			if (opa <= 0) {
				clearInterval(hideAnimate);
				headerLayer.style.display = "none";
				headerLayer.style.opacity = 1;
			}
		}, 1);
	}
};

document.querySelectorAll(".nav-item").forEach((item) => {
	item.addEventListener("mouseenter", toggleLayer);
	item.addEventListener("mouseout", toggleLayer);
});

headerLayer.addEventListener("mouseenter", toggleLayer);
