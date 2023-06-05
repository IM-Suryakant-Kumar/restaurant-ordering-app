import { menuArray } from "./data.js"

let cartData = []
const paymentForm = document.getElementById("payment-form")
const nameInput = document.getElementById("name-input")
const paymentStatusEl = document.getElementById("payment-status-el")

document.addEventListener("click", function (e) {
	if (e.target.dataset.id) {
		handleAddBtnClick(e.target.dataset.id)
	} else if (e.target.dataset.remove) {
		handleRemoveBtnClick(e.target.dataset.remove)
	} else if (e.target.id === "order-btn") {
		handleOrderBtnClick()
	} else if (e.target.id === "pay-btn") {
		e.preventDefault()
		handlePayBtnClick()
	}
})

function handleAddBtnClick(productId) {
	const targetCartObj = menuArray.filter(function (product) {
		return product.id === Number(productId)
	})[0]
	cartData.push(targetCartObj)
	renderCart()
}

function handleRemoveBtnClick(removeId) {
	const targetCartObjIdx = cartData.findIndex(function (product) {
		return `remove-${product.id}` === removeId
	})
	cartData.splice(targetCartObjIdx, 1)
	renderCart()
}

function handleOrderBtnClick() {
	paymentForm.classList.remove("hidden")
}

function handlePayBtnClick() {
	if (nameInput.value) {
		paymentForm.classList.add("hidden")
		cartData = []
		renderCart()
		paymentStatusEl.classList.remove("hidden")
		paymentStatusEl.innerHTML = `
            <p class="payment-greet">Thanks, ${
							document.querySelector("#name-input").value
						}! Your Order is on it's way!</p>
        `
		setTimeout(function () {
			paymentStatusEl.innerHTML = `
            <p class="payment-greet">Your order is accepted!</p>
        `
		}, 3000)
		setTimeout(function () {
			paymentStatusEl.classList.add("hidden")
		}, 6000)
	}
}

// render cart data
function getCartData() {
	let cartHtml = ""
	let totalCartPrice = 0
	if (cartData.length > 0) {
		cartData.forEach(function (product) {
			cartHtml += `
                <div class="cart-product">
                    <span>${product.name}</span>
                    <span class="remove-btn" data-remove="remove-${product.id}">remove</span>
                    <span>$${product.price}</span>
                </div>
            `
			totalCartPrice += product.price
		})
	}
	document.getElementById("total-price").innerHTML = `$${totalCartPrice}`
	return cartHtml
}

function renderCart() {
	if (cartData.length > 0) {
		document.getElementById("checkout-cont").classList.remove("hidden")
	} else {
		document.getElementById("checkout-cont").classList.add("hidden")
	}
	document.getElementById("cart").innerHTML = getCartData()
}
renderCart()

// render available product
function getProductsHtml() {
	let productsHtml = ""

	menuArray.forEach(function (product) {
		let ingredientsString = ""

		product.ingredients.forEach(function (ingredient, idx) {
			if (product.ingredients.length - 1 === idx) {
				ingredientsString += ingredient
			} else {
				ingredientsString += `${ingredient},`
			}
		})

		productsHtml += `
            <div class="product">
                <div class="product-detail">
                    <div class="product-item">${product.emoji}</div>
                    <div class="product-info">
                        <span class="product-name font-bold">${product.name}</span>
                        <span class="product-ingredients">${ingredientsString}</span>
                        <span class="product-price font-bold">$${product.price}</span>
                    </div>
                </div>
                <span class="add-btn">
                    <i class="fa-regular fa-plus" data-id="${product.id}"></i>
                </span>
            </div class="product">
        `
	})
	return productsHtml
}

function render() {
	document.getElementById("products").innerHTML = getProductsHtml()
}
render()
