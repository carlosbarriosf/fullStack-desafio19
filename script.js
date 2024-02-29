const apiEndpoint = "https://my-json-server.typicode.com/carlosbarriosf/fake-products-db/products"

async function getProducts (api) {
    const res = await fetch(api);
    const data = await res.json();
    return data
}

const mainElement = document.querySelector('main');
const productContainer = document.querySelector('[data-products-container]');

async function populateHtml(api) {


    // const newDiv = document.createElement('div')

    const productArray = await getProducts(api);

    productArray.forEach(item => {
        const productTemplate = document.querySelector('[data-product-template]');
        const product = productTemplate.content.cloneNode(true).children[0];
        const productName = product.querySelector('[data-product-name]');
        
        productName.innerText = item.name;


        const productPrice = product.querySelector('[data-product-price]');
        productPrice.innerText = `$${item.price}`;

        // newDiv.appendChild(product);
        productContainer.appendChild(product)
    })

    // productContainer.innerHTML += newDiv.innerHTML
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

    // let i = 0;
    let keyWordFound = false;

    //I define i with the var keyword in the loop so it creates a closure
    //  that I can use later in the code
    for(var i = 0; i< keyWords.length; i++) {
        keyWordFound = keyWords[i].includes(searchValue);
        if (keyWordFound) break
    }

    let keyWord;
    if (keyWordFound) {
        keyWord = keyWords[i];
        if(keyWord === 'computadora') {
            keyWord = 'notebook';
        }
        const apiToRequest = `${apiEndpoint}?category=${keyWord}`;
        clearTable()
        
        populateHtml(apiToRequest);
    
    } else {
        // console.log('no se encontro nada')
        const newTableRow = document.createElement('tr');
        newTableRow.setAttribute('data-product', '')
        const newTableData = document.createElement('td');
        const emptyTableData = document.createElement('td');
        newTableData.innerText = 'No se encontraron productos';
        clearTable();
        newTableRow.appendChild(newTableData);
        newTableRow.appendChild(emptyTableData);
        productContainer.appendChild(newTableRow);
    }
    
    searchInput.value = '';

})

function clearTable() {
    const items = Array.from(document.querySelectorAll('[data-product]'));
    items.forEach(item => {
        productContainer.removeChild(item)
    })
}


