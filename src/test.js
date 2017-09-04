
    jQuery(function ($) {
      console.log('test');
      var tab = null;
      var menuSelector = null;
      var guard = false;
      function changeMenuSelector() {
        if ($(document).width() > 967) {
          menuSelector = 'top-menu-nav';
          guard = false;
          initEventListeners(guard);
        } else {
          menuSelector = 'mobile_menu';
          guard = true;
          initEventListeners(guard);
        }
      }

      function initEventListeners(guard) {
        var localGuard = null;
        if (localGuard != guard) {
          var hrefs = ['howtos', 'projects', 'reviews', 'elearning', 'others'];
          hrefs.forEach(
            function (element, index, array) {
              $('#' + menuSelector + ' a[href*="' + element + '"]').off();
              console.log(element);
              $('#' + menuSelector + ' a[href*="' + element + '"]').on('click', function (e) {
                e.preventDefault();
                console.log('pluto');
                window.localStorage.setItem('tab', 'et_pb_tab_' + index);
                if (window.location.pathname.indexOf('blog-posts') === -1) {
                  window.location.href = 'http://www.davidepugliese.com/blog-posts/';
                } else {
                  tab = localStorage.getItem('tab');
                  $("li." + tab + ">a")[0].click();
                  $("html, body").animate({ scrollTop: $('.et_pb_module.et_pb_tabs.et_pb_tabs_0').offset().top },
                    1000);
                  window.localStorage.removeItem('tab');
                }
              });
            });
          localGuard = guard;
        }
      }


      changeMenuSelector();
      initEventListeners();

      $(popc).resize(function () {
        changeMenuSelector();

      });

      if (!!localStorage.getItem('tab')) {
        tab = localStorage.getItem('tab');
        console.log(tab);
        setTimeout(function(){$("li."+tab+">a")[0].click();}, 1)
        $("html, body").animate({ scrollTop: $('.et_pb_module.et_pb_tabs.et_pb_tabs_0').offset().top },
          1000);
        localStorage.removeItem('tab');
      }
    });
