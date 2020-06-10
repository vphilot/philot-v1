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
        if (document.querySelector('#instagram')){
        processInstagramData();
        }
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
    if (document.querySelector('#instagram')){
      processInstagramData();
      }
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

    function processInstagramData() {

        fetch(`https://graph.instagram.com/me/media?fields=media_url,permalink,thumbnail_url&access_token=IGQVJVT1loZATh6SmhyRHVhMjlpMGlTWE5wQUtwbTJ6VS1uYkl1T05PbXBMNllBdTF4TmFMMUVzZAGhuUU92UXdCZA3I5VFBULTgzeV9PQ3FXa0w0SlVVYkxBNF9wZA29NeWVIMlpWSjZANTnJMLU1ZAcTFqRAZDZD`)
          .then(response => {
            if (response.status !== 200) {
              console.log( `we have a problem with status code ${response.status}`);
              return;
            }
            response.json().then(data => {
              data.data.slice(0, 4).map(_item => {
                populateInstagramItem(_item.permalink, _item.thumbnail_url ? _item.thumbnail_url : _item.media_url)
              });
            });
          })
          .catch(err => console.error(err)); 
    }


    function populateInstagramItem(permalink, thumb) {
      document.querySelector('#instagram').innerHTML +=
      `
      <div class="column is-3-desktop is-3-tablet is-6-mobile image card-instagram"><a href="${permalink}" target="_blank"><figure class="image is-1by1"><img class="is-square is-rounded" src="${thumb}"></figure></a></div>
      `
    }