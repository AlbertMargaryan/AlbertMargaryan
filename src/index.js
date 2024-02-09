document.addEventListener("DOMContentLoaded", function() {
    window.scrollTo(0,0);
});

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
                scrollToSection(currentSectionIndex);
            }
        } else {
            if (currentSectionIndex > 0) {
                currentSectionIndex--;
                scrollToSection(currentSectionIndex);
            }
        }
    isScrollBlocked = true;
    setTimeout(() => {
        isScrollBlocked = false;
    }, 1000);
    }

    function scrollToSection(index) {
        const section = document.querySelector(`.${sectionClasses[index]}`);
        section.scrollIntoView({ behavior: "smooth" });
    }

    const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');

    // Add click event listener to each smooth-scroll link
    smoothScrollLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const newIndex = sectionClasses.indexOf(targetId);
            currentSectionIndex = newIndex;
            scrollToSection(currentSectionIndex);
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
