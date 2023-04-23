import { getAllCategoryData, getAllSubCategoryData } from "./data.js";
import { activeCategory, activeSubCategory } from "./shared.js";

$(async () => {
  // Đọc dữ liệu từ file json
  const categories = await getAllCategoryData();
  const subcategories = await getAllSubCategoryData();

  // Render danh mục lớn
	$("#js-all-list").html(categories.map(item => `<li><a href="../page/category.html" data-category=${item.id}>${item.name}</a></li>`));
  // Render danh mục con
	$("#js-sub-list").html(subcategories.map(item => `<li><a href="../page/category.html" data-subcategory=${item.id}>${item.name}</a></li>`));

  // Kích hoạt các tính năng
	activeSubCategory();
  activeCategory();
});
