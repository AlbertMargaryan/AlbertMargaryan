document.addEventListener("DOMContentLoaded", function() {
    window.scrollTo(0,0);
});


let pos = 0;
let int = null;
let x;

function handleScrolling(sectionClasses) {
    let currentSectionIndex = 0;
    let isScrollBlocked = false;

    function blockScroll() {
        isScrollBlocked = true;
    }

    function unblockScroll() {
        isScrollBlocked = false;
    }

    function handleScroll(event) {
    	event.preventDefault();
        if (isScrollBlocked) {
            return 0;
        }
        const direction = event.deltaY > 0 ? "down" : "up";

        if (direction === "down") {
            if (currentSectionIndex < sectionClasses.length - 1) {
                currentSectionIndex++;
                scrollToSection(currentSectionIndex, direction);
            }
        } else {
            if (currentSectionIndex > 0) {
                currentSectionIndex--;
                scrollToSection(currentSectionIndex, direction);
            }
        }
    isScrollBlocked = true;
    setTimeout(() => {
        isScrollBlocked = false;
    }, 1000);
    }

      function frame(dir, elem) {
        if (dir === 'down') {
            x *= 1.08;
            elem.style.bottom = parseInt(elem.style.bottom) - (1 * x) + 'px'
            if (parseInt(elem.style.bottom) < -300) {
                clearInterval(int)
            }
        } else {
            x *= 1.08;
            elem.style.bottom = parseInt(elem.style.bottom) + (1 * x) + 'px'
            if (parseInt(elem.style.bottom) >= 0) {
                elem.style.bottom = '0px';
                clearInterval(int)
            }
        }
      }

    function scrollToSection(index, dir) {
        const section = document.querySelector(`.${sectionClasses[index]}`);
        section.scrollIntoView({ behavior: "smooth" });
        //Manipulate navbar
        document.querySelectorAll('.smooth-scroll').forEach((elem) => {
            elem.style.color = 'black';
        })
        document.querySelector("#"+sections[index]+"-scroll").style.color = '#1034A6';
        if ((dir === 'down') || (index === 0)) {
            let elem = document.querySelector(".scroll-down");
            x = 1;
            clearInterval(int);
            int = setInterval(() => {frame(dir, elem)}, 10);
        }
    }

    const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');

    // Add click event listener to each smooth-scroll link
    smoothScrollLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            //Manipulate navbar
            smoothScrollLinks.forEach((elem) => {
                elem.style.color = 'black';
            })
            e.target.style.color = '#1034A6';
            const targetId = this.getAttribute('href').substring(1);
            const newIndex = sectionClasses.indexOf(targetId);
            currentSectionIndex = newIndex;
            const dir = newIndex === 0 ? 'up' : 'down';
            scrollToSection(currentSectionIndex, dir);
        });
    });

    window.addEventListener("wheel", handleScroll, { passive: false });

    return {
        blockScroll,
        unblockScroll
    };
}


const sections = ["about", "showcase", "skills", "contact"];

const scrolling = handleScrolling(sections);

// Block scrolling
// scrolling.blockScroll();

// Unblock scrolling
// scrolling.unblockScroll();


//Carousel:
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const cardWidth = carousel.querySelector(".card").offsetWidth;
  const numCards = carousel.querySelectorAll(".card").length;
  const containerWidth = carousel.offsetWidth;
  let currentIndex = 0;

  document.querySelector(".right-button").addEventListener("click", function () {
    if (currentIndex < numCards - 3) {
      currentIndex += 3;
      carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  });

  document.querySelector(".left-button").addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex -= 3;
      carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  });
});