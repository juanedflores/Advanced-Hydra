states = [];

let xdir = 1;
let tsnap = 0;
let psnap = 0;
let nsnap = 0;
let ran = 1;

let freq;
let noiseScale;
let slide;
const fftmult = 20;
let fft0, fft1, fft2, fft3;
let s1, s2, s3;
let ranbin;

GLOBAL = () => {
  xdir = -xdir;
  tsnap = time;
  ran = Math.random();
  freq = Math.floor(ran * 20) + 4;
  noiseScale = Math.floor(ran * 5) + 4;
  fft0 = a.fft[0] * fftmult;
  fft1 = a.fft[1] * fftmult;
  fft2 = a.fft[2] * fftmult;
  fft3 = a.fft[3] * fftmult;
  ranbin = Math.floor(Math.random() * bintotal);
  if (ran > 0.5) {
    slide = 1;
  } else {
    slide = 0;
  }
};

/**
 * A boolean assigned to the variable "state" will be switched from false to
 * true whenever the entered bin level crosses the cutoff (HIGH state). When
 * it crosses the cutoff back down when state is true, the value will be switched
 * back to false (LOW state).
 */
GET_STATE = bin => {
  if (a.fft[bin] && !states[bin]) {
    states[bin] = true; // HIGH
  } else if (!a.fft[bin] && states[bin]) {
    states[bin] = false; // LOW
  }
  return state;
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
 * bins AND if it is on a HIGH state. Returns 'vf' otherwise.
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
 * bins AND if it is on a HIGH state. Returns 'vf' otherwise.
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

changeDirection = (bin, time, speed) => {
  let value;
  TOGGLE(bin);
  tinc = ((time * speed) % 1) - ((tsnap * speed) % 1);
  if (xdir == 1) {
    value = (time * speed) % 1;
    if (nsnap) {
      value = 1 - Math.abs(nsnap) + tinc;
      psnap = value;
    }
  } else if (xdir == -1) {
    diff = (1 - ((tsnap * speed) % 1)) * -1;
    value = diff + -tinc;
    nsnap = value;
    if (psnap) {
      diff = (1 - psnap) * -1;
      value = diff + -tinc;
      nsnap = value;
    }
  }
  return value;
};

RANBIN = () => {
  rb = Math.floor(Math.random() * bintotal);
  console.log(rb);
  return rb;
};
