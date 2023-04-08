async function getAllItemData() {
	let res = await fetch("/assets/data/item.json");
	let data = await res.json();
	return data;
}

function getItem(id) {
	let item = getAllItemData().then((data) => {
		return data.find((item) => item.id === id) || null;
	});
	return item;
}

function getItemsWithSubcategory(subcategory_id) {
	let item = getAllItemData().then((data) => {
		return (
			data.filter((item) => item.subcategory_id === subcategory_id) ||
			null
		);
	});
	return item;
}

async function getAllSubCategoryData() {
	let res = await fetch("/assets/data/subcategory.json");
	let data = await res.json();
	return data;
}

function getSubcategory(id) {
	let item = getAllSubCategoryData().then((data) => {
		return data.find((item) => item.id === id) || null;
	});
	return item;
}

function getSubcategoriesWithCategory(category_id) {
	let item = getAllSubCategoryData().then((data) => {
		return data.filter((item) => item.category_id === category_id) || null;
	});
	return item;
}

async function getAllCategoryData() {
	let res = await fetch("/assets/data/category.json");
	let data = await res.json();
	return data;
}

function getCategory(id) {
	let item = getAllCategoryData().then((data) => {
		return data.find((item) => item.id === id) || null;
	});
	return item;
}

async function getItemListInCategory(category_id) {
	let result = [];
	let subcategories = await getSubcategoriesWithCategory(category_id);
	for (let i = 0; i < subcategories.length; i++) {
		let temp = await getItemsWithSubcategory(subcategories[i].id);
		result = [...result, ...temp];
	}

	return result;
}

export {
	getAllItemData,
	getItem,
	getItemsWithSubcategory,
	getAllSubCategoryData,
	getSubcategory,
	getSubcategoriesWithCategory,
	getAllCategoryData,
	getCategory,
	getItemListInCategory,
};
