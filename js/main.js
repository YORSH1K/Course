const regForm = document.getElementById('regForm');
const regStatus = document.getElementById('regStatus');

// Scroll to anchors
(function () {

    const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('.menu').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;
    
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };

    scrollTo();

}());

// --------Обработчик события"ОТПРАВИТЬ"--------
var form = document.querySelector("form");
var log = document.querySelector("#log");

form.addEventListener("submit", function(event) {
  var data = new FormData(form);
  var output = "";
  for (const entry of data) {
    output = entry[0] + "=" + entry[1] + "\r";
  };
  log.innerText = output;
  event.preventDefault();
}, false);


// Запрос
regForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    regStatus.classList.remove('warning');
    const data = Object.fromEntries(new FormData(event.target).entries());
    const req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:3000/regform');
    req.responseType = "json";
    req.setRequestHeader('Content-Type', 'application/json');

    req.onreadystatechange = function() {
        if (this.readyState != 4) return;
        console.log(typeof this.response)
        if(this.response.error){
            regStatus.classList.add('warning');
        }
        regStatus.innerText = this.response.message;
    }
    req.send(JSON.stringify(data));		
})