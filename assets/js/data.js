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

export { getAllItemData, getItem, getAllSubCategoryData, getSubcategory };
