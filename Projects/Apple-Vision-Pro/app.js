function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
          return arguments.length
              ? locoScroll.scrollTo(value, 0, 0)
              : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
          return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
          };
      },
      pinType: document.querySelector("#main").style.transform
          ? "transform"
          : "fixed",
  });

  gsap.from(".line-1", {
      scrollTrigger: {
          trigger: ".line-1",
          scroller: "#main",
          scrub: true,
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => console.log(self.direction),
      },
      scaleX: 0,
      transformOrigin: "left center",
      ease: "none",
  });

  gsap.from(".line-2", {
      scrollTrigger: {
          trigger: ".orange",
          scroller: "#main",
          scrub: true,
          pin: true,
          start: "top top",
          end: "+=100%",
      },
      scaleX: 0,
      transformOrigin: "left center",
      ease: "none",
  });

  var tl = gsap.timeline({
      scrollTrigger: {
          trigger: ".purple",
          scroller: "#main",
          scrub: true,
          pin: true,
          start: "top top",
          end: "+=100%",
      },
  });

  tl.from(".purple p", {
      scale: 0.3,
      rotation: 45,
      autoAlpha: 0,
      ease: "power2",
  })
      .from(
          ".line-3",
          { scaleX: 0, transformOrigin: "left center", ease: "none" },
          0
      )
      .to(".purple", { backgroundColor: "#28a92b" }, 0);

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}

locomotive();

gsap.to(".page1>video", {
  scrollTrigger: {
      trigger: ".page1>video",
      start: "2% top",
      end: "bottom top",
      scroller: "#main",
      onEnter: () => {
          document.querySelector(".page1>video").play();
      },
  },
});

// gsap.to(".page1", {
//   scrollTrigger: {
//     trigger: ".page1",
//     start: "top top",
//     end: "bottom top",
//     scroller: "#main",
//     pin: true,
//   },
// });

// gsap.to(".hero-bottom", {
//   scrollTrigger: {
//     trigger: ".hero-bottom",
//     start: "5% top",
//     end: "bottom top",
//     scroller: "#main",
//     pin: true,
//   },
//   opacity: 0,
// });
