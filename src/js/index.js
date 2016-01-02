'use strict'

import SVGFont from './svgfont'
import SVGFontTester from './svgfont.tester'

require('../css/index.css')

// Debug Font SVG:
// ---
// let fontawesomeFontSVG = require('file!bower_components/font-awesome/fonts/fontawesome-webfont.svg')
// let fontawesomeFontSVG = require('url!bower_components/font-awesome/fonts/fontawesome-webfont.svg')
// let fontawesomeFontSVG = require('svg!bower_components/font-awesome/fonts/fontawesome-webfont.svg')
// ---
// console.log('fontawesome Font SVG:', fontawesomeFontSVG)

window.onload = () => {

    const root = './fonts'

    // 1. Load SVG fonts

    const fonts = [
        new SVGFont('fontawesome', `${root}/fontawesome-webfont.svg`),
        new SVGFont('foundation', `${root}/foundation-icons.svg`),
        new SVGFont('icomoon', `${root}/icomoon.svg`),
        new SVGFont('ionicons', `${root}/ionicons.svg`),
        new SVGFont('material', `${root}/MaterialIcons-Regular.svg`),
        new SVGFont('octicons', `${root}/octicons.svg`),
    ]
    window.fonts = fonts

    // 2. Test SVG rendering

    SVGFontTester.renderFontIconsWhenLoaded(null, fonts)

    SVGFontTester.renderFontIconWhenLoaded('#unicode-test', fonts[0], '292')
    SVGFontTester.renderFontIconWhenLoaded('#unicode-test', fonts[1], '100')
    SVGFontTester.renderFontIconWhenLoaded('#unicode-test', fonts[1], '170')
    SVGFontTester.renderFontIconWhenLoaded('#unicode-test', fonts[4], 'E0DE')
    SVGFontTester.renderFontIconWhenLoaded('#unicode-test', fonts[4], 'E0DE'.toLowerCase())

}
