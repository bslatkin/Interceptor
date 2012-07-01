// This is all fake config that should be in local storage.
var config = {
  'http://www.blogger.com/': {
    'template': 'http://www.blogger.com/blog-this.g?n={title}&u={url}',
    'prettyName': 'Blogger',
    'icon': 'http://www.blogger.com/favicon.ico'
  }
};
var serviceId = 'http://www.blogger.com/';
var serviceConfig = config[serviceId];


function templatizeUrl(template, title, url) {
  return template.
    replace(/\{title\}/g, encodeURIComponent(title)).
    replace(/\{url\}/g, encodeURIComponent(url));
}


function createButton(parent, title, url) {
  var el = document.createElement('a');
  var dest = templatizeUrl(serviceConfig.template, title, url);
  el.setAttribute('href', dest);
  el.setAttribute('target', '_blank');
  el.setAttribute('class', 'interceptor-button');
  el.setAttribute(
      'style',
      'background-image: url(' + serviceConfig.icon + '), ' +
      '-webkit-linear-gradient(#efefef, #e0e0e0);');
  el.innerText = serviceConfig.prettyName;
  parent.appendChild(el);
}


function createIfTwitterButton(target) {
  // Try to identify the Twitter button's markup.
  if (target.href && target.getAttribute('data-url') &&
      !!target.href.match(/^http(s?):\/\/twitter.com\/(share|intent)/)) {
    createButton(target.parentNode,
        target.getAttribute('data-text'),
        target.getAttribute('data-url'));
    return true;
  }
  return false;
}


function handleDomRemove(e) {
  var target = e.target;
  if (!target) {
    return;
  }
  if (target.nodeType != 1) {
    return;
  }

  createIfTwitterButton(target);
}


function stopListening() {
  document.removeEventListener("DOMNodeRemoved", handleDomRemove, true);
}


function bodyLoaded() {

  stopListening();

  // Try to find Twitter buttons after body load.
  var allLinks = document.getElementsByTagName('a');
  for (var i = 0, n = allLinks.length; i < n; i++) {
    createIfTwitterButton(allLinks[i]);
  }
}


function init() {
  document.addEventListener("DOMNodeRemoved", handleDomRemove, true);
  window.addEventListener("load", bodyLoaded);
}


init();
