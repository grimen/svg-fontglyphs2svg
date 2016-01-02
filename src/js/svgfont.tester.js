'use strict'

class SVGFontTester {

    static getFontIconsContainer(font, title) {
        let _container = document.querySelector(`.${font.id}`)

        if (!_container) {
            _container = document.createElement('section')
            _container.setAttribute('class', `render ${font.id}`)

            let _headerName = document.createElement('code')
                _headerName.innerText = title || `${font.id}`

            let _header = document.createElement('h4')
                _header.appendChild(_headerName)

            _container.appendChild(_header)

            let root = document.querySelector(`#root`)
                root.appendChild(_container)
        }

        return _container
    }

    static renderFontIcons(container, font, options) {
        if (typeof container === 'string') container = document.querySelector(container)
        const root = container || SVGFontTester.getFontIconsContainer(font)

        root.style.visibility = 'hidden'

        const _svgIcons = font.paths(options)

        _svgIcons.forEach(_svgIcon => {
            if (_svgIcon) {
                let _icon = document.createElement('span')
                _icon.appendChild(_svgIcon)
                _icon.setAttribute('title', _svgIcon.innerHTML)

                root.appendChild(_icon)
            }
        })

        let _iconCount = document.createElement('code')
            _iconCount.setAttribute('class', 'icons-count')
            _iconCount.innerText = ` (${_svgIcons.length})`

        root.appendChild(_iconCount)

        root.style.visibility = 'visible'
    }

    static renderFontIcon(container, font, unicode, options) {
        if (typeof container === 'string') container = document.querySelector(container)
        const root = container || SVGFontTester.getFontIconsContainer(font)

        root.style.visibility = 'hidden'

        const _svgIcon = font.pathByUnicode(unicode, options)

        if (_svgIcon) {
            let _icon = document.createElement('span')
                _icon.appendChild(_svgIcon)
                _icon.setAttribute('class', 'icon')
                _icon.setAttribute('title', _svgIcon.innerHTML)

            root.appendChild(_icon)
        }

        root.style.visibility = 'visible'
    }

    static renderFontIconsWhenLoaded(container, fonts, options) {
        options = options || {width: 10, height: 10}

        fonts.forEach(font => {
            font.on('load', () => SVGFontTester.renderFontIcons(container, font, options))
        })
    }

    static renderFontIconWhenLoaded(container, font, unicode, options) {
        options = options || {width: 30, height: 30}

        font.on('load', () => SVGFontTester.renderFontIcon(container, font, unicode, options))
    }
}

export default SVGFontTester
