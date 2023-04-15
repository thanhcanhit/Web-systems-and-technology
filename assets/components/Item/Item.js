import { formatVND, getImgPath } from "../../js/utility.js";

export default function Item(item) {
	return `
		<article class="product-item h-slider__item">
			<div class="product-item__top">
				<a href="../page/item.html" data-id=${item.id}>
					<img class="img-fluid product-item__img-display" src=${getImgPath(
						item?.colors[0],
						item?.id
					)}
					onerror={this.src="../img/shared/error-img.png"}
						alt="">
					</a>
					${
						Math.round(item.sold / 1000) > 0
							? `<span class="sold">Đã bán ${Math.round(
									item.sold / 1000
							  )}K</span>`
							: `<span class="sold ">Mới</span>`
					}
					${
						item.discount > 0
							? `<span class="sales-percent">-${item.discount}%</span>`
							: ``
					}
			</div>
			<div class="product-item__body">
				<a href="" class="text-decoration-none">
					<p class="name">${item.name}</p>
				</a>
				${
					item.discount > 0
						? `<span class="sales-price">${formatVND(
								(item.price * (100 - item.discount)) / 100
						  )}</span>`
						: ""
				}
				<span class="price">${formatVND(item.price)}</span>
				<div class="h-slider">
					<div class="product-item__options	h-slider__list --small">
					${item.colors
						.slice(0, 5)
						.map(
							(
								color,
								index
							) => `<div class="product-item__option ">
										<img class="img-fluid" src=${getImgPath(item?.colors[index], item?.id)} alt="">
									</div>`
						)
						.join("")}
					</div>
				</div>
			</div>
		</article>`;
}
