const authApi = 'https://rlcapi.herokuapp.com/api/authentication/',
    productApi = 'https://rlcapi.herokuapp.com/api/products/',
    brandsApi = 'https://rlcapi.herokuapp.com/api/brands/',
    categoryApi = 'https://rlcapi.herokuapp.com/api/categories/',
    userApi = 'https://rlcapi.herokuapp.com/api/user/',
    orderApi = 'https://rlcapi.herokuapp.com/api/orders/',
    uploadImgApi = 'https://api.cloudinary.com/v1_1/fpt-aptech/image/upload';

$(document).ready(function () {
    $(".button-collapse").sideNav();
});

function login() {
    var loginData = {
        username: document.getElementById('login-username').value,
        password: document.getElementById('login-password').value
    };
    var req = new XMLHttpRequest();
    req.open("POST", authApi, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.onload = function () {
        var res = JSON.parse(this.responseText);
        localStorage.setItem('token', res.token);
        Materialize.toast('Login success', 3000, 'rounded');
        setTimeout(function () {
            location.href = 'manager.html';
        }, 3000);
    };
    req.onerror = function () {
        var res = JSON.parse(this.responseText);
        console.log(res);
    };
    req.send(JSON.stringify(loginData));
}