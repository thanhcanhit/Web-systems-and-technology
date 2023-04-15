import { getAllCategoryData, getAllSubCategoryData } from "./data.js";
import { activeCategory, activeSubCategory } from "./shared.js";

$(async () => {
  const categories = await getAllCategoryData();
  const subcategories = await getAllSubCategoryData();

	$("#js-all-list").html(categories.map(item => `<li><a href="../page/category.html" data-category=${item.id}>${item.name}</a></li>`));
	$("#js-sub-list").html(subcategories.map(item => `<li><a href="../page/category.html" data-subcategory="${item.id}">${item.name}</a></li>`));

	activeSubCategory();
  activeCategory();
});
