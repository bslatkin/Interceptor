function templatizeUrl(template, summary, title, url) {
  return template.
    replace(/\{summary\}/g, encodeURIComponent(summary)).
    replace(/\{title\}/g, encodeURIComponent(title)).
    replace(/\{url\}/g, encodeURIComponent(url));
}


function init() {
  console.log('Hi there');

  // This is fake.
  var config = {
    'http://www.blogger.com/': {
      'template': 'http://www.blogger.com/blog-this.g?t={summary}&n={title}&u={url}',
      'prettyName': 'Blogger'
    }
  };
  var serviceId = 'http://www.blogger.com/';
  var serviceConfig = config[serviceId];

  // TODO: Find the common ancestor of these buttons, then replicate the local
  // dom structure so we can reproduce the styling around the Twitter/FB/G+
  // buttons when we insert our new button. For now do something stupid.

  // Twitter buttons
  var twitterButtons = document.getElementsByClassName('twitter-share-button');
  for (var i = 0, n = twitterButtons.length; i < n; i++) {
    var button = twitterButtons[i];
    var el = document.createElement('a');
    var dest = templatizeUrl(
        serviceConfig.template,
        'fake summary',
        'fake title',
        'http://www.example.com');
    el.setAttribute('href', dest);
    el.setAttribute('target', '_blank');
    el.innerText = serviceConfig.prettyName;
    button.parentNode.appendChild(el);
    break;
  }
}


init();
