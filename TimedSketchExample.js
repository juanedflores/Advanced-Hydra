/*
 * An example of how to map a Hydra sketch to fit an audio track
 * using the built-in time variable.
 */

// boolean to check if sketch and time has started.
timerstarted = false;
// save the amount of time elapsed before user started timer.
timediff = 0;

/*
 * Evaluate START() in the web console to start the sketch
 */
START = () => {
  console.log("starting..");
  countdown = 4;
  countdownInterval = setInterval(function () {
    countdown = countdown - 1;
    if (countdown == 0) {
      console.log("START!");
      clearInterval(countdownInterval);
      timerstarted = true;
      timediff = time;
      main();
    } else {
      console.log(countdown);
    }
  }, 1000);
};

/*
 * Have a global function that is evaluated every tick.
 */
toggled = false;
GLOBAL = () => {
  st = GET_STATE(0);
  if (st && toggled == false) {
    toggled = true;
  } else if (!st && toggled == true) {
    toggled = false;
  }

  // TIME SCRIPT
  if (timestarted) {
    if (time - timediff > 10) {
      console.log("ten seconds..");
    }
    if (time - timediff > 20) {
      console.log("twenty seconds..");
    }
  }
};
/*
 * Define a main function that will be your main sketch
 */
main = () =>
  solid(() => GLOBAL())
    .add(shape(4, 0.3, 0.01).rotate(({ time }) => (time / 10) % 360))
    .out();
