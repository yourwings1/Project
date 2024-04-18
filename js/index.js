// массив продуктов
const products = [
	{
		name: "Рукола",
		size: "s, m, l",
		price: 120,
		img: "/img/rukola.png",
	},
	{
		name: "Базилик",
		size: "s, m, l",
		price: 115,
		img: "/img/bazilik.png",
	},
	{
		name: "Дайкон",
		size: "s, m, l",
		price: 100,
		img: "/img/daikon.jpg",
	},
	{
		name: "Горчица",
		size: "s, m, l",
		price: 95,
		img: "/img/gorchitsa.jpg",
	},
	{
		name: "Кинза",
		size: "s, m, l",
		price: 135,
		img: "/img/kinza.jpg",
	},
	{
		name: "Кольраби",
		size: "s, m, l",
		price: 110,
		img: "/img/kolrabi.jpg",
	},
	{
		name: "Пак-чой",
		size: "s, m, l",
		price: 140,
		img: "/img/pak-choi.png",
	},
	{
		name: "Редис",
		size: "s, m, l",
		price: 100,
		img: "/img/redis.jpg",
	},
	{
		name: "Щавель",
		size: "s, m, l",
		price: 90,
		img: "/img/shavel.jpg",
	},
];

// массив продуктов из корзины
const cart = [];

const catalog = document.getElementById("catalog");

// метод наполнения каталога
const initCatalog = (products) => {
	catalog.textContent = "";
	for (let product of products) {
		catalog.insertAdjacentHTML(
			"beforeend",
			`
			<li class="splide__slide"><div class="catalog__product">
			<img
				src="${product.img}"
				alt=""
			/>
			<div class="catalog__name">
				${product.name}
				<span>${product.price} руб.</span>
			</div>
			<div class="catalog__footer">
				<span>${product.size}</span>
				<button class="btn btn-primary btn-transparent btn-buy" data-product="
				${product.name}
				">
					Купить
				</button>
			</div>
		</div></li>
		
		`
		);
	}

	document.querySelectorAll(".btn-buy").forEach((x) => {
		x.addEventListener("click", function () {
			const productName = this.dataset.product.trim();
			const product = products.find((p) => p.name == productName);
			cart.push(product);
		});
	});

	// Слайдер
	var splide = new Splide(".splide", {
		perPage: 3,
		focus: 0,
	});

	splide.mount();
};

initCatalog(products);

// обработка поиска
document.getElementById("search").addEventListener("click", function () {
	const inputSearch = document.getElementById("input-search");
	const filteredProducts = products.filter((a) =>
		a.name.toLowerCase().includes(inputSearch.value.toLowerCase())
	);
	initCatalog(filteredProducts);
});

// метод наполнения корзины
const initCart = () => {
	const cartForm = document.getElementById("cart-form");
	const emptyCart = document.getElementById("empty-cart");

	document.getElementById("cart-count").textContent = cart.length;

	if (cart.length > 0) {
		cartForm.style.display = "block";
		emptyCart.style.display = "none";

		const cartProductsList = document.querySelector(".cart__products");
		cartProductsList.textContent = "";

		let sum = 0;
		for (let product of cart) {
			cartProductsList.insertAdjacentHTML(
				"beforeend",
				`
			<li class="cart__product">
								<div class="cart__product-content">
									<img
										class="cart__img"
										src="${product.img}"
										alt=""
									/>
									<div>
										<h3 class="cart__product-title">
											${product.name}
										</h3>
										<div class="cart__product-info">
											<span>Размер:</span>
											<div
												class="btn-group"
												role="group"												
											>																						
											</div>
										</div>
										<div class="cart__product-info">
											<span>Цена:</span>
											<div class="cart__product-price">
												${product.price} руб
											</div>
										</div>
									</div>
								</div>

								<button
								    data-product="${product.name}"
									class="btn btn-primary btn-transparent cart__remove"
								>
									Удалить
								</button>
							</li>
			`
			);

			const cartProductItems =
				cartProductsList.querySelectorAll(".cart__product");

			const sizes = product.size.split(", ");
			for (let size of sizes) {
				cartProductItems[cartProductItems.length - 1]
					.querySelector(".btn-group")
					.insertAdjacentHTML(
						"beforeend",
						`
		<button
												type="button"
												class="btn btn-secondary ${sizes.length == 1 ? "active" : ""}"
											>
												${size}
											</button>
		`
					);
			}

			sum += product.price;
		}

		document.getElementById("cart-sum").textContent = sum;

		document.querySelectorAll(".cart__remove").forEach((x) => {
			x.addEventListener("click", function () {
				this.parentElement.remove();

				const productName = this.dataset.product.trim();
				const productIndex = cart.findIndex(
					(p) => p.name == productName
				);

				cart.splice(productIndex, 1);
				// ();
			});
		});

		document.querySelectorAll(".btn-group .btn").forEach((x) => {
			x.addEventListener("click", function () {
				this.parentElement
					.querySelectorAll(".btn")
					.forEach((x) => x.classList.remove("active"));
				this.classList.add("active");
			});
		});
	} else {
		cartForm.style.display = "none";
		emptyCart.style.display = "flex";
	}
};

// обработка клика по корзине
document.getElementById("cart-btn").addEventListener("click", initCart);

document.getElementById("buy").addEventListener("click", function () {
	swal(
		"Заявка оформлена!",
		"Спасибо за покупки, мы вам перезвоним!",
		"success"
	).then((value) => {
		location.reload();
	});
});
