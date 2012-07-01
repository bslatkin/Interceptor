// This is all fake config that should be in local storage.
var config = {
  'http://www.blogger.com/': {
    'template': 'http://www.blogger.com/blog-this.g?t={summary}&n={title}&u={url}',
    'prettyName': 'Blogger'
  }
};
var serviceId = 'http://www.blogger.com/';
var serviceConfig = config[serviceId];


function templatizeUrl(template, summary, title, url) {
  return template.
    replace(/\{summary\}/g, encodeURIComponent(summary)).
    replace(/\{title\}/g, encodeURIComponent(title)).
    replace(/\{url\}/g, encodeURIComponent(url));
}


function createButton(parent) {
  var el = document.createElement('a');
  var dest = templatizeUrl(
      serviceConfig.template,
      'fake summary',
      'fake title',
      'http://www.example.com');
  el.setAttribute('href', dest);
  el.setAttribute('target', '_blank');
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
    createButton(target.parentNode);
  }
}


function init() {
  document.addEventListener(
      "DOMNodeRemoved", handleDomRemove, true);
  // TODO: On body finished load event, stop listening.
}


init();
