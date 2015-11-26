/* global Polymer */

((document) => {
  'use strict';

  // smooth scrolling
  function scrollTo(element, to, duration) {
    let start = element.scrollTop;
    let change = to - start;
    let increment = 20;

    let animateScroll = (elapsedTime) => {
      elapsedTime += increment;
      let position = easeInOut(elapsedTime, start, change, duration);
      element.scrollTop = position;
      if (elapsedTime < duration) {
        setTimeout(() => {
          animateScroll(elapsedTime);
        }, increment);
      }
    };

    animateScroll(0);
  }

  function easeInOut(currentTime, start, change, duration) {
    currentTime /= duration / 2;
    if (currentTime < 1) {
      return change / 2 * currentTime * currentTime + start;
    }
    currentTime -= 1;
    return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
  }

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  let app = document.querySelector('#app');

  let sectionDetail;

  // animation variables
  app.ANIMATION_EASE_IN_BACK = 'cubic-bezier(.6, -.28, .735, .045)';
  app.ANIMATION_EASE_OUT_BACK = 'cubic-bezier(.175, .885, .32, 1.275)';

  // Initialize page transition animations
  app.entryAnimation = 'slide-from-right-animation';
  app.exitAnimation = 'slide-left-animation';

  app.displayInstalledToast = () => {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!document.querySelector('platinum-sw-cache').disabled) {
      document.querySelector('#caching-complete').show();
    }
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', () => {
    sectionDetail = document.querySelector('#sectionDetail');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', () => {
    // imports are loaded and elements have been registered
  });

  // Main area's paper-scroll-header-panel custom condensing transformation of
  // the appName in the middle-container and the bottom title in the bottom-container.
  // The appName is moved to top and shrunk on condensing. The bottom sub title
  // is shrunk to nothing on condensing.
  addEventListener('paper-header-transform', (e) => {
    let appName = document.querySelector('#mainToolbar .app-name');
    let middleContainer = document.querySelector('#mainToolbar .middle-container');
    let bottomContainer = document.querySelector('#mainToolbar .bottom-container');
    let detail = e.detail;
    let heightDiff = detail.height - detail.condensedHeight;
    let yRatio = Math.min(1, detail.y / heightDiff);
    let maxMiddleScale = 0.75;  // appName max size when condensed. The smaller the number the smaller the condensed size.
    let scaleMiddle = Math.max(maxMiddleScale, (heightDiff - detail.y) / (heightDiff / (1 - maxMiddleScale)) + maxMiddleScale);
    let scaleBottom = 1 - yRatio;

    // Move/translate middleContainer
    Polymer.Base.transform(`translate3d(0, ${yRatio * 100}%, 0)`, middleContainer);

    // Scale bottomContainer and bottom sub title to nothing and back
    Polymer.Base.transform(`scale(${scaleBottom}) translateZ(0)`, bottomContainer);

    // Scale middleContainer appName
    Polymer.Base.transform(`scale(${scaleMiddle}) translateZ(0)`, appName);

    // Fade out bottomContainer and bottom sub title to nothing and back
    bottomContainer.style.opacity = scaleBottom;
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app._onDataRouteTap = () => {
    app.entryAnimation = 'slide-from-right-animation';
    app.exitAnimation = 'slide-left-animation';

    let drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

  // After the MENU button has transitioned into a BACK button, the action
  // is changed from poping up the drawer to go back to previous page
  app._onBackTap = () => {
    let toggle = document.getElementById('paperToggle');

    if (toggle.icon === 'menu') {
      app.pageAnimationForward();
    } else {
      app.pageAnimationBackward();
      history.go(-1);
    }
  };

  // Scroll page to top and expand header
  app.scrollPageToTop = () => {
    setTimeout(() => scrollTo(document.getElementById('mainContainer'), 0, 250), 400);
  };

  app.pageAnimationForward = () => {
    if (app.route === 'report') {
      app.entryAnimation = '';
      app.exitAnimation = 'slide-left-animation';
    } else if (app.route === 'section') {
      sectionDetail.useUpDownTransition = true;

      app.entryAnimation = '';
      app.exitAnimation = '';
    } else {
      app.entryAnimation = 'slide-from-right-animation';
      app.exitAnimation = 'slide-left-animation';
    }
  };

  app.pageAnimationBackward = () => {
    if (app.route === 'section') {
      sectionDetail.useUpDownTransition = false;

      app.entryAnimation = 'slide-from-left-animation';
      app.exitAnimation = '';
    } else if (app.route === 'products' || app.route === 'orgunits') {
      app.entryAnimation = '';
      app.exitAnimation = '';
    } else {
      app.entryAnimation = 'slide-from-left-animation';
      app.exitAnimation = 'slide-right-animation';
    }
  };

})(document);
