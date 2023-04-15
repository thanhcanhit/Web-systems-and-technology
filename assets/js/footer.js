const footer = document.querySelector("#footer");

if (footer) {
	footer.outerHTML = `
  <footer id="footer" class="footer py-4 fw-medium bg-blue text-white text-14">
		<div class="container">
			<!-- Footer Content -->
			<div class="row">
				<div class="col col-12 col-xl-4">
					<p class="mb-4">
						“Đặt sự hài lòng của khách hàng là ưu tiên số 1
						trong mọi suy nghĩ hành động của mình” là sứ mệnh,
						là triết lý, chiến lược.. luôn cùng MENLY tiến bước
					</p>

					<!-- Footer Email -->
					<div class="mb-2">
						<label for="footer_email">ĐĂNG KÝ NHẬN THÔNG TIN</label>
					</div>
					<div>
						<form action="" class="input-group">
							<input class="footer__mail-input form-control form-control-lg" type="email" name="footer_email"
								id="footer_email" placeholder="Nhập email đăng ký của bạn" />
							<button class="footer__mail-btn btn text-main bg-white px-4">
								Đăng ký
							</button>
						</form>
					</div>

					<!-- Footer Social -->
					<div>
						<ul class="footer__social-list mt-4 p-0">
							<li>
								<a href="">
									<i class="fa-brands fa-facebook-f"></i>
								</a>
							</li>
							<li>
								<a href="">
									<i class="fa-brands fa-youtube"></i>
								</a>
							</li>
							<li>
								<a href="">
									<i class="fa-brands fa-instagram"></i>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="col col-12 col-md-4 col-xl-2">
					<h6 data-bs-toggle="collapse" data-bs-target="#footer__col-1">
						VỀ MENLY
					</h6>
					<ul class="footer__list collapse show" id="footer__col-1">
						<li class="footer__item">
							<a class="footer__link" href="">Giới thiệu</a>
						</li>
						<li class="footer__item">
							<a class="footer__link" href="">Liên hệ</a>
						</li>
						<li class="footer__item">
							<a class="footer__link" href="">Tuyển dụng</a>
						</li>
						<li class="footer__item">
							<a class="footer__link" href="">Tin tức</a>
						</li>
						<li class="footer__item">
							<a class="footer__link" href="">Hệ thống cửa hàng</a>
						</li>
					</ul>
				</div>
				<div class="col col-12 col-md-4 col-xl-3">
					<h6 data-bs-toggle="collapse" data-bs-target="#footer__col-2">
						HỖ TRỢ KHÁCH HÀNG
					</h6>
					<ul class="footer__list collapse show" id="footer__col-2">
						<li class="footer__item">
							<a class="footer__link" href="">Hướng dẫn chọn size</a>
						</li>
						<li class="footer__item">
							<a class="footer__link" href="">Chính sách khách hàng thân thiết</a>
						</li>
						<li class="footer__item">
							<a class="footer__link" href="">Chính sách đổi/trả</a>
						</li>
						<li class="footer__item">
							<a class="footer__link" href="">Chính sách bảo mật</a>
						</li>
						<li class="footer__item">
							<a class="footer__link" href="">Thanh toán, giao nhận</a>
						</li>
						<li class="footer__item">
							<a class="footer__link" href="">Chính sách Đồng phục</a>
						</li>
						<li class="footer__item">
							<a class="footer__link" href="">Chính sách bảo mật thông tin khách hàng</a>
						</li>
					</ul>
				</div>
				<div class="col col-12 col-md-4 col-xl-3">
					<h6 data-bs-toggle="collapse" data-bs-target="#footer__col-3">
						CÔNG TY CP THỜI TRANG MENLY
					</h6>
					<ul class="footer__list collapse show" id="footer__col-3">
						<li class="footer__item">
							<address class="fw-normal">
								<span class="footer__icon"><i class="fa-solid fa-location-dot"></i></span>
								Công ty cổ phần Thời trang MENLY
								<br />
								Mã số thuế: 0801206940
								<br />
								Địa chỉ: Gò vấp - Hồ Chí Minh
							</address>
						</li>
						<li class="footer__item">
							<a class="footer__link" href="">
								<span class="footer__icon"><i class="fa-solid fa-shop"></i></span>
								Tìm cửa hàng gần bạn nhất
							</a>
						</li>
						<li class="footer__item">
							<a href="" class="footer__link">
								<span class="footer__icon"><i class="fa-solid fa-phone"></i></span>
								Liên hệ đặt hàng: 024 999 86 999</a>
							<a href="" class="footer__link">Thắc mắc đơn hàng: 024 999 86 999</a>
							<a href="" class="footer__link">Góp ý khiếu nại: 1800 2086</a>
						</li>
						<li class="footer__item">
							<a class="footer__link" href="mailto:chamsockhachhang@menly.vn">
								<span class="footer__icon"><i class="fa-solid fa-envelope"></i></span>
								Email: chamsockhachhang@menly.vn</a>
						</li>
					</ul>
					<div>
						<a
							href="https://www.dmca.com/Protection/Status.aspx?ID=d3a2c2c5-a581-451b-b7ff-ff08fee58d6a&refurl=https://yody.vn/flash-sale"><img
								src="../img/shared/footer/logo_bct.png" alt="Logo bộ công thương" /></a>
						<a href="http://online.gov.vn/Home/WebDetails/44085?AspxAutoDetectCookieSupport=1"><img
								src="../img/shared/footer/_dmca_premi_badge_5.png" alt="DMCA PROTECTED" /></a>
					</div>
				</div>
			</div>
			<hr />
			<!-- Copyright -->
			<div class="text-center text-14">
				<span>@ Bản quyền thuộc về
					<a href="../page/home.html" class="text-main text-decoration-none">Menly.vn</a>
					All right reserved</span>
			</div>
		</div>
	</footer>`;
}

