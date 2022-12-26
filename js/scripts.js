(function () {
  // =============================================
  // Fixed Navigation
  // =============================================

  let navOffset = $("header").height() + 50;

  function nav() {
    $(window).on("scroll", function () {
      let scroll = $(window).scrollTop();
      if (scroll >= navOffset) {
        $("header").addClass("h-fixed");
      } else {
        $("header").removeClass("h-fixed");
      }
    });
  }

  nav();

  // =============================================
  // Search Box
  // =============================================

  $("#search_input_box").css("display", "none");
  $("#search").on("click", () => {
    $("#search_input_box").slideDown();
  });
  $("#close_search").on("click", () => {
    $("#search_input_box").slideUp();
  });

  // =============================================
  // Clients Slider
  // =============================================
  function active_testimonial() {
    if ($(".active_testimonial").length) {
      $(".active_testimonial").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        nav: false,
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        responsiveClass: true,
        thumbs: true,
        thumbsPrerendered: true,
      });
    }
  }
  active_testimonial();

  // =============================================
  // Count Down
  // =============================================

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function initializeClock(id, endtime) {
    let clock = document.getElementById(id);
    let daysSpan = clock.querySelector(".days");
    let hoursSpan = clock.querySelector(".hour");
    let minutesSpan = clock.querySelector(".mins");
    let secondsSpan = clock.querySelector(".secs");

    function updateClock() {
      let t = getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
      minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
      secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    let timeinterval = setInterval(updateClock, 1000);
  }

  let deadline = new Date(Date.parse(new Date()) + 30 * 24 * 60 * 60 * 1000);
  initializeClock("clockdiv", deadline);
})();
