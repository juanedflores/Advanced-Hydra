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
initImg(s0, "https://i.imgur.com/yOvRyS2.jpg");
src(s0).correctScale(s0).out();
