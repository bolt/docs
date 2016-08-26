---
title: Visual Assets Best Practices
---
Visual Assets Best Practices
=========================================

When you are ready to submit your Extension or Theme to the Bolt Marketplace it
is recommended you have the following:

### Icons

 * an icon with a size of 400x400px in PNG format.

If you don't provide an Icon [Bolt's default marketplace icon will be used](https://extensions.bolt.cm/files/bolt-extension.png)


### Screenshots

You should provide at least one screen shot for your Theme(s) and Extension(s).

General recommendations for both an extension and theme screenshots are:

* Use no more or no less than 100% browser zoom
* If there is text in the screenshot please use a PNG image
* One (1) screen shot cropped to 600x405px (or 1.48 aspect ratio)
  * Please try to show at minimum the navigation and useful theme or extension elements
  * Please Do Not include any of the browser "chrome" ie: 
    toolbars, scrollbars, statusbar or extensions you may have installed in your browser
  * This screenshot would be used on the Marketplace's front page
* Screenshots shouldn't contain any browser "chrome" or features. Those include:
  * any extensions you've installed
  * any scroll bars
  * toolbars
  * status bars 


### Themes

Recommendations for your theme screenshots:

* Be no larger than 1200px wide.
* show the entirety of the page ( full page screenshot ) and include:
  * Navigation and menus
  * Headers and Footers
  * Generic body copy
* If the theme has unique elements please include those.
* A Large (desktop) and small screen (mobile) screenshot (show responsiveness)
* __DO NOT__ show repeated content - ie: if you are showing a list of Blog Posts
  show at most the first two, not all the posts. 

### Extensions

* Be no larger than 1200px wide 
* If your extension does something unique try to show the expected result in 
  Bolt's default theme. 

  
How To Take A Screenshot
-------------------------

### Google Chrome 

Chrome can take responsive image shots (not full screen without an extension)
through their dev tools, [here is how](https://developers.google.com/web/tools/chrome-devtools/iterate/device-mode/emulate-mobile-viewports) and click the top right 3 dotted overflow menu button and select capture screenshot. 

### FireFox

  * Responsive screenshots through it's [responsive design mode](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_Mode)
  * Full page using its [command line feature](https://developer.mozilla.org/en-US/docs/Tools/GCLI), e.g.
```
screenshot your-screenshot-name.png --fullpage
``` 

Before Submission
-----------------

After you have created your marketplace assets we ask that you optimize your images. For PNG or JPG images you can use [tinypng.org](https://tinypng.com/).

Example Composer Markup
-----------------------

Add the paths for your icons to your composer.json in the "extras" section. 

The cropped screenshot (600px x 405px) should be the first screenshot in the 
`bolt-screenshots` array. Follow this up by adding in the screenshots you will supply. 

How you decide to name them doesn't currently matter.

Here is an example.

```json
 "extra": {
     "bolt-icon": "assets/icon.png",
     "bolt-screenshots": [
         "assets/teaser.png",
         "assets/homepage-mobile.png",
         "assets/homepage-desktop.png",
         "assets/record-page.png"
    ]
 }
```
