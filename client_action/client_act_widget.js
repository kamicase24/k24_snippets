odoo.define('jnq_kardex_report.new_kardex', function (require) {
    "use strict"

    var core = require('web.core')
    var Widget = require('web.Widget');

    var ControlPanelMixin = require('web.ControlPanelMixin')
    var rpc = require('web.rpc')
    var Qweb = core.qweb
    var session = require('web.session')

    var NewDashboard = Widget.extend(ControlPanelMixin, {
        template: 'new_view_main',
        events: {
            'click button.submit': '_onClickSubmit',
            'click button.print': '_onClickPrint'
        },
        init: function (parent, vals) {
            this._super()
        },
        _onClickSubmit: function (e) {
            // do something
        },
        _onClickPrint: function () {
            // do something
        },
        renderElement: function () {
            this._super()
        }
    })


    core.action_registry.add('new-dashboard', NewDashboard)

})