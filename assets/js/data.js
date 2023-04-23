import UserStored from "../store/UserStored.js";
import UsersStored from "../store/UsersStored.js";

// data.js dùng để đọc các file json trong thư mục data bằng lệnh fetch và các xử lí bất đồng bộ async await

// Lấy toàn bộ danh sách sản phẩm trong file
async function getAllItemData() {
	let res = await fetch("../data/item.json");
	let data = await res.json();
	return data;
}

// Lấy sản phẩm có id
function getItem(id) {
	let item = getAllItemData().then((data) => {
		return data.find((item) => item.id === id) || null;
	});
	return item;
}

// Lấy danh sách item trong danh mục nhỏ có id = subcategory_id
function getItemsWithSubcategory(subcategory_id) {
	let item = getAllItemData().then((data) => {
		return (
			data.filter((item) => item.subcategory_id === subcategory_id) ||
			null
		);
	});
	return item;
}

// Lấy toàn bộ danh mục nhỏ
async function getAllSubCategoryData() {
	let res = await fetch("../data/subcategory.json");
	let data = await res.json();
	return data;
}

// Lấy danh mục nhỏ theo id
function getSubcategory(id) {
	let item = getAllSubCategoryData().then((data) => {
		return data.find((item) => item.id === id) || null;
	});
	return item;
}

// Lấy toàn bộ danh mục nhỏ của danh mục lớn với category_id
function getSubcategoriesWithCategory(category_id) {
	let item = getAllSubCategoryData().then((data) => {
		return data.filter((item) => item.category_id === category_id) || null;
	});
	return item;
}

// Lấy toàn bộ danh sách danh mục lớn trong file
async function getAllCategoryData() {
	let res = await fetch("../data/category.json");
	let data = await res.json();
	return data;
}

// Lấy Category có id truyền vào
function getCategory(id) {
	let item = getAllCategoryData().then((data) => {
		return data.find((item) => item.id === id) || null;
	});
	return item;
}

// Lấy danh sách các sản phẩm trong danh mục lớn
async function getItemListInCategory(category_id) {
	let result = [];
	let subcategories = await getSubcategoriesWithCategory(category_id);
	for (let i = 0; i < subcategories.length; i++) {
		let temp = await getItemsWithSubcategory(subcategories[i].id);
		result = [...result, ...temp];
	}

	return result;
}

// Lấy toàn bộ danh sách user trong file
async function getAllUser() {
	let res = await fetch("../data/users.json");
	let data = await res.json();
	return data;
}

// Xử lí đăng nhập
async function handleLogin(username, password) {
	// Tìm trong file
	let allUser = await getAllUser();
	let user = null;
	user = allUser.find(
		(user) => user.username === username && user.password === password
	);

	if (user) {
		login(user);
		return true;
	}

	// Tìm trong localStorage
	const localUsers = new UsersStored();
	user = localUsers.users.find(
		(user) => user.username === username && user.password === password
	);
	if (user) {
		login(user);
		return true;
	}

	return false;
}

// Lưu thông tin đăng nhập vào localStorage
function login(user) {
	const localUser = new UserStored();
	localUser.user = user;
	localUser.saveToLocalStorage();
	window.location.href = "../page/home.html";
}

async function checkUsername(username) {
	// Tìm trong file
	let allUser = await getAllUser();
	let user = undefined;
	user = allUser.find((user) => user.username === username);

	if (user) {
		return true;
	}

	// Tìm trong localStorage
	const localUsers = new UsersStored();
	user = localUsers.users.find((user) => user.username === username);
	if (user) {
		return true;
	}

	return false;
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
	handleLogin,
	checkUsername,
};
