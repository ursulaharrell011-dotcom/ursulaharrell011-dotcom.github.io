(function () {
  function activate(img) {
    var src = img.dataset.src;
    if (!src) return;
    img.src = src;
    img.removeAttribute('data-src');
    img.classList.add('lazy--loaded');
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          activate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px 0px' });

    document.querySelectorAll('img[data-src]').forEach(function (img) {
      io.observe(img);
    });
  } else {
    document.querySelectorAll('img[data-src]').forEach(activate);
  }

  if ('IntersectionObserver' in window) {
    var contentIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('lazy--loaded');
          contentIO.unobserve(entry.target);
        }
      });
    }, { rootMargin: '100px 0px' });

    document.querySelectorAll('.post__content img:not([data-src])').forEach(function (img) {
      img.classList.add('lazy--content');
      if (img.complete) {
        img.classList.add('lazy--loaded');
      } else {
        contentIO.observe(img);
        img.addEventListener('load', function () {
          img.classList.add('lazy--loaded');
        });
      }
    });
  }
})();
