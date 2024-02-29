const apiEndpoint = "https://my-json-server.typicode.com/carlosbarriosf/fake-products-db/products"

async function getProducts (api) {
    try {
        const res = await fetch(api);
        const data = await res.json();
        return data
    }
    catch(err) {
        console.log(err)
    }
}

const mainElement = document.querySelector('main');
const productContainer = document.querySelector('[data-products-container]');

async function populateHtml(api) {
    try {
        const productArray = await getProducts(api);
    
        productArray.forEach(item => {
            const productTemplate = document.querySelector('[data-product-template]');
            const product = productTemplate.content.cloneNode(true).children[0];
            const productName = product.querySelector('[data-product-name]');
            
            productName.innerText = item.name;
    
    
            const productPrice = product.querySelector('[data-product-price]');
            productPrice.innerText = `$${item.price}`;
    
            productContainer.appendChild(product)
        })
    }
    catch (err) {
        console.log(err)
        createErrorMessage('No se pudo conectar con el servidor')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateHtml(apiEndpoint)
})

const searchButton = document.querySelector('[data-search-button]');
const searchInput = document.getElementById('search');



let keyWords;

const generateKeyWords = async () => {
    try {
        const products = await getProducts(apiEndpoint);
        keyWordsArray = products.map(product => product.category);
        keyWords = [... new Set(keyWordsArray)]
        return keyWords
    }
    catch (err) {
        console.log(err)
    }
} 

generateKeyWords();



searchButton.addEventListener('click', () => {
    const searchValue = searchInput.value.toLowerCase();

    let keyWordFound = false;

    // I define i with the var keyword in the loop so it creates a closure
    //  that I can use later in the code

    for(var i = 0; i< keyWords.length; i++) {
        keyWordFound = keyWords[i].includes(searchValue);
        if (keyWordFound) break
    }

    let keyWord;
    if (keyWordFound) {
        keyWord = keyWords[i];
        const apiToRequest = `${apiEndpoint}?category=${keyWord}`;
        clearTable()
        populateHtml(apiToRequest);
    } else {
        createErrorMessage('No se encontraron productos')
    }
    
    searchInput.value = '';

})

function clearTable() {
    const items = Array.from(document.querySelectorAll('[data-product]'));
    items.forEach(item => {
        productContainer.removeChild(item)
    })
}

function createErrorMessage(message) {
    const newTableRow = document.createElement('tr');
        newTableRow.setAttribute('data-product', '')
        const newTableData = document.createElement('td');
        const emptyTableData = document.createElement('td');
        newTableData.innerText = message;
        clearTable();
        newTableRow.appendChild(newTableData);
        newTableRow.appendChild(emptyTableData);
        productContainer.appendChild(newTableRow);
}