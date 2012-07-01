Interceptor
===========

From the Indie Web Camp 2012 http://indiewebcamp.com

Idea here was to maximize app distribution when users are doing social activities. Try to increase stickiness of new apps to promote diversity.

- As you browse, extension notices markup that says "you can share links on me" on social sites, including your own indie site; could create recipes for whatever's out there.
- When you go to a page with social actions (like button, tweeting, etc) it'll add a link to the other social sites you've recently gone past.
- Similarly, if you're going to tweet on Twitter, but were recently on a site with similar functionality, it'll prompt you if you want to use the other site instead


Plan for discovery

  * Detect logged-in status on sites like Blogger, Pinterest, WordPress.com, WordPress.org installs; prompt user to configure that as their preferred share location.


Conclusions from hacking:

- Integrating into the page markup is awful
- All the various edge-cases with AJAX are awful (Gizmodo)
- The Chrome extension's button itself could be the general share action
- The extra part is auto-configuring that action based on discovery recipes that watch your browsing behavior and auto-prompt you for configuring new sites to share to.
