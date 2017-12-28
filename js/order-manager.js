
function loadOrder() {
    var req = new XMLHttpRequest();
    req.open('GET', orderApi, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('token', localStorage.getItem('token'));
    req.onload = function () {
        var res = JSON.parse(this.responseText);
        console.log(res);
    };
    req.onerror = function () {
        var res = JSON.parse(this.responseText);
        console.log(res);
    };
    req.send();
}

function createOrderTable(data, el) {
    var cusThName = document.createElement('th');
    cusThName.innerHTML = 'Customer Name';

    var cusTb = document.createElement('table');
    cusTb.className = "striped responsive-table centered";

    cusThead = document.createElement('thead');


}
$(document).ready(function () {
    loadOrder();
});