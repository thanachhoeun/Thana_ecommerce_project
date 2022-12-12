   
function addProductToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getProductFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) ?? [];
}

function createNewRecord(name, price, currency, description, image, edit, remove) {
    const tr = document.createElement('tr');
    const tdOne = document.createElement('td');
    const tdTwo = document.createElement('td');
    const tdThree = document.createElement('td');
    const tdFour = document.createElement('td');
    const tdFive = document.createElement('td');
    const tdSix = document.createElement('td');
    const tdSeven = document.createElement('td')
    tdOne.textContent = name;
    tdTwo.textContent = price;
    tdThree.textContent = currency;
    tdFour.textContent = description;
    tdFive.textContent = image;
    tdSix.textContent = edit;
    tdSeven.textContent = remove;

    let create = document.createElement('img');
    create.className = 'update'
    create.src = '../../../imge/update.png';

// ====================================Edit===========================================
    create.addEventListener('click', (e)=>{
        let index = e.target.parentElement.parentElement.dataset.index;
        document.querySelector('#product-name').value = name;
        document.querySelector('#description').value = description;
        document.querySelector('#currency').value = currency;
        document.querySelector('#image').value = image;
        document.querySelector('#price').value = price;

        productList.splice(index, 1);
        displayProduct();
    })
    
    
    let  trush = document.createElement("img");
    trush.className = 'delete';
    trush.src = "../../../imge/trash.png";
    
    tdSix.appendChild(create);
    tdSeven.appendChild(trush);

//    ========================== Delete ============================
    trush.addEventListener('click', (e)=>{
        e.preventDefault();
        let index = e.target.parentElement.parentElement.dataset.index;

        productList.splice(index, 1);
        addProductToLocalStorage("product-name", JSON.stringify(productList));
        displayProduct();
        if(e.target.className === "delete"){
            let deletett = window.confirm('Are you want to delete this products?')
            if (deletett) {
                e.target.parentElement.parentElement.remove();
                if (index > -1) {
                    productList.splice(index, 1);
                }
                localStorage.setItem("product-name", JSON.stringify(productList));
            }
        }
        window.location.reload();
    })
// ============================Search============================
    // function btnSearch() {
    //     let text = research.value.toLowerCase();
    //     let tasks = document.querySelectorAll(".one");
    //     for (let task of tasks) {
    //         let taskTitle = task.children[1].textContent.toLowerCase();
    //         if (taskTitle.indexOf(text) === -1) {
    //             task.style.display = "none";
    //         } else {
    //             task.style.display = "block";
    //         }
    //     }
    // }
    // let research = document.querySelector(".research");
    // research.addEventListener("keyup", btnSearch);

    tr.appendChild(tdOne);
    tr.appendChild(tdTwo);
    tr.appendChild(tdThree);
    tr.appendChild(tdFour);
    tr.appendChild(tdFive);
    tr.appendChild(tdSix);
    tr.appendChild(tdSeven);

    return tr;

}

function createTableHeader() {
    const headerRow = document.createElement('tr');
    const thOne = document.createElement('th');
    const thTwo = document.createElement('th');
    const thThree = document.createElement('th');
    const thFour = document.createElement('th');
    const thFive = document.createElement('th');
    const thSix = document.createElement('th')
    const thSeven = document.createElement('th');
    thOne.textContent = "name";
    thTwo.textContent = "price";
    thThree.textContent = "currency";
    thFour.textContent = "description";
    thFive.textContent = "image";
    thSix.textContent = "edit";
    thSeven.textContent = "remove";

    headerRow.appendChild(thOne);
    headerRow.appendChild(thTwo);
    headerRow.appendChild(thThree);
    headerRow.appendChild(thFour);
    headerRow.appendChild(thFive);
    headerRow.appendChild(thSix);
    headerRow.appendChild(thSeven);

    return headerRow;
}
function displayProduct() {

    if(tableData.firstElementChild !== null ) {
        document.querySelector('table').remove();
    }
    const  newTable = document.createElement('table');
    newTable.appendChild(createTableHeader());
    let products = getProductFromLocalStorage('product-name');
    for (let product of products) {
        let row = createNewRecord(product.name, product.price, product.currency, product.description, product.image);
        newTable.appendChild(row)
    }
    tableData.appendChild(newTable);

}

const result = document.querySelector('#result');
const productName = document.querySelector('#product-name');
const btn = document.querySelector('button');
const tableData = document.querySelector('.table-data');
const Description = document.querySelector('#description');
const Currency = document.querySelector('#currency');
const images = document.querySelector('#image');
const prices = document.querySelector('#price');

let productList = JSON.parse(localStorage.getItem('product-name')) ?? [];

btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (productName.value === '') {
        return;
    }
    let productObject = {name: productName.value, description: Description.value, price: prices.value, currency: Currency.value, image: images.value};
    productList.push(productObject);

    productName.value = ""
    Description.value = ""
    prices.value = ""
    Currency.value = ""
    images.value = ""
    // add the product
    addProductToLocalStorage('product-name', JSON.stringify(productList));

    displayProduct();
})
document.addEventListener('DOMContentLoaded', () => { displayProduct() })

