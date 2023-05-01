import "../lib/jquery-3.6.4/jquery-3.6.4.js";
import SubCategoryViewStored from "../store/SubCategoryViewStored.js";
import {
	getSubcategory,
	getCategory,
	getItemsWithSubcategory,
	getSubcategoriesWithCategory,
	getItemListInCategory,
} from "./data.js";
import Item from "../components/Item/Item.js";
import {
	activeCategory,
	activeHorizontalSlider,
	activeItem,
	activeSubCategory,
} from "./shared.js";
import CategoryViewStored from "../store/CategoryViewStored.js";
import FilterStored from "../store/FilterStored.js";

$(renderCategory);

async function renderCategory() {
	const currentCategory = await getCategory(
		new CategoryViewStored().categoryID
	);

	const localSubcategory = new SubCategoryViewStored().subcategoryID;
	const currentSubCategory = await getSubcategory(localSubcategory);

	let itemList = [];
	let subcategoryList = await getSubcategoriesWithCategory(
		currentCategory.id
	);

	document.title =
		currentCategory.name +
		(currentSubCategory != null ? " - " + currentSubCategory.name : "");

	if (localSubcategory === 0) {
		itemList = await getItemListInCategory(currentCategory.id);
	} else {
		itemList = await getItemsWithSubcategory(currentSubCategory.id);
	}

	const sizes = ["All", "S", "M", "L", "XL", "2XL", "3XL"];
	const sorts = [
		{ name: "Mặc định", id: 0 },
		{ name: "Từ A-Z", id: 1 },
		{ name: "Từ Z-A", id: 2 },
		{ name: "Theo giá tăng", id: 3 },
		{ name: "Theo giá giảm", id: 4 },
	];

	const localFilter = new FilterStored();
	let { sort: localSort, size: localSize } = localFilter;
	localSize = sizes[localSize];

	if (localSize !== "All") {
		itemList = itemList.filter((item) => item.sizes.includes(localSize));
	}

	if (localSort != 0) {
		let compareFunction = () => {};

		switch (Number(localSort)) {
			case 1:
				compareFunction = (a, b) => a.name.localeCompare(b.name);
				break;
			case 2:
				compareFunction = (a, b) => b.name.localeCompare(a.name);
				break;
			case 3:
				compareFunction = (a, b) =>
					a.price * (1 + b.discount / 100) -
					b.price * (1 + a.discount / 100);
				break;
			case 4:
				compareFunction = (a, b) =>
					b.price * (1 + a.discount / 100) -
				a.price * (1 + b.discount / 100);
				break;
		}

		itemList.sort(compareFunction);
	}

	$("#js-quantity-item").html(`${itemList.length} Sản phẩm`);

	$("#js-breadcrumb").html(`
	<nav aria-label="breadcrumb" class="d-flex justify-content-center fw-semibold mb-2">
		<ol class="breadcrumb justify-content-center" style="--bs-breadcrumb-margin-bottom: 0rem;">
			<li class="breadcrumb-item text-hover-main"><a href="../page/home.html">Trang chủ</a></li>
			<li class="breadcrumb-item text-hover-main"><a href="../page/allcategory.html">Danh mục</a></li>
			<li class="breadcrumb-item active" aria-current="page">${
				currentCategory.name
			}</li>
		</ol>
	</nav>
	<h2 class="heading">${
		localSubcategory === 0
			? `Tất cả ${currentCategory.name}`
			: currentSubCategory.name
	}</h2>
	`);

	$("#js-product-list").html(`
		${
			itemList.length > 0
				? itemList
						.map(
							(item) => `
				<div class="product-item col col-6 col-md-3 col-lg-3">
					${Item(item)}
				</div>
			`
						)
						.join("")
				: `<p class="text-center mt-5 h4 text-secondary">Không tìm thấy sản phẩm phù hợp 🥲</p>`
		}
	`);

	$("#js-filter-list").html(`
			${subcategoryList
				.map(
					(subcategory) => `
			<a href="../page/category.html" class="filter__item ${
				subcategory?.id === currentSubCategory?.id ? "active" : ""
			}" data-subcategory=${subcategory.id}>${subcategory.name}</a>
			`
				)
				.join("")}
	`);

	const selectedSort = sorts.find((item) => item.id == localSort);

	$("#js-filter-sort").html(
		`
		<option disable value=${selectedSort.id}>${selectedSort.name}</option>
		${sorts
			.map((item) => {
				return item.id == selectedSort.id
					? ""
					: `<option value=${item.id}>${item.name}</option>`;
			})
			.join("")}
		`
	);

	$("#js-filter-size").html(
		`${sizes
			.map(
				(item, index) =>
					`<span class="filter__item ${
						item === localSize ? "active" : ""
					}" data-size=${index} >${item}</span>`
			)
			.join("")}`
	);

	$(".filter__item[data-size]").on("click", (e) => {
		const localFilter = new FilterStored();
		localFilter.size = e.target.dataset.size;
		localFilter.saveToLocalStorage();
		renderCategory();
	});

	$("#js-clear-all-btn").click(() => {
		const localSubcategory = new SubCategoryViewStored();
		localSubcategory.subcategoryID = 0;
		localSubcategory.saveToLocalStorage();

		const localFilter = new FilterStored();
		localFilter.size = 0;
		localFilter.sort = 0;
		localFilter.saveToLocalStorage();

		renderCategory();
	});

	activeHorizontalSlider();
	activeItem();
	activeSubCategory(renderCategory);
	activeCategory();
}

$("#js-filter-sort").on("change", (e) => {
	const localFilter = new FilterStored();
	localFilter.sort = document.querySelector("#js-filter-sort").value;
	localFilter.saveToLocalStorage();
	renderCategory();
});
