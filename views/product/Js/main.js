// function addProductToLocalStorage(key, value) {
//     localStorage.setItem(key, value);
// }

// function getProductFromLocalStorage(key) {
//     return JSON.parse(localStorage.getItem(key)) ?? [];
// }

function createNewRecord(Name, Price, Description, Currency, Image) {
    const tr = document.createElement('tr');
    const tdOne = document.createElement('td');
    const tdTwo = document.createElement('td');
    const tdThree = document.createElement('td');
    const tdFour = document.createElement('td');
    const tdFive = document.createElement('td');
    tdOne.textContent = Name;
    tdTwo.textContent = Price;
    tdThree.textContent = Description;
    tdFour.textContent = Currency;
    tdFive.textContent = Image;

    tr.appendChild(tdOne);
    tr.appendChild(tdTwo);
    tr.appendChild(tdThree);
    tr.appendChild(tdFour);
    tr.appendChild(tdFive);

    return tr;

}

function createTableHeader() {
    const headerRow = document.createElement('tr');
    const thOne = document.createElement('th');
    const thTwo = document.createElement('th');
    const thThree = document.createElement('th');
    const thFour = document.createElement('th');
    const thFive = document.createElement('th');
    thOne.textContent = "name";
    thTwo.textContent = "price";
    thThree.textContent = "description";
    thFour.textContent = "currency";
    thFive.textContent = "image";

    headerRow.appendChild(thOne);
    headerRow.appendChild(thTwo);
    headerRow.appendChild(thThree);
    headerRow.appendChild(thFour);
    headerRow.appendChild(thFive);

    return headerRow;
}
function displayProduct() {

    if(tableData.firstElementChild !== null ) {
        document.querySelector('table').remove();
    }
    const  newTable = document.createElement('table');
    newTable.appendChild(createTableHeader());
    let products = getProductFromlocalStorage('product-name');
    for (let product of products) {
        let row = createNewRecord(product.name, product.price, product.description, product.currency, product.image);
        newTable.appendChild(row)
    }
    tableData.appendChild(newTable);

}
const Description = document.querySelector('#description');
const prices = document.querySelector('#price');
const Currency = document.querySelector('#currency');
const Image = document.querySelector('#image');
const result = document.querySelector('#result');
const productName = document.querySelector('#product-name');
const btn = document.querySelector('button');
const tableData = document.querySelector('.table-data');

let productList = JSON.parse(localStorage.getItem('product-name')) ?? [];

btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (productName.value === '') {
        return;
    }
    let productObject = {name: productName.value, price: prices.value, description:Description.value, currency:Currency.value, image:Image.value};

    productList.push(productObject);

    productName.value = ""
    // add the product
    addProductToLocalStorage('product-name', JSON.stringify(productList));

    displayProduct();
})
document.addEventListener('DOMContentLoaded', () => { displayProduct() })
