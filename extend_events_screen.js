

var SuperPaymentScreen = screens.PaymentScreenWidget.prototype;
	screens.PaymentScreenWidget.include({

		events : _.extend({}, SuperPaymentScreen.events, {
            'click .button.cancel_refund_order': 'delete_return_order',
		}),
    delete_return_order: function() {}
})
  
