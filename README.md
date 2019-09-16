# philot

https://philot.space

## Made with

- [Jekyll](https://jekyllrb.com/)
- [Bulma](https://bulma.io)
- [Swup](https://github.com/gmrchk/swup)
- [Gulp](https://gulpjs.com/)
- [gulp-image](https://github.com/1000ch/gulp-image)
- [purgecss](https://www.purgecss.com/)

### Pre-install

```console
brew install imagemagick
brew install graphicsmagick
brew install libjpeg libpng
```

### Installation

```console
git clone https://github.com/vphilot/jekyll-playground.git
cd jekyll-playground
bundle install
npm install --global gulp-cli
npm install
```

#### Development

```console
gulp serve
```
#### Production

```console
gulp build
```

has to use Bundle v 2.0.1 due to Netlify incompatibility with latest version