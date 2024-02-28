const apiEndpoint = "https://my-json-server.typicode.com/carlosbarriosf/fake-products-db/products"

async function getProducts (api) {
    const res = await fetch(api);
    const data = await res.json();
    return data
}

const mainElement = document.querySelector('main');

async function populateHtml(api) {

    const productContainer = document.querySelector('[data-products-container]');

    const newDiv = document.createElement('div')

    const productArray = await getProducts(api);

    productArray.forEach(item => {
        const productTemplate = document.querySelector('[data-product-template]');
        const product = productTemplate.content.cloneNode(true).children[0];
        const productName = product.querySelector('[data-product-name]');
        
        productName.innerText = item.name;


        const productPrice = product.querySelector('[data-product-price]');
        productPrice.innerText = `$${item.price}`;

        newDiv.appendChild(product);
    })

    productContainer.innerHTML += newDiv.innerHTML
}

document.addEventListener('DOMContentLoaded', () => {
    populateHtml(apiEndpoint)
})

const searchButton = document.querySelector('[data-search-button]');
const searchInput = document.getElementById('search');

const keyWords = ['computadora', 'notebook', 'aire acondicionado', 'heladera', 'cocina',
'lavarropas', 'secarropas', 'pava electrica', 'cafetera', 'licuadora'];

searchButton.addEventListener('click', () => {
    const searchValue = searchInput.value.toLowerCase();

    let i = 0;
    let keyWordFound = false;

    do {
        keyWordFound = keyWords[i].includes(searchValue);
        i++
    } while (keyWordFound === false);

    let keyWord = keyWords[i - 1];

    if(keyWord === 'computadora') {
        keyWord = 'notebook';
    }

    const apiToRequest = `${apiEndpoint}?category=${keyWord}`;
    clearTable()
    
    populateHtml(apiToRequest);

    searchInput.value = '';
})

function clearTable() {
    const table = document.querySelector('[data-products-container]');
    const items = document.querySelectorAll('tbody')
    table.removeChild(items[1]);
}
