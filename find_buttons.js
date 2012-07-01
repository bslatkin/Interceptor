var TWITTER_REGEX =
    /^http(s?):\/\/([^\.]+\.)?twitter.com\/(share|intent|widgets)/;


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
  var isButton = false;
  var parentNode = target.parentNode;
  var text = '';
  var url = '';

  // TODO: Detect the size of the button. If it's really small, then just
  // use an icon-only action instead of a full button.

  if (target.tagName == 'A' &&
      target.href &&
      target.getAttribute('data-url') &&
      !!target.href.match(TWITTER_REGEX)) {
    isButton = true;
    url = target.getAttribute('data-url');
    text = target.getAttribute('data-text');
  } else if (target.tagName == 'IFRAME' &&
             target.src.match(TWITTER_REGEX)) {
    isButton = true;
    url = window.location.href;
  }

  if (isButton && !parentNode.interceptorButton) {
    parentNode.interceptorButton = true;
    createButton(parentNode, text || url, url);
    return true;
  }
  return false;
}


function createIfFacebookButton(target) {
  var parentNode = target.parentNode;
  console.log('facebook!');
  console.log(target);

  // TODO: Detect the size of the button. If it's really small, then just
  // use an icon-only action instead of a full button.

  if (target.tagName == 'FB:LIKE' && target.href) {
    parentNode.interceptorButton = true;
    createButton(parentNode, target.href, target.href);
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

  // Try to find Twitter buttons
  var found = false;
  var allLinks = document.getElementsByTagName('a');
  for (var i = 0, n = allLinks.length; i < n; i++) {
    found = found || createIfTwitterButton(allLinks[i]);
  }
  var allIframes = document.getElementsByTagName('iframe');
  for (var i = 0, n = allIframes.length; i < n; i++) {
    found = found || createIfTwitterButton(allIframes[i]);
  }

  if (found) {
    return;
  }

  // Try to find Facebook buttons if nothing else found.
  var allFbButtons = document.getElementsByTagName('fb:like');
  for (var i = 0, n = allFbButtons.length; i < n; i++) {
    createIfFacebookButton(allFbButtons[i]);
  }
}


function init() {
  document.addEventListener("DOMNodeRemoved", handleDomRemove, true);
  window.addEventListener("load", bodyLoaded);
}


init();
