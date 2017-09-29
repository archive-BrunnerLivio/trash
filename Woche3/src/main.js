function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};

const sendData = (url, method, param, callback) => {
    var xhr = new XMLHttpRequest();

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            callback();
        }
    };
    xhr.send(param);
};



const renderLogin = () => {
  const login = `
  <form id="login">
    <div>
      <label for="username">Username</label>
        <input id="username" type="text" name="username" />
      </label>    
    <div>
      <label for="password">Password</label>
      <input id="password" type="password" name="password" />
    </div>
    <input type="submit" value="Submit" />
  </form>
  `;
  document.querySelector('body').insertAdjacentHTML('beforeend', login); 
};

const sendUserCredentials = (username, password) => {
  sendData('https://google.com', 'POST', {username: username, password: password}, () => {
    console.log('Message sent!');
  });
};

const bindEvents = () => {
  const $login = document.querySelector('#login');
  const $username = document.querySelector('#username');
  const $password = document.querySelector('#password');
  
  $login.addEventListener('submit', e => {
      e.preventDefault();
      sendUserCredentials($username.value, $password.value)
      return false;
  });
};

ready(() => {
  renderLogin();
  bindEvents();
});
