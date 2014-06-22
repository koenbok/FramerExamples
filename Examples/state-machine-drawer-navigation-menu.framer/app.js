/* Airbnb-style Drawer Navigation Menu */

/* To try it out, click on the prototype. The front layer should scale down and rotate slightly,
and the menu options should come in from the side, similar to what happens in the Airbnb app. */

/* Setup */
var back, container, front, i, menu, menuOption, menuOptions, option, _i, _len;

container = new Layer({
  width: 640,
  height: 1136
});

/* We'll need this line, so our 3D effects look more pronounced */

container.style.webkitPerspective = '1000px';

/* We'll use this layer for the background... */

back = new Layer({
  width: container.width,
  height: container.height,
  superLayer: container,
  image: 'images/bg.png'
});

/* ...And this one for the front view of our app */

front = new Layer({
  width: container.width,
  height: container.height,
  superLayer: container,
  originX: 0,
  originY: 0.5,
  image: 'images/front.png'
});

/* Next, we'll add a container for the menu options */

menu = new Layer({
  width: 320,
  height: 750,
  x: -60,
  midY: container.midY,
  superLayer: back,
  clip: false,
  scale: 1.2,
  backgroundColor: 'transparent'
});

menu.style.webkitPerspective = '1000px';

/* Then we'll create each option as a subLayer to the menu layer.
We'll start them off slightly rotated (each one is rotated slightly more than the next) and fully transparent. This will be the initial, or "default" state of the menu options. */

menuOptions = (function() {
  var _i, _len, _ref, _results;
  _ref = ['Search', 'Discover', 'Your Trips', 'Wish Lists', 'Inbox'];
  _results = [];
  for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
    option = _ref[i];
    menuOption = new Layer({
      superLayer: menu,
      width: menu.width,
      height: 150,
      y: i * 150,
      originX: 0,
      originY: 0.5,
      rotationY: -90 + i * 15,
      opacity: 0,
      backgroundColor: 'transparent'
    });
    menuOption.html = option;
    menuOption.style = {
      fontSize: '32px',
      fontWeight: 200,
      lineHeight: '88px',
      color: '#333'
    };
    _results.push(menuOption);
  }
  return _results;
})();

/* Define the other states we'll be using. In this prototype, we'll need only one more state -
one that defines how the individual layers of our prototype look when the menu is open */

/* When the menu is open, the front view is scaled down and rotated slightly */

front.states.add('menuOpen', {
  x: 420,
  scale: 0.55,
  rotationY: -20
});

/* Then we'll provide the animation options for getting in and out of the state we just defined */

front.states.animationOptions = back.states.animationOptions = {
  curve: 'spring',
  curveOptions: {
    tension: 300,
    friction: 50,
    velocity: 0
  }
};

/* In its "menuOpen" state, each option is fully opaque and rotated to its starting position */

for (i = _i = 0, _len = menuOptions.length; _i < _len; i = ++_i) {
  menuOption = menuOptions[i];
  menuOption.states.add('menuOpen', {
    opacity: 1,
    rotationY: 0
  });

  /* We'll use a slightly different animation for the menu options coming in.
  	Since there's less tension, the animation will take a little longer to settle.
   */
  menuOption.states.animationOptions = {
    delay: i * 0.08,
    curve: 'spring',
    curveOptions: {
      tension: 200,
      friction: 50,
      velocity: 0
    }
  };
}

/* Finally we'll define a state for the container of the menu options. It will go
back to 60px off the left edge of the screen and scale to its original size. */

menu.states.add('menuOpen', {
  scale: 1,
  x: 60
});

menu.states.animationOptions = {
  curve: 'spring',
  curveOptions: {
    tension: 250,
    friction: 50,
    velocity: 0
  }
};

/* Alternate between the menuOpen and default state of the menu when the menu button is clicked.
For simplicity, we've made the entire front layer clickable. */

front.on(Events.Click, function() {
  var _j, _len1, _results;
  front.states.next();
  menu.states.next();
  _results = [];
  for (_j = 0, _len1 = menuOptions.length; _j < _len1; _j++) {
    option = menuOptions[_j];
    _results.push(option.states.next());
  }
  return _results;
});
