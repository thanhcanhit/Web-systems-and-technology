import { getRandomValue } from "./shared.js";
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
			const hasImg = data.filter((item) => (item?.img));
			
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
		});
}

/**
 *
 */
