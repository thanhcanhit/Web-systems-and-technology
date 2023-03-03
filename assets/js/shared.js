import "../lib/bootstrap-5.3.0-alpha1-dist/js/bootstrap.bundle.js"; // Bootstrap js
import "./header.js"; // Header render + cover layer
import "./footer.js"; // Footer render

// Get random [start, end]
const getRandomValue = (start, end) => {
	return Math.floor(Math.random() * (end - start + 1) + start);
};

export { getRandomValue };

// Horizontal Slider btn
const hSliderList = document.querySelectorAll(".h-slider");
/**
 * How to use
 * <section class="h-slider">
 * 	<ul class="h-slider__list">
 * 		<li class="h-slider__item"></li>
 * 	</ul>
 * </section>
 */

Array.from(hSliderList).map((item) => {
	const sliderList = item.querySelector(".h-slider__list");
	const percentScroll = 35;
	const quantityScroll = Math.max((percentScroll * sliderList.scrollWidth) / 100, 800);

	const scrollX = (x) => {
		sliderList.scroll({
			top: 0,
			left: x,
			behavior: "smooth"
		});
		sliderList.style.pointerEvents = 'none';
		setTimeout(() => sliderList.style.pointerEvents = "unset", 500)
	};

	const btnLeft = document.createElement("button");
	btnLeft.classList = "h-slider__btn left";
	btnLeft.innerHTML = `<i class="fa-solid fa-angle-left"></i>`;
	btnLeft.addEventListener("click", () =>
		scrollX(sliderList.scrollLeft - quantityScroll)
	);

	const btnRight = document.createElement("button");
	btnRight.classList = "h-slider__btn right";
	btnRight.innerHTML = `<i class="fa-solid fa-angle-right"></i>`;
	btnRight.addEventListener("click", () =>
		scrollX(sliderList.scrollLeft + quantityScroll)
	);

	item.appendChild(btnLeft);
	item.appendChild(btnRight);
});
