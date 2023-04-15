import UserStored from "../store/UserStored.js";
import UsersStored from "../store/UsersStored.js";

async function getAllItemData() {
	let res = await fetch("../data/item.json");
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
	let res = await fetch("../data/subcategory.json");
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
	let res = await fetch("../data/category.json");
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

async function getAllUser() {
	let res = await fetch("../data/users.json");
	let data = await res.json();
	return data;
}

async function handleLogin(username, password) {
	// Search in database
	let allUser = await getAllUser();
	let user = null;
	user = allUser.find(user => user.username === username && user.password === password);
	if (user) {
		login(user);
		return true;
	};

	const localUsers = new UsersStored();
	user = localUsers.users.find(user => user.username === username && user.password === password);
	if (user) {
		login(user);
		return true;
	}

	return false;
}

function login(user) {
	const localUser = new UserStored();
	localUser.user = user;
	localUser.saveToLocalStorage();
	window.location.href = "/";
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
	getAllUser,
	handleLogin
};
