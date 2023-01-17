$(document).ready(function () {
    var offset = 0;
    setInterval( function() {
        var endTime = new Date("2023-03-14");
        var endTime = (Date.parse(endTime)) / 1000;

        var now = new Date();
        var now = (Date.parse(now) / 1000);

        var timeLeft = endTime - now;

        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

        var realTime = days + ' : ' + ( hours < 10 ? '0' : '' ) + hours + ' : ' + ( minutes < 10 ? '0' : '' ) + minutes + ' : ' + ( seconds < 10 ? '0' : '' ) + seconds;

        $('.time').html(realTime);
        $('.time').attr('data-time', realTime);

    }, 100);

    const span = document.querySelector('.hover-btn2')
    const overlay = document.querySelector('.overlay')

    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const x = Math.round((clientX / window.innerWidth) * 100);
        const y = Math.round((clientY / window.innerHeight) * 100);

        gsap.config(
            {
                nullTargetWarn: false
            }
        );

        gsap.to(overlay, {
            '--x': `${x}%`,
            '--y': `${y}%`,
            duration: 0.3,
            ease: 'sine.out',
        })
    })

    var Scrollbar = window.Scrollbar;

    var options = {
        damping: 0.05,
        alwaysShowTracks: false,
        continuousScrolling: false
    };

    Scrollbar.init(document.querySelector('#smooth-scrolling'), options);

    $('#pagepiling').pagepiling({
        menu: '#section__slider-menu',
        direction: 'horizontal',
       // verticalCentered: true,
        anchors: ['lecture1', 'lecture2', 'lecture3'],
        scrollingSpeed: 700,
        easing: 'swing',
        loopBottom: true,
        loopTop: false,
        css3: true,
        navigation: true,
        normalScrollElements: null,
        normalScrollElementTouchThreshold: 5,
        touchSensitivity: 5,
        keyboardScrolling: true,
        sectionSelector: '.section',
        animateAnchor: true,

        //events
        onLeave: function(index, nextIndex, direction){
        },
        afterRender: function(){
        },
        afterLoad: function(anchorLink, index){
        }
    });

    $.fn.pagepiling.setMouseWheelScrolling();

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const elem = entry.target;

            if (entry.isIntersecting) {
                elem.classList.toggle(elem.getAttribute('data-animation'), entry.isIntersecting);
                observer.unobserve(entry.target);
            }
            else
            {
                elem.classList.remove(elem.getAttribute('data-animation'));
            }
        });
    });
    document.querySelectorAll('.animate__animated').forEach(
      function (elem){
          observer.observe(elem);
      }
    );


    $(".nav-link").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;
            var hash_offset = $(hash).offset().top;

            Scrollbar.getAll()[0].scrollTo(0, hash_offset, 600);

        }
    });

    $('.nav-link').on('click', function(target){
       $('.navbar-nav').find('.nav-link').each(function (elem){
           console.log($(this))
                    $(this).removeClass('active');

            }
        );
        $(target.target).addClass('active');
    });
});