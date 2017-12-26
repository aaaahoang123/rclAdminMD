function loadAllUser() {
    var req = new XMLHttpRequest();
    req.open("GET",userApi, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('token', localStorage.getItem('token'));
    req.onload = function () {
        var res = JSON.parse(this.responseText);
        for (var i=0;i<res.length; i++) {
            createUserRow(res[i], document.querySelector("#user-table"));
        }
    };
    req.onerror = function () {
        var res = JSON.parse(this.responseText);
        console.log(res);
    };
    req.send();
}

function createUserRow(data, el) {
    var row = document.createElement('tr');

    var user = document.createElement('td');
    user.innerHTML = data.username;

    var fullname = document.createElement('td');
    fullname.innerHTML = data.customerInfo.fullName;

    var birthday = document.createElement('td');
    birthday.innerHTML = data.customerInfo.birthDay;

    var gender = document.createElement('td');
    var genderString = "";
    if (data.customerInfo.gender === 1) genderString = "Male";
    if (data.customerInfo.gender === -1) genderString = "Female";
    if (data.customerInfo.gender === 0) genderString = "Others";
    gender.innerHTML = genderString;

    var address = document.createElement('td');
    address.innerHTML = data.customerInfo.address;

    var email = document.createElement('td');
    email.innerHTML = data.customerInfo.email;

    var phone = document.createElement('td');
    phone.innerHTML = data.customerInfo.phone;

    var status = document.createElement('td');
    var statusString = "";
    if (data.status === 1) statusString = 'Active';
    if (data.status === -1) statusString = 'Banned';
    status.innerHTML = statusString;

    row.appendChild(user);
    row.appendChild(fullname);
    row.appendChild(birthday);
    row.appendChild(gender);
    row.appendChild(address);
    row.appendChild(email);
    row.appendChild(phone);
    row.appendChild(status);

    el.appendChild(row);
}

function loadAllBrand() {
    var req = new XMLHttpRequest();
    req.open("GET", brandsApi, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.onload = function () {
        var res = JSON.parse(this.responseText);
        var listBrands = JSON.parse(document.querySelector("#list-brand").value);
        var brand = {};
        for (var i=0; i<res.length; i++) {
            brand = {
                'name': res[i].name,
                'value': res[i]._id
            };
            listBrands.push(brand);
            createBrandRow(res[i], document.querySelector('#brand-table'));
        }
        document.querySelector("#list-brand").value = JSON.stringify(listBrands);
    };
    req.onerror = function () {
        var res = JSON.parse(this.responseText);
        console.log(res);
    };
    req.send();
}

function createBrandRow(data, el) {
    var row = document.createElement('tr');

    var name = document.createElement('td');
    name.innerHTML = data.name;

    var address = document.createElement('td');
    address.innerHTML = data.address;

    var description = document.createElement('td');
    description.style.whiteSpace = "pre-line";
    description.innerHTML = data.description;

    row.appendChild(name);
    row.appendChild(address);
    row.appendChild(description);

    el.appendChild(row);

}

function loadAllCategory() {
    var req = new XMLHttpRequest();
    req.open("GET", categoryApi, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.onload = function () {
        var res = JSON.parse(this.responseText);
        var listCategory = JSON.parse(document.querySelector("#list-category").value);
        category = {};
        for (var i=0; i<res.length; i++) {
            category = {
                name: res[i].name,
                value: res[i]._id
            };
            listCategory.push(category);
            createCategoryRow(res[i], document.querySelector('#category-table'));
        }
        document.querySelector("#list-category").value = JSON.stringify(listCategory);
    };
    req.onerror = function () {
        var res = JSON.parse(this.responseText);
        console.log(res);
    };
    req.send();
}

function createCategoryRow(data, el) {
    var row = document.createElement('tr');

    var name = document.createElement('td');
    name.innerHTML = data.name;

    var description = document.createElement('td');
    description.style.whiteSpace = "pre-line";
    description.innerHTML = data.description;

    row.appendChild(name);
    row.appendChild(description);

    el.appendChild(row);
}

function loadAllProduct() {
    var req = new XMLHttpRequest();
    req.open("GET", productApi, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.onload = function () {
        var res = JSON.parse(this.responseText);
        for (var i=0; i<res.items.length; i++) {
            createProductRow(res.items[i], document.querySelector('#product-table'));
        }
    };
    req.onerror = function () {
        var res = JSON.parse(this.responseText);
        console.log(res);
    };
    req.send();
}

function createProductRow(data, el) {
    var row = document.createElement('tr');
    var name = document.createElement('td');
    name.innerHTML = data.name;

    var pcode = document.createElement('td');
    pcode.innerHTML = data.productCode;

    var price = document.createElement('td');
    price.innerHTML = data.price;

    var brand = document.createElement('td');
    brand.className = "brand-name";
    brand.setAttribute('data-myValue', data.brandId);
    compareNameVal(document.querySelector("#list-brand"), brand, data.brandId);

    var category = document.createElement('td');
    category.className = "category-name";
    category.setAttribute('data-myValue', data.categoryId);
    compareNameVal(document.querySelector("#list-category"), category, data.categoryId);

    var bigImg1 = document.createElement('img');
    bigImg1.src = data.images.bigImgs[0];
    bigImg1.style.width = "100%";

    var bigImg1Col = document.createElement('td');
    bigImg1Col.style.width = "auto";
    bigImg1Col.appendChild(bigImg1);

    var bigImg2 = document.createElement('img');
    bigImg2.src = data.images.bigImgs[1];
    bigImg2.style.width = "100%";

    var bigImg2Col = document.createElement('td');
    bigImg2Col.style.width = "auto";
    bigImg2Col.appendChild(bigImg2);

    var smallImg1 = document.createElement('img');
    smallImg1.src = data.images.smallImgs[0];
    smallImg1.style.width = "100%";

    var smallImg1Col = document.createElement('td');
    smallImg1Col.style.width = "auto";
    smallImg1Col.appendChild(smallImg1);

    var smallImg2 = document.createElement('img');
    smallImg2.src = data.images.smallImgs[1];
    smallImg2.style.width = "100%";

    var smallImg2Col = document.createElement('td');
    smallImg2Col.style.width = "auto";
    smallImg2Col.appendChild(smallImg2);

    var actionBtn = document.createElement('a');
    actionBtn.className =  "waves-effect waves-teal btn-flat";
    actionBtn.innerHTML = "Edit";

    var actionBtnCol =  document.createElement('td');
    actionBtnCol.appendChild(actionBtn);

    row.appendChild(name);
    row.appendChild(pcode);
    row.appendChild(price);
    row.appendChild(brand);
    row.appendChild(category);
    row.appendChild(bigImg1Col);
    row.appendChild(bigImg2Col);
    row.appendChild(smallImg1Col);
    row.appendChild(smallImg2Col);
    row.appendChild(actionBtnCol);

    el.appendChild(row);
}

function compareNameVal(input, target, value) {
    var list = JSON.parse(input.value);
    for (var i=0; i<list.length; i++) {
        if (list[i].value === value) {
            target.innerHTML = list[i].name
        }
    }
}
$(document).ready(function () {
    var listBrands = [{
        'name':'brand',
        'value': '0'
    }];
    var listCategories = [{
        'name':'Category',
        'value':'0'
    }];
    document.querySelector("#list-brand").value = JSON.stringify(listBrands);
    document.querySelector("#list-brand").onchange = function (e) {
        for (var i=0; i<document.getElementsByClassName('brand-name').length; i++) {
            compareNameVal(e.target, document.getElementsByClassName('brand-name')[i], document.getElementsByClassName('brand-name')[i].getAttribute('data-myValue'));
        }
    };
    document.querySelector("#list-category").value = JSON.stringify(listCategories);
    document.querySelector("#list-category").onchange = function (e) {
        for (var i=0; i<document.getElementsByClassName('category-name').length; i++) {
            compareNameVal(e.target, document.getElementsByClassName('category-name')[i], document.getElementsByClassName('category-name')[i].getAttribute('data-myValue'));
        }
    };
    loadAllUser();
    loadAllBrand();
    loadAllCategory();
    loadAllProduct();
});