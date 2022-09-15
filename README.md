# Hugo shortcode for image gallery grid

A Hugo module that provides a shortcode for arranging images in a gallery with a
grid layout.

## Features

- Easy to use shortcode allowing for an arbitrary number of images
- Image captions
- Image zooming, with configurable scale factor
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
