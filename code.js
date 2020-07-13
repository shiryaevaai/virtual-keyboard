window.onload = function () {
  var lang = localStorage.getItem('lang');
  if (lang === null) {
    lang = 'en';
    localStorage.setItem('lang', lang);
  }
  alert(lang);
};