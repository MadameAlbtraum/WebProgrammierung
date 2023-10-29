import { currentView, labelSbutton, searchButton, backButton, cart, productDetails, productDiv, productImage, searchInput, searchResult, searchResultTitel, tableBody, textStart, wishListDiv, wishListH2 } from './const.js';

export const loadProductData = (clickedProductId) => {
    const productUrl = `https://dummyjson.com/products/${clickedProductId}`;
    currentView = 4;
    fetch(productUrl)
        .then(response => response.json())
        .then(productData => {
            productImage.innerHTML = '';
            const title = document.getElementById('title');
            const price = document.getElementById('price');
            const brand = document.getElementById('brand');
            const desc = document.getElementById('description');
            const percentage = document.getElementById('percentage')
            const imageArray = document.getElementById('images');
            title.textContent = productData.title;
            price.textContent = productData.price + '€';
            brand.textContent = productData.brand;
            desc.textContent = productData.description;
            percentage.textContent = productData.discountPercentage + '%';

            productData.images.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.className = "inline max-width-images m-2 border border-solid border-2 border-slate-800";
                imageArray.appendChild(img);
            });

            switchView(currentView);
        })
}