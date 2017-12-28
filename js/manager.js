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
            createAnOption(res[i]._id, res[i].name, document.querySelector('#product-brand'));
            brand = {
                'name': res[i].name,
                'value': res[i]._id
            };
            listBrands.push(brand);
            createBrandRow(res[i], document.querySelector('#brand-table'));
        }
        document.querySelector("#list-brand").value = JSON.stringify(listBrands);
        $('#product-brand').material_select();
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
            createAnOption(res[i]._id, res[i].name, document.querySelector('#product-category'));
            category = {
                name: res[i].name,
                value: res[i]._id
            };
            listCategory.push(category);
            createCategoryRow(res[i], document.querySelector('#category-table'));
        }
        document.querySelector("#list-category").value = JSON.stringify(listCategory);
        $('#product-category').material_select();
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

function loadAllProduct(page) {
    var mypage = 1;
    if (page!==undefined) mypage = page;
    var req = new XMLHttpRequest();
    req.open("GET", productApi + '?page=' + mypage, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.onload = function () {
        var res = JSON.parse(this.responseText);
        document.querySelector('#product-table').innerHTML = "";
        document.querySelector("#product-pagination").innerHTML = "";
        for (var i=0; i<res.items.length; i++) {
            createProductRow(res.items[i], document.querySelector('#product-table'));
        }
        var prevAnchor = document.createElement('a');
        prevAnchor.innerHTML = '<i class="material-icons">chevron_left</i>';
        var prevList = document.createElement("li");
        if (mypage===1) {
            prevAnchor.href = "#!";
            prevList.className = "disabled";
        }
        else {
            prevAnchor.onclick = function () {
                loadAllProduct(mypage - 1);
            };
            prevList.className = "waves-effect";
        }
        prevList.appendChild(prevAnchor);
        document.querySelector("#product-pagination").appendChild(prevList);
        for (i=0; i<res.totalPage; i++) {
            createPagination(mypage, i, document.querySelector("#product-pagination"));
        }
        var nextAnchor = document.createElement('a');
        nextAnchor.innerHTML = '<i class="material-icons">chevron_right</i>';
        var nextList = document.createElement("li");
        if (mypage===res.totalPage) {
            nextAnchor.href = "#!";
            nextList.className = "disabled";
        }
        else {
            nextAnchor.onclick = function () {
                loadAllProduct(mypage + 1);
            };
            nextList.className = "waves-effect";
        }
        nextList.appendChild(nextAnchor);
        document.querySelector("#product-pagination").appendChild(nextList);
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
    actionBtn.onclick = function () {
        bindProductToForm(data);
    };

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

function bindProductToForm(data) {
    var event = new Event('checked');
    document.querySelector('#product-id').value = data._id;
    document.querySelector('#product-name').value = data.name;
    document.querySelector('#product-code').value = data.productCode;
    document.querySelector('#product-short-detail').value = data.shortDetail;
    document.querySelector('#product-description').value = data.description;
    // $("#product-description").val(data.description).change();

    document.querySelector('#product-price').value = data.price;
    document.querySelector('#product-brand').value = data.brandId;
    document.querySelector('#product-brand').dispatchEvent(event);

    document.querySelector('#product-category').value = data.categoryId;
    document.querySelector('#product-category').dispatchEvent(event);

    document.querySelector('#product-price').value = data.price;
    document.querySelector('#big-1-url').value = data.images.bigImgs[0];
    document.querySelector('#big-1-preview').src = data.images.bigImgs[0];
    document.querySelector('#big-2-url').value = data.images.bigImgs[1];
    document.querySelector('#big-2-preview').src = data.images.bigImgs[1];
    document.querySelector('#small-1-url').value = data.images.smallImgs[0];
    document.querySelector('#small-1-preview').src = data.images.smallImgs[0];
    document.querySelector('#small-2-url').value = data.images.smallImgs[1];
    document.querySelector('#small-2-preview').src = data.images.smallImgs[1];
    $("#edit-product-modal").modal('open');
}

function uploadImg(e, target1, target2) {
    var img = new FormData();
    img.append('file', e.target.files[0]);
    img.append('upload_preset', 'gwq6ik7v');
    $.ajax({
        url: uploadImgApi,
        type: "POST",
        data: img,
        cache: false,
        contentType: false,
        processData: false,
        success: function(response){
            previewImg(response.secure_url, target1);
            bindValueUrl(response.secure_url, target2);
        },
        error: function(response, message){
            console.log(response);
        }
    });
}

function updateProduct() {
    var updateObject = {
        name: document.querySelector('#product-name').value,
        productCode: document.querySelector('#product-code').value,
        brandId: document.querySelector('#product-brand').value,
        categoryId: document.querySelector('#product-category').value,
        shortDetail: document.querySelector('#product-short-detail').value,
        description: document.querySelector('#product-description').value,
        images: {
            bigImgs: [document.querySelector('#big-1-url').value,document.querySelector('#big-2-url').value],
            smallImgs: [document.querySelector('#small-1-url').value,document.querySelector('#small-2-url').value]
        },
        price: document.querySelector('#product-price').value
    };
    var req = new XMLHttpRequest();
    req.open('PUT', productApi + document.querySelector('#product-id').value, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('token', localStorage.getItem('token'));
    req.onload = function () {
        var res = JSON.parse(this.responseText);
        Materialize.toast('Update succesful!', 3000);
        $('form[name=product-form]').trigger('reset');
    };
    req.onerror = function () {
        var res = JSON.parse(this.responseText);
        console.log(res);
    };
    req.send(JSON.stringify(updateObject));
}

function previewImg(url, target) {
    target.src = url;
}
function bindValueUrl(url, target) {
    target.value = url;
}
function createPagination(page, index, el) {
    var anchor = document.createElement('a');
    anchor.innerHTML = index + 1;

    var list = document.createElement('li');
    if (page===index+1) {
        anchor.href = "#!";
        list.className = "active";
    }
    else {
        anchor.onclick = function () {
            loadAllProduct(index + 1);
        };
        list.className = "waves-effect";
    }
    list.appendChild(anchor);
    el.appendChild(list);

}
function createAnOption(value, name, el) {
    var option = document.createElement('option');
    option.value = value;
    option.innerHTML = name;
    el.appendChild(option);
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
    $('.modal').modal();
    $("#big-1-file").change(function(e) {
        uploadImg(e, document.querySelector('#big-1-preview'), document.querySelector("#big-1-url"));
    });
    $("#big-2-file").change(function(e) {
        uploadImg(e, document.querySelector('#big-2-preview'), document.querySelector("#big-2-url"));
    });
    $("#small-1-file").change(function(e) {
        uploadImg(e, document.querySelector('#small-1-preview'), document.querySelector("#small-1-url"));
    });
    $("#small-2-file").change(function(e) {
        uploadImg(e, document.querySelector('#small-2-preview'), document.querySelector("#small-2-url"));
    });
});