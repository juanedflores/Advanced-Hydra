// bin changes
toggles = [];
states = [];

// handle time.
t_snapshot = 0;
psnap = 0;
nsnap = 0;

// scroll() direction
DIR = 1;

/**
 * A boolean assigned to a bin within the array called "states" will be
 * switched from false to true whenever the entered bin level crosses over the
 * cutoff (HIGH state). When it crosses the cutoff back down when state is
 * true, the value will be switched back to false (LOW state).
 */
GET_STATE = bin => {
  if (a.fft[bin] && !states[bin]) {
    states[bin] = true; // HIGH
  } else if (!a.fft[bin] && states[bin]) {
    states[bin] = false; // LOW
  }
  return states[bin];
};

/**
 * HIGH ([bin number], [returned value if true], [returned value if false])
 * A function that returns the entered value 'vt' only if
 * the current state is HIGH. (if state == true)
 * Returns 'vf' otherwise.
 */
HIGH = (bin, vt, vf) => {
  st = GET_STATE(bin);
  if (st) {
    return vt;
  } else {
    return vf;
  }
};

/**
 * LOW ([bin number], [returned value if true], [returned value if false])
 * A function that returns the entered value 'vt' only if
 * the current state for the entered bin is LOW. (if state == false)
 * Returns 'vf' otherwise.
 */
LOW = (bin, vt, vf) => {
  st = GET_STATE(bin);
  if (!st) {
    return vt;
  } else {
    return vf;
  }
};

/**
 * HIGHEST ([bin number], [returned value if true], [returned value if false])
 * A function that returns the entered value 'vt' only
 * if the entered bin has the HIGHEST bin level out of all of the
 * bins AND if it is in a HIGH state. Returns 'vf' otherwise.
 */
HIGHEST = (bin, vt, vf) => {
  const values = [];
  for (let i = 0; i < states.length; i++) {
    values.push(a.fft[i]);
  }
  var maxIndex = 0;
  let max = values[maxIndex];
  for (let i = 1; i < values.length; i++) {
    if (values[i] > max) {
      max = values[i];
      maxIndex = i;
    }
  }
  st = GET_STATE(bin);
  if (maxIndex == bin && st) {
    return vt;
  } else {
    return vf;
  }
};

/**
 * LOWEST ([bin number], [returned value if true], [returned value if false])
 * A function that returns the entered value 'vt' only
 * if the entered bin has the LOWEST bin level out of all of the
 * bins AND if it is in a HIGH state. Returns 'vf' otherwise.
 */
LOWEST = (bin, vt, vf) => {
  const values = [];
  for (let i = 0; i < states.length; i++) {
    values.push(a.fft[i]);
  }
  var minIndex = 0;
  let min = values[minIndex];
  for (let i = 1; i < values.length; i++) {
    if (values[i] < min) {
      min = values[i];
      minIndex = i;
    }
  }
  st = GET_STATE(bin);
  if (minIndex == bin && st) {
    return vt;
  } else {
    return vf;
  }
};

/**
 * CHANGE_DIR_SCROLL ([bin number], [hydra's time variable])
 * A function that changes direction of the Hydra scroll functions each
 * time it reaches a HIGH state.
 */
CHANGE_DIR_SCROLL = (bin, time) => {
  let value;
  lastState = states[bin];
  st = GET_STATE(bin);
  if (st && st != lastState) {
    DIR = -DIR;
    t_snapshot = time;
  }
  let t_increment = (time % 1) - (t_snapshot % 1);
  if (DIR == 1) {
    value = time % 1;
    if (nsnap) {
      value = 1 - Math.abs(nsnap) + t_increment;
      psnap = value;
    }
  } else if (DIR == -1) {
    diff = (1 - (t_snapshot % 1)) * -1;
    if (psnap) {
      diff = (1 - psnap) * -1;
    }
    value = diff + -t_increment;
    nsnap = value;
  }
  return value % 1;
};

///////////////////////// VISUAL /////////////////////////
/**
 * FADE ([start], [target], [alpha])
 * A function to fade into a target value from a starting value.
 * Credit goes to Charlie Roberts for sharing this in the Hydra toplap chat.
 */
FADE = (start, target, alpha) => {
  let t = target;
  let s = start;
  let running = true;
  return () => {
    if (running) {
      s += alpha * (t - s);
      if (Math.abs(target - s < 0.0001)) running = false;
    } else {
      return target;
    }
    return s;
  };
};

// Easy-to-use functions for image using Ritchse
window.initImg = function (source, url, isVideo = false) {
  var img = document.createElement("img");
  img.crossOrigin = "anonymous";
  img.src = url;
  img.onload = function () {
    source.init({ src: img, dynamic: isVideo });
  };
};

osc().constructor.prototype.correctScale = function (source) {
  return this.scale(
    1,
    ((source.src.width / source.src.height) * innerHeight) / innerWidth
  );
};
