// var BASE_URL = 'https://localhost:8081'
var BASE_URL = 'https://embedso.com'

var AHAWidgetManager = {
  init() {
    this.widgets = document.getElementsByClassName('embedso-widget')
    this.listenEvent()
    return this
  },

  listenEvent() {
    window.addEventListener('message',function(message){
      if(message.data.type === 'updateHeight'){
        const widgetEl = document.querySelectorAll('[data-code-iframe="' + message.data.code + '"]')
        if (widgetEl && widgetEl[0]) {
          const ahaWidget = AHAWidget.init(widgetEl[0])
          ahaWidget.updateHeight(message.data.data.height)
        }
      }
    });
  }
}

var AHAWidget = {
  /**
   * init
   * @param widget HTMLElement
   */
  init(widget) {
    this.widget = widget
    return this
  },

  preview() {
    if (this.widget.hasAttribute('inited')) return
    const iframe = document.createElement('iframe')
    iframe.src = BASE_URL + '/video_preview/index.html?code=' + this.widget.getAttribute('data-code') + '&track=1'
    iframe.setAttribute('data-code-iframe', this.widget.getAttribute('data-code'))
    iframe.setAttribute('width', '100%')
    iframe.setAttribute('height', '100%')
    iframe.setAttribute('frameborder', 0)
    iframe.setAttribute('allowfullscreen', true)
    iframe.setAttribute('webkitallowfullscreen', true)
    iframe.setAttribute('mozallowfullscreen', true)
    iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope')
    this.widget.appendChild(iframe)
    this.widget.setAttribute('inited', true)
  },

  /**
   * Update widget height
   * @param height
   */
  updateHeight(height) {
    this.widget.style.height = height + 'px'
  }
}

AHAWidgetManager.init()
Array.from(AHAWidgetManager.widgets).forEach(function(widgetEL) {
  if (!widgetEL.hasAttribute('inited')) {
    var widget = AHAWidget.init(widgetEL)
    widget.preview()
  }
})
