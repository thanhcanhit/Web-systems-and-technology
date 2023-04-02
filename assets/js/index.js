import { formatVND, getImgPath, getRandomValue } from "./utility.js";
import {
	activeHorizontalSlider,
	activeItemColorChoose as activeItem,
} from "./shared.js";
import { getAllItemData, getAllSubCategoryData } from "./data.js";
import Item from "../components/Item/item.js";
// // Clock
const clockItems = document.querySelectorAll(".clock__item span");

if (clockItems) {
	const getTimeDisplay = (value) => {
		if (value < 10) return "0" + value;
		return value;
	};

	let hour = getRandomValue(0, 23),
		minute = getRandomValue(0, 59),
		second = getRandomValue(0, 59);

	const timeRender = () => {
		clockItems[0].innerHTML = getTimeDisplay(hour);
		clockItems[1].innerHTML = getTimeDisplay(minute);
		clockItems[2].innerHTML = getTimeDisplay(second);
	};

	const tick = () => {
		second--;
		if (second < 0) {
			second = 59;
			minute--;
		}
		if (minute < 0) hour--;
	};

	const countDown = setInterval(() => {
		timeRender();
		tick();

		if (hour <= 0 && minute <= 0 && second <= 0) clearInterval(countDown);
	}, 1000);
}

// Carousel
const carousel = new bootstrap.Carousel("#top-carousel", {
	interval: 4000,
	ride: true,
});
carousel.cycle();

// Category
// Read subcategory
const categoryList = document.querySelector(".js-category");
if (categoryList) {
	fetch("/assets/data/subcategory.json")
		.then((response) => response.json())
		.then((data) => {
			const hasImg = data.filter((item) => item?.img);

			const html = hasImg.map((item) => {
				return `<li class="category__item h-slider__item">
                  <div>
                    <a href=${item.link}>
                      <img class="category__item-img" src=${item.img} alt=${item.name}}>
                      <span class="category__item-name">${item.name}</span>
                    </a>
                  </div>
                </li>`;
			});
			categoryList.innerHTML = html.join("");
			activeHorizontalSlider();
		});
}

// List View
const itemData = await getAllItemData();
// Flash Sales
const domFlash = document.querySelector("#js-flash-sale");

// random item
const randomItem = [];
while (randomItem.length < 8) {
	const randomIndex = getRandomValue(0, itemData.length);
	const id = itemData[randomIndex]?.id;

	if (id && !randomItem.includes(id)) {
		randomItem.push(itemData[randomIndex]);
	}
}

const flashList = domFlash.querySelector(".h-slider__list");
flashList.innerHTML = randomItem.map((item) => Item(item)).join("");

// Category
const subcategoryData = await getAllSubCategoryData();
const mainDom = document.querySelector("#main");

subcategoryData.map((subcategory) => {
	const itemList = itemData.filter(
		(item) => item.subcategory_id === subcategory.id
	);
	if (itemList.length > 0) {
		const newDiv = document.createElement("div");
		mainDom.appendChild(newDiv);
		newDiv.outerHTML = `
		<section class="items">
			<div class="container">
				<!-- Flash sale time -->
				<div class="row items__heading">
					<h4>${subcategory.name}</h4>
				</div>


				<section class="row mb-5 items__list">
					<div class="col col-2">
						<a href="/assets/page/category.html">
							<img class="img-fluid" src="./assets/img/index/subcategory_banner/best_seller.jpg" alt="">
						</a>
					</div>
					<div class="col col-10 h-slider">
						<section class="h-slider__list">
						${itemList.map((item) => Item(item)).join("")}
						</section>
					</div>
				</section>
			</div>
	</section>`;
	}
});

activeItem();
activeHorizontalSlider();
