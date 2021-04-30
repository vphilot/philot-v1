window.addEventListener('DOMContentLoaded', (event) => {
    let options = {
        elements: ['.swup'],
        cache: false,
        animateHistoryBrowsing: true
    }

    const swup = new Swup(options);

    swup.on("contentReplaced", function (event) {
        initMobileNavigation();
        initFooter();
        let elements = document.querySelectorAll('.swup-delay');
        if (elements) {
            for (i = 0; i < elements.length; i++) {
                elements[i].style.transitionDelay = 0.1 * i + 's';
                elements[i].parentNode.style.overflow = 'hidden';
            }
        }
    });
    initMobileNavigation();
    initFooter();
});

function initMobileNavigation(){
    let navigationToggle = document.querySelector('.navigation__toggle');
    if (navigationToggle) {
        navigationToggle.addEventListener('click', function(e){
            document.querySelector('#navigation').classList.toggle('is-active');
            this.classList.toggle('is-active');
        });
    }
}

function initFooter(){
    const display = document.getElementById("footerDisplay");
    const copy = [
      {
        name: "jekyll",
        url: "https://jekyllrb.com/"
      },
      {
        name: "gulp",
        url: "https://gulpjs.com/"
      },
      {
        name: "bulma",
        url: "https://bulma.io/"
      },
      {
        name: "swup",
        url: "https://github.com/gmrchk/swup"
      },
      {
        name: "netlify",
        url: "https://www.netlify.com/"
      },
      {
        name: "babel",
        url: "https://babeljs.io/"
      }
    ]
    let i = 0;

    if (display) {
      setInterval(function(){
        display.innerHTML = copy[i].name;
        display.setAttribute("href", copy[i].url);
        i++;
        if (i == copy.length) {
          i = 0;
        }
     }, 2000);
    }
  }
