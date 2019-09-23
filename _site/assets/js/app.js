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
        processInstagramData();
        
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
    processInstagramData();
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
  
    setInterval(function(){
       display.innerHTML = copy[i].name;
       display.setAttribute("href", copy[i].url);
       i++;
       if (i == copy.length) {
         i = 0;
       }
    }, 2000);
  }

function processInstagramData() {
    if (document.querySelector('#instagram')){
        const Http = new XMLHttpRequest();
        const url =
            'https://api.instagram.com/v1/users/self/media/recent?access_token=30784295.1dd5a77.021e5a56a1db49f89b3ee0f1c6dccd13&count=4';
        Http.open("GET", url, true);
        Http.send();
        Http.onreadystatechange = function (e) {
            if (this.readyState == 4 && this.status == 200) {
                var json = JSON.parse(Http.responseText);
                for (x in json.data) {
                    document.querySelector('#instagram').innerHTML +=
                        '<div class="column is-3-desktop is-3-tablet is-6-mobile image card-instagram"><a href="' + json.data[x].link + '" target="_blank"><figure class="image is-1by1"><img class="is-square is-rounded" src="' + json.data[
                            x]
                        .images.standard_resolution.url + '"></figure></a></div>'
                }
            }
        }
    }
}
