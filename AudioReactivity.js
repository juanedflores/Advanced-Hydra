let toggle = false;
let xdir = 1;
let tsnap = 0;
let psnap = 0;
let nsnap = 0;
let ran = 1;
let freq;
let noiseScale;
let slide;
let snapshot;
const fftmult = 20;
const bintotal = 5;
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
  snapshot = time;
  ranbin = Math.floor(Math.random() * bintotal);
  if (ran > 0.5) {
    slide = 1;
  } else {
    slide = 0;
  }
};

TOGGLE = bin => {
  if (a.fft[bin] && !toggle) {
    toggle = true;
    GLOBAL();
  } else if (!a.fft[bin] && toggle) {
    toggle = false;
  }
  return toggle;
};

HIGH = (bin, v) => {
  tog = TOGGL(bin);
  if (tog) {
    return v;
  } else {
    return 0;
  }
};

LOW = (bin, v) => {
  tog = TOGGLE(bin);
  if (!tog) {
    return v;
  } else {
    return 0;
  }
};

HIGHEST = (bin, v) => {
  const values = [];
  for (let i = 0; i < bintotal; i++) {
    values.push(a.fft[i]);
  }
  let max = values[0];
  var maxIndex = 0;
  for (let i = 1; i < values.length; i++) {
    if (values[i] > max) {
      maxIndex = i;
      max = values[i];
    }
  }
  tog = TOGGLE(bin);
  if (maxIndex == bin && tog) {
    return v;
  } else {
    return 0;
  }
};

LOWEST = (bin, v) => {
  const values = [];
  for (let i = 0; i < bintotal; i++) {
    values.push(a.fft[i]);
  }
  let min = values[0];
  var minIndex = 0;
  for (let i = 1; i < values.length; i++) {
    if (values[i] < min) {
      minIndex = i;
      min = values[i];
    }
  }
  tog = TOGGLE(bin);
  if (minIndex == bin && tog) {
    return v;
  } else {
    return 0;
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
