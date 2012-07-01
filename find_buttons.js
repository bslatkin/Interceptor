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


function handleDomRemove(e) {
  var target = e.target;
  if (!target) {
    return;
  }
  if (target.nodeType != 1) {
    return;
  }

  // TODO: Find the common ancestor of these buttons, then replicate the local
  // dom structure so we can reproduce the styling around the Twitter/FB/G+
  // buttons when we insert our new button. For now do something stupid.

  // Try to identify the Twitter button's markup.
  if (target.href && target.href.indexOf('http://twitter.com/share?') == 0) {
    createButton(target.parentNode,
        target.getAttribute('data-text'),
        target.getAttribute('data-url'));
  }
}


function stopListening() {
  document.removeEventListener("DOMNodeRemoved", handleDomRemove, true);
}


function init() {
  document.addEventListener("DOMNodeRemoved", handleDomRemove, true);
  window.addEventListener("load", stopListening);
}


init();
