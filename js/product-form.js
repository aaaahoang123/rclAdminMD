function addNewProduct() {
    var dataToSend = {
        'name': document.querySelector("#product-name").value,
        'productCode': document.querySelector("#product-code").value,
        'brandId': document.querySelector("#product-brand-id").value,
        'categoryId': document.querySelector("#product-category-id").value,
        'shortDetail': document.querySelector("#short-detail").value,
        'description': document.querySelector("#description").value,
        'images': {
            'bigImgs': [document.querySelector("#big-1-url").value,document.querySelector("#big-2-url").value],
            'smallImgs': [document.querySelector("#small-1-url").value,document.querySelector("#small-2-url").value]
        },
        'price': document.querySelector("#product-price").value
    };
    var req = new XMLHttpRequest();
    req.open('POST', productApi, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('token', localStorage.getItem('token'));
    req.onload = function() {
        Materialize.toast('Add product success!', 3000, 'rounded');
        console.log(JSON.parse(this.responseText));
        $('[name=product-form]').trigger("reset");
    };
    req.onerror = function() {
        alert('Error');
        console.log(JSON.parse(this.responseText));
    };
    req.send(JSON.stringify(dataToSend));
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

function previewImg(url, target) {
    target.src = url;
}
function bindValueUrl(url, target) {
    target.value = url;
}

function createAnOption(value, name, el) {
    var option = document.createElement('option');
    option.value = value;
    option.innerHTML = name;
    el.appendChild(option);
}

function loadBrands() {
  $.ajax({
      url: brandsApi,
      type: 'GET',
      success: function (res) {
          for (var i=0; i<res.length; i++) {
              createAnOption(res[i]._id, res[i].name, document.querySelector('#product-brand-id'));
          }
          $('select').material_select();
      },
      error: function (res) {
          console.log(res);
          Materialize.toast('Error when load Brands', 4000);
      }
  })  
}
function loadCategories() {
    $.ajax({
        url: categoryApi,
        type: 'GET',
        success: function (res) {
            for (var i=0; i<res.length; i++) {
                createAnOption(res[i]._id, res[i].name, document.querySelector('#product-category-id'));
            }
            $('select').material_select();
        },
        error: function (res) {
            console.log(res);
            Materialize.toast('Error when load Categories', 4000);
        }
    })
}

function addNewBrand() {
    var dataToSend = {
        name: document.querySelector("#brand-name").value,
        description: document.querySelector("#brand-description").value,
        address: document.querySelector("#address-company").value
    };
    var req = new XMLHttpRequest();
    req.open('POST', brandsApi, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('token', localStorage.getItem('token'));
    req.onload = function() {
        Materialize.toast('Add new category success', 3000);
        $('[name=brand-form]').trigger("reset");
        console.log(JSON.parse(this.responseText));
    };
    req.onerror = function() {
        alert('Error!')
        console.log(JSON.parse(this.responseText));
    };
    req.send(JSON.stringify(dataToSend));
}

function addNewCategory() {
    var dataToSend = {
        name: document.querySelector("#category-name").value,
        description: document.querySelector("#category-description").value
    };
    var req = new XMLHttpRequest();
    req.open('POST', categoryApi, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('token', localStorage.getItem('token'));
    req.onload = function() {
        Materialize.toast('Add new category success', 3000);
        $('[name=category-form]').trigger("reset");
        console.log(JSON.parse(this.responseText));
    };
    req.onerror = function() {
        alert('Error!')
        console.log(JSON.parse(this.responseText));
    };
    req.send(JSON.stringify(dataToSend));
}

$(document).ready(function () {
    loadBrands();
    loadCategories();
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