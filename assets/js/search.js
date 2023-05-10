import Item from "../components/Item/Item.js";
import SearchStored from "../store/SearchStored.js";
import { getAllItemData } from "./data.js";
import {activeItem}  from "../js/shared.js"

$(async () => {
	const localInput = new SearchStored();
	document.title = "Tìm kiếm " + localInput.input;
	$("#js-title").html(localInput.input);

	const allItemData = await getAllItemData();
	const filterData = allItemData.filter((item) =>
		item.name.toLowerCase().includes(localInput.input.toLowerCase())
	);

	$("#content").html(
		filterData.length == 0
			? `
    <div class="empty w-75 mx-auto d-flex justify-content-center flex-column align-items-md-center align-items-start">
      <img src="../img/search/search-page.svg" class="mx-auto" width="100" alt="">
      <p class="fw-semibold mt-4">Tìm kiếm <span class="text-main">${localInput.input}</span> của bạn không có sản phẩm phù hợp
      </p>
      <p class="text-sub fw-semibold text-14">HÃY THỬ LẠI CÁCH KHÁC NHƯ:</p>
      <ul class="d-flex flex-column align-items-md-center align-items-start gap-0">
        <li>
          <span>Sử dụng thuật ngữ chung nhiều hơn</span>
        </li>
        <li>
          <span>Kiểm tra chính tả của bạn</p>
        </li>
      </ul>
    </div>
  `
			: `
  <div class="item__list row px-1">
    ${filterData.map((item) => Item(item)).join("")}
  </div>`
	);

  activeItem();
});
