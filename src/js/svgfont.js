'use strict'

class SVGFont {

    constructor (id, uri, options) {
        this.id = id
        this.uri = uri
        this.options = options || {}
        this.verbose = true

        this.listeners = []
        this.onload = (() => {
            if (this.verbose) console.log('[SVGFont]: LOAD', [this.id, this.uri])
        })
        this.onerror = (() => {
            if (this.verbose) console.error('[SVGFont]: ERROR', [this.id, this.uri])
        })

        this.embed()
    }

    on (name, callback) {
        if (this.complete) {
            callback()
        }
        this.listeners.push([name, callback])
    }

    embed () {
        if (!this.object) {
            let _object = document.createElement('object')
                _object.setAttribute('id', this.id)
                _object.setAttribute('type', 'image/svg+xml')
                _object.setAttribute('data', this.uri)

            const _onLoad = () => {
                const _content = _object.contentDocument.querySelector('svg')

                if (!_content) {
                    return _onError()
                }

                this.complete = true;

                _object.setAttribute('data-complete', this.complete)

                this.onload()

                this.listeners.forEach((listener) => {
                    const name = listener[0], callback = listener[1]
                    if (name === 'load') callback()
                })
            }

            const _onError = () => {
                this.complete = false;

                _object.setAttribute('data-complete', this.complete)

                this.onerror()

                this.listeners.forEach((listener) => {
                    const name = listener[0], callback = listener[1]
                    if (name === 'error') callback()
                })
            }

            _object.addEventListener('load', _onLoad, false)
            _object.addEventListener('error', _onError, false)

            document.body.appendChild(_object)
        }
    }

    get defaults () {
        return {
            width: 16,
            height: 16,
        }
    }

    get object () {
        let _object = document.querySelector(`object[id="${this.id}"]`)
        return _object
    }

    get svg () {
        if (!this.object) return null

        let _svg = this.object.contentDocument.querySelector('svg')

        return _svg
    }

    get fontface () {
        if (!this.svg) return null
        return this.svg.querySelector('font-face')
    }

    get fontfaceProps () {
        if (!this.fontface) return null

        let _props = {
            unitsPerEm: this.fontface.getAttribute('units-per-em'),
            ascent: this.fontface.getAttribute('ascent'),
            descent: this.fontface.getAttribute('descent')
        }

        return _props
    }

    get glyphs () {
        const glyphs = this.svg.querySelectorAll('glyph')
        return Array.prototype.slice.call(glyphs)
    }

    paths (options) {
        return this.glyphs
            .map(g => {
                return this.fontfaceGlyphToPath(g, options)
            })
            .filter(v => {
                return !!v
            })
    }

    pathByUnicode (value, options) {
        options = options || {}

        return this.glyphs
            .filter(g => {
                const unicode = g.getAttribute('unicode')

                // DEBUG:
                // console.log(unicode, escape(unicode), value, `${value}$`, (new RegExp(`${value}$`, 'gmi').test(escape(unicode))))

                return new RegExp(`${value}$`, 'gmi').test(escape(unicode))
            })
            .map(g => {
                return this.fontfaceGlyphToPath(g, options)
            })[0]
    }

    fontfaceGlyphToPath (glyph, options) {
        options = options || {}
        options.width = options.width || this.defaults.width
        options.height = options.height || this.defaults.height

        const _fontface = this.fontfaceProps

        if (!glyph) return null

        let _d = glyph.getAttribute('d')
        let _unicode = glyph.getAttribute('unicode')
        let _unicodeEscaped = escape(_unicode).toLowerCase().replace('%u', "&#x") + ';'

        if (!_d) return null
        if (_d === ' M0,0') return null
        if (_d === 'M0 0 L0 0 Z') return null

        const ns = 'http://www.w3.org/2000/svg'

        let _svg = document.createElementNS(ns, 'svg')
            _svg.setAttribute('data-unicode', _unicode)
            _svg.setAttribute('data-unicode-escaped', _unicodeEscaped)
            _svg.setAttribute('xmlns', ns)
            _svg.setAttribute('version', '1.1')
            _svg.setAttribute('width', options.width)
            _svg.setAttribute('height', options.height)
            _svg.setAttribute('viewBox', `0 0 ${_fontface.unitsPerEm} ${_fontface.unitsPerEm}`)

        let _path = document.createElementNS(ns, 'path')
            _path.setAttribute('data-unicode', _unicode)
            _path.setAttribute('data-unicode-escaped', _unicodeEscaped)
            _path.setAttribute('transform', `scale(1, -1) translate(0, -${_fontface.ascent})`)
            _path.setAttribute('d', _d)
            _path.setAttribute('fill', 'black')
            _path.setAttribute('stroke', 'none')

        _svg.appendChild(_path)

        return _svg
    }

}

export default SVGFont
