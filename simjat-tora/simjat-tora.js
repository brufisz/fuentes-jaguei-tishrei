
var P = document.getElementById("parch"), secs = [].slice.call(document.querySelectorAll(".sec"));
var obs = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add("in") }) }, { root: P, threshold: .15 });
secs.forEach(function (s) { obs.observe(s) });
P.addEventListener("scroll", function () { var m = P.scrollHeight - P.clientHeight; document.getElementById("bar").style.height = (m > 0 ? P.scrollTop / m * 100 : 0) + "%" });
document.getElementById("again").onclick = function () {
  P.scrollTop = 0;
  setTimeout(function () {
    secs.forEach(function (s) { if (s.id !== "hero") { s.classList.remove("in"); obs.unobserve(s); obs.observe(s) } });
    var t = document.getElementById("ttl"); t.classList.remove("pulse"); void t.offsetWidth; t.classList.add("pulse");
  }, 1200)
};