import "../lib/bootstrap-5.3.0-alpha1-dist/js/bootstrap.bundle.js"; // Bootstrap js
import "./header.js"; // Header render + cover layer
import "./footer.js"; // Footer render

// Get random [start, end]
const getRandomValue = (start, end) => {
	return Math.floor(Math.random() * (end - start + 1) + start);
};

export { getRandomValue };

// Horizontal Slider btn
/**
 * How to use
 * <section class="h-slider">
 * 	<ul class="h-slider__list">
 * 		<li class="h-slider__item"></li>
 * 	</ul>
 * </section>
 */

const hSliderList = document.querySelectorAll(".h-slider");
Array.from(hSliderList).forEach((item) => {
	const sliderList = item.querySelector(".h-slider__list");

	if (sliderList.clientWidth < sliderList.scrollWidth) {
		let isSmall = sliderList.className.includes("--small");

		const bgColor = isSmall ? "black" : "var(--main-color)";
		const size = isSmall ? 20 : 30;
		const percentScroll = 35;
		const quantityScroll = Math.max(
			(percentScroll * sliderList.scrollWidth) / 100,
			1000
		);

		const btnLeft = document.createElement("button");
		btnLeft.style = `--width: ${size}px; --bg-color: ${bgColor}`;
		btnLeft.classList =
			"h-slider__btn left d-none d-lg-flex justify-content-center align-items-center";
		btnLeft.innerHTML = `<i class="fa-solid fa-angle-left"></i>`;

		const btnRight = document.createElement("button");
		btnRight.style = `--width: ${size}px; --bg-color: ${bgColor}`;
		btnRight.classList =
			"h-slider__btn right d-none d-lg-flex justify-content-center align-items-center";
		btnRight.innerHTML = `<i class="fa-solid fa-angle-right"></i>`;

		const scrollX = (x) => {
			sliderList.scroll({
				top: 0,
				left: x,
				behavior: "smooth",
			});
			sliderList.style.pointerEvents = "none";
			setTimeout((sliderList.style.pointerEvents = ""), 600);
			btnLeft.classList.toggle("d-lg-none", x <= 0);
			btnRight.classList.toggle(
				"d-lg-none",
				x >= sliderList.scrollWidth || x / sliderList.scrollWidth > 0.6
			);
		};

		btnLeft.addEventListener("click", () =>
			scrollX(sliderList.scrollLeft - quantityScroll)
		);
		btnLeft.click();

		btnRight.addEventListener("click", () =>
			scrollX(sliderList.scrollLeft + quantityScroll)
		);
		item.appendChild(btnLeft);
		item.appendChild(btnRight);
	}
});

// Items
const items = document.querySelectorAll(".product-item");
if (items) {
	items.forEach((item) => {
		const imgDisplay = item.querySelector(".product-item__img-display");
		const options = item.querySelectorAll(".product-item__option");

		options.forEach((option) => {
			option.addEventListener("click", (e) => {
				if (e.target.src) {
					imgDisplay.src = e.target.src;
					item.querySelector(".active").classList.remove("active");
					e.target.parentElement.classList.add("active");
				}
			});
		});
	});
}
