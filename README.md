# Hugo shortcode for image gallery grid

A Hugo module that provides a shortcode for arranging images in a gallery with a
grid layout.

https://user-images.githubusercontent.com/rootwork/hugo-module-gallery-grid/main/docs/images/nav-by-mouse.mp4

## Features

- Easy to use shortcode allowing for an arbitrary number of images
- Image zooming, with configurable scale factor
- Optional image captions
- Mobile-first, displaying images at full widths on small screens
- Configurable image aspect ratios
- Configurable number of columns in the image gallery grid
- Semantic and accessible markup with `<figure>` and `<figcaption>`
- Many styles and functions configurable in the shortcode
- Accessible keyboard navigation
- Progressive enhancement: When JavaScript is disabled or inaccessible, image
  gallery still displays (without zooming)

## Setup

This theme component and shortcode was created and is maintained as a
[Hugo module](https://gohugo.io/hugo-modules/) rather than the older approach of
using git submodules. You could probably use this theme component as a git
submodule (or for that matter simply copy the files into your theme, providing
you include the
[license](https://github.com/rootwork/hugo-module-gallery-grid/blob/main/LICENSE)),
but I encourage you to
[learn more about using Hugo modules](https://github.com/rootwork/hugo-module-site)
as it's a much easier and more robust way to manage themes, theme components,
and other assets.

### Prerequisites

- [Hugo](https://github.com/gohugoio/hugo/releases/latest) **extended** version
  0.85 or greater.
- [Go](https://go.dev/dl/) version
  [1.12 or greater](https://gohugo.io/hugo-modules/use-modules/#prerequisite).
- An existing Hugo site, such as by running `hugo new site <sitename>`.
- An existing
  [Hugo theme](https://gohugo.io/getting-started/quick-start/#step-3-add-a-theme)
  on your site.

### Installation

0. If you aren't already using Hugo modules, run `hugo mod init`
   ([more info](https://gohugo.io/hugo-modules/use-modules/#initialize-a-new-module)).
   If you're not sure whether you're using Hugo modules, check if a `go.mod`
   file exists in your site directory; if it doesn't, run this step.

1. Add this theme component to your configuration.

   If you have `config.toml`, look for a `[module]` section. If none exists, add
   the following three lines to the bottom of the file. If a `[module]` section
   does exist, add the last two lines below to that section.

   ```toml
   [module]
   [[module.imports]]
   path = "github.com/rootwork/hugo-module-gallery-grid"
   ```

   If you have `module.toml` (such as in a `config/_default` directory):

   ```toml
   [[imports]]
   path = "github.com/rootwork/hugo-module-gallery-grid"
   ```

   If you have `config.yaml`:

   ```yaml
   module:
     imports:
       - path: github.com/rootwork/hugo-module-gallery-grid
   ```

2. At the command line, run:

   ```sh
   hugo mod get github.com/rootwork/hugo-module-gallery-grid
   hugo mod tidy
   ```

### Updating

To pull in new releases of this theme component, run:

```sh
hugo mod get -u github.com/rootwork/hugo-module-gallery-grid
```

Alternatively you can run `hugo mod get -u` with no URL to update **all** your
Hugo modules, or `hugo mod get -u ./...` to update all modules recursively.

## Usage

Basic usage within a content Markdown file:

```
{{< gallery >}}
- apple.jpg
  A red apple
  My favorite type of apple!
- banana.jpg
  An unripe banana
- pineapple.jpg
  Fresh pineapple
  I love pineapple the most
{{</ gallery >}}
```

This will create an image gallery using the default options (see below). Note
the YAML-like syntax of the items: Linebreaks and spacing are important, as is
the initial hyphen at the beginning of each item.

The first line of each item is the path to the file. The second line is the
image `alt` text, and is required. The third line is the image caption, and is
optional; in the example above, the first and third items have captions while
the second item does not.

### Settings

Many settings can be configured directly from the shortcode using parameters.
You can also add your own CSS styling by targeting the `.grid-gallery` selector
and/or by adding your own classes using the `class` parameter.

If a parameter is not set in the shortcode, it takes the default value noted
below.

| Parameter           | Description                                                    | Type of value                                                                                                                                                              | Default                                                 |
| ------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `class`             | CSS classes                                                    | Any valid CSS class name. Multiple classes separated by spaces.                                                                                                            | _None_ (grid will always have the class `grid-gallery`) |
| `cols`              | columns in the grid                                            | Any whole number.                                                                                                                                                          | `3`                                                     |
| `bg`                | background of the entire grid                                  | Any valid CSS value for [`background`](https://developer.mozilla.org/en-US/docs/Web/CSS/background), e.g. colors, gradients, and references to other images are all valid. | `white`                                                 |
| `imageratio`        | aspect ratio for the images                                    | Any valid CSS value for [`aspect-ratio`](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio), e.g. `0.5` or `2 / 1`.                                            | `1` (square)                                            |
| `imageoutlinesize`  | width of the outline on an active image                        | Any valid CSS [length](https://developer.mozilla.org/en-US/docs/Web/CSS/length).                                                                                           | `0.25rem`                                               |
| `imageoutlinecolor` | color of the outline on an active image                        | Any valid CSS [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).                                                                                       | `gray`                                                  |
| `cappad`            | padding inside the caption                                     | Any valid CSS [length](https://developer.mozilla.org/en-US/docs/Web/CSS/length).                                                                                           | `0.25rem`                                               |
| `capsize`           | font size of the caption                                       | Any valid CSS value for [`font-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size).                                                                         | `1rem`                                                  |
| `capcolor`          | font color of the caption                                      | Any valid CSS [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).                                                                                       | `black`                                                 |
| `capbg`             | background of the caption                                      | Any valid CSS value for [`background`](https://developer.mozilla.org/en-US/docs/Web/CSS/background), e.g. colors, gradients, and references to other images are all valid. | `rgba(255, 255, 255, 0.65)`                             |
| `inactiveopacity`   | opacity of the grid that is not active when an image is zoomed | Any valid CSS value for [`opacity`](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity), i.e. a decimal between `0` (transparent) and `1` (fully opaque).            | `0.333`                                                 |
| `scale`             | factor by which images should be scaled when zoomed            | Any number.                                                                                                                                                                | `2`                                                     |
| `durexpand`         | duration of time an image takes to zoom in                     | Any valid CSS [time length](https://developer.mozilla.org/en-US/docs/Web/CSS/time).                                                                                        | `0.5s`                                                  |
| `durshrink`         | duration of time an image takes to zoom out                    | Any valid CSS [time length](https://developer.mozilla.org/en-US/docs/Web/CSS/time).                                                                                        | `0.25s`                                                 |

## Frequently asked questions

**Why don't zoomed images fill the screen?**

I wanted a simple image gallery that would be useful in the context of a larger
article, allowing for zoomable-but-not-huge images rather than the
portfolio-style galleries that use a full-screen image in a modal. If that's
what you're looking for, I recommend [Photoswipe](https://photoswipe.com/). See
[Prior art](#prior-art) for links to Hugo implementations of it.

**Why use JavaScript at all? You could just scale the images with CSS.**

This is absolutely true,
[`transform: scale()`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
is all you need.

Unfortunately, if you want the images to be zoomable and navigable by keyboard
-- that is, accessible to all users -- you pretty much need JavaScript to do it.
And at that point, you might as well use JS for some other niceties, like making
sure the image doesn't scale off the edge of the screen.

**Why can't you just point your shortcode at a directory of images?**

A key part of this theme component was to allow for captions. In my experience
it's clumsier to grab a directory and then have to map captions to the files in
it than just listing the filenames with their captions in the first place. But
see [prior art](#prior-art) for gallery components like this.

**Why is `alt` text required for each image?**

Since accessibility was an important goal of this theme component, I didn't want
to enable overlooking the `alt` text for assistive devices. While there are
[some images that should have empty `alt` text](https://webaim.org/techniques/alttext/#decorative),
I don't believe that would ever be true in the context of an image gallery. (If
you have counterexamples, please let me know.) Having alternative text, of
course, also helps when images don't load due to an unstable connection, when
users have images turned off, and for search indexing.

**Why specify the number of columns? Why not base it around image sizes and that
cool
[adaptive grid technique](https://css-tricks.com/an-auto-filling-css-grid-with-max-columns/)?**

That is _indeed_ a cool technique, and I use it when presenting a grid of
non-zoomable images (or other elements). The JS required to ensure images aren't
zoomed off the screen requires knowing how many columns there are and where an
individual element is in the rows and columns. I believe this would be doable
within a variable grid but for my use case couldn't justify investing the time
in making it work. I welcome PRs that would make this possible.

**What about using Hugo's image processing to render responsive images and new
image formats like WebP?**

I think it'd be great to incorporate some of the functionality from image
components like [@hyas/images](https://www.npmjs.com/package/@hyas/images),
[@danielfdickinson/image-handling-mod-hugo-dfd](https://github.com/danielfdickinson/image-handling-mod-hugo-dfd)
or [@hugo-mods/lazyimg](https://github.com/hugo-mods/lazyimg) -- or hand off the
individual image rendering to them when they're present -- and welcome PRs that
accomplish this.

## Prior art

This particular approach to displaying an image gallery was heavily derived from
Silvestar Bistrović's article on Smashing Magazine,
"[How To Build An Expandable Accessible Gallery](https://www.smashingmagazine.com/2021/10/build-expandable-accessible-gallery/)."
I opted to change a few things, like switching from CSS grids to flexbox (so
that "left-over" items in the bottom rows could be easily centered); making the
aspect ratio, number of columns, and scale factors configurable; and adding
captions. But his use of JavaScript in order to make the gallery
[accessible and navigable by keyboard](https://www.smashingmagazine.com/2021/10/build-expandable-accessible-gallery/#keyboard-support)
remains largely intact.

[Photoswipe](https://photoswipe.com/) remains a good option if you want the
traditional "fill the screen"-style gallery.
[@victoriadrake](https://github.com/victoriadrake)'s
[Call me Sam](https://github.com/victoriadrake/hugo-theme-sam) Hugo theme has a
[nice integration with Photoswipe](https://github.com/victoriadrake/hugo-theme-sam/pull/89),
contributed by [@arthurbailao](https://github.com/arthurbailao), although it
doesn't support captions. Bruno Amaral also used Photoswipe in
[his Hugo gallery component](https://brunoamaral.eu/post/creating-a-gallery-component-for-the-hugo-static-site-generator/),
which uses frontmatter resources and loads images from a directory.

[Hugo Codex's image gallery](https://hugocodex.org/add-ons/image-gallery/) uses
[Lightbox.js](https://victordiego.com/lightbox/) to display zoomed images, but
Lightbox.js isn't keyboard-navigable, and captions only appear on image
thumbnails (not on zoomed images).

[@mfg92's gallery shortcode](https://github.com/mfg92/hugo-shortcode-gallery)
uses [Justified Gallery](https://miromannino.github.io/Justified-Gallery/) and
[Swipebox](https://brutaldesign.github.io/swipebox/). These are semi-accessible
(the markup isn't semantic, but they are keyboard-navigable) and rely on jQuery.
This
[particular implementation](https://github.com/mfg92/hugo-shortcode-gallery/blob/master/layouts/shortcodes/gallery.html)
does result in several additional files needing to be loaded one-by-one.

## Contribution guidelines

I welcome Pull Requests, as well as suggestions, questions or bug reports via
issues.
[Read our contribution guidelines](https://github.com/rootwork/hugo-module-gallery-grid/blob/main/docs/CONTRIBUTING.md)
and note our
[code of conduct](https://github.com/rootwork/hugo-module-gallery-grid/blob/main/docs/CODE_OF_CONDUCT.md).

## License

[AGPL 3.0](https://github.com/rootwork/hugo-module-gallery-grid/blob/main/LICENSE)
