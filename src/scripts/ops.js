const sections = $("section");
const display = $(".maincontent");

sections.first().addClass('active');

let inScroll = false;

const performTransition = sectionEq => {
    if (inScroll) { return; }

    inScroll = true;

    const position = sectionEq * -100;

    display.css({
        transform : `translateY(${position}%)`
    });

    sections.eq(sectionEq).addClass('active').siblings().removeClass('active');

    setTimeout(() => {
        inScroll = false;

        const currentSection = sections.eq(sectionEq);
        const menuTheme = currentSection.attr('data-sidemenu-theme');
        const sideMenu = $('.fixed-menu');

        sideMenu
            .find('.fixed-menu__item--active a')
            .css({ borderColor: 'transparent' });
        sideMenu
            .find('.fixed-menu__item--active .menu-link-dot-decoration')
            .css({ backgroundColor: '#C4C4C4' });

        sideMenu
            .find('.fixed-menu__item')
            .eq(sectionEq)
            .addClass('fixed-menu__item--active')
            .siblings()
            .removeClass('fixed-menu__item--active');

        const sideMenuActiveLink = $('.fixed-menu__item--active a');
        const sideMenuActiveLinkDot = $('.fixed-menu__item--active .menu-link-dot-decoration');

        sideMenuActiveLink.css({ borderColor: menuTheme });
        sideMenuActiveLinkDot.css({ backgroundColor: menuTheme })

    }, 1300);
}

const scrollViewport = (direction) => {
    const activeSection = sections.filter('.active');
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction === 'next' && nextSection.length) {
        performTransition(nextSection.index());
    }
    if (direction === 'prev' && prevSection.length) {
        performTransition(prevSection.index());
    }
}

$(window).on("wheel", e => {

    const deltaY = e.originalEvent.deltaY;

    if (deltaY > 0) {
        scrollViewport('next');
    }

    if (deltaY < 0) {
        scrollViewport('prev');
    }

});

$(window).on('keydown', (e) => {
    const tagName = e.target.tagName.toLowerCase();

    if (tagName === 'input' || tagName === 'textarea') { return; }

    switch (e.keyCode) {
        case 38:
            scrollViewport('prev');
            break;
        case 40:
            scrollViewport('next');
            break;
    }
});

$('[data-scroll-to]').click((e) => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr('data-scroll-to');
    const reqSection = $(`[data-section-index="${target}"]`);

    performTransition(reqSection.index());
});

$(function() {
    const md = new MobileDetect(window.navigator.userAgent);

    if (md.mobile()) {
        $('.wrapper').on('touchmove', (e) => e.preventDefault());

        $("body").swipe( {
            swipe: function(event, direction) {
                console.log(direction);

                if (direction === 'up') {
                    scrollViewport('next');
                }
                if (direction === 'down') {
                    scrollViewport('prev');
                }
            }
        });
    }
});