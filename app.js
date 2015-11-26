Ext.onReady(function() {
		
Ext.create('Ext.FormPanel', { 
		renderTo: Ext.getBody(),
		frame: true,
		width: 500,
		items: [{
					id: 'rg-fromstation',
					xtype: 'radiogroup',
					fieldLabel: '起',
					column: 2,
					vertical: true,
					items: [
						{
							boxLabel: '汐止',
							name: 'fromstation',
							inputValue: '1005',
							checked: true
						}, {
							boxLabel: '台北',
							name: 'fromstation',
							inputValue: '1008'
						}, {
							boxLabel: '桃園',
							name: 'fromstation',
							inputValue: '1015'
						}, {
							boxLabel: '新竹',
							name: 'fromstation',
							inputValue: '1025'
						}, {
							boxLabel: '苗栗',
							name: 'fromstation',
							inputValue: '1305'
						}, {
							boxLabel: '銅鑼',
							name: 'fromstation',
							inputValue: '1308'
						}
					]
				},{
					id: 'rg-tostation',
					xtype: 'radiogroup',
					fieldLabel: '迄',
					column: 2,
					vertical: true,
					items: [
						{
							boxLabel: '汐止',
							name: 'tostation',
							inputValue: '1005'
						}, {
							boxLabel: '台北',
							name: 'tostation',
							inputValue: '1008'
						}, {
							boxLabel: '桃園',
							name: 'tostation',
							inputValue: '1015'
						}, {
							boxLabel: '新竹',
							name: 'tostation',
							inputValue: '1025'
						}, {
							boxLabel: '苗栗',
							name: 'tostation',
							inputValue: '1305'
						}, {
							boxLabel: '銅鑼',
							name: 'tostation',
							inputValue: '1308',
							checked: true
						}
					]
				},{
					id: 'searchdate',
					xtype: 'datepicker',
					fieldLabel: '搭乘日期',
					minDate: new Date(),
					maxDate: new Date(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()+45)
				},{
					id: 'rg-fromtime',
					xtype: 'radiogroup',
					fieldLabel: '起',
					vertical: true,
					items: [
						{
							boxLabel: '18:00',
							inputValue: '1800',
							checked: true
						}
					]
				},{
					id: 'rg-totime',
					xtype: 'radiogroup',
					fieldLabel: '迄',
					vertical: true,
					items: [
						{
							boxLabel: '19:00',
							inputValue: '1900',
							checked: true
						}
					]
				}],

				buttons:
				[{
					text: 'Query',
					formBind: true,
					handler: function(btn, evt){
						doQuery();
					}
				}]
		});
});

function lpad(str) {
	if (str < 10)
		return '0' + str;
	else
		return str;
}

function doQuery() {
	var url = "http://twtraffic.tra.gov.tw/twrail/SearchResult.aspx?searchtype=0";
	var fromstation  = Ext.getCmp('rg-fromstation').getChecked()[0].inputValue;
	var tostation    = Ext.getCmp('rg-tostation').getChecked()[0].inputValue;
	var searchdate   = Ext.getCmp('searchdate').getValue();
	var fromtime     = Ext.getCmp('rg-fromtime').getChecked()[0].inputValue;
	var totime       = Ext.getCmp('rg-totime').getChecked()[0].inputValue;

	var params = 
		'&searchdate='  + searchdate.getFullYear() + '/' + lpad(searchdate.getMonth() +1) + '/' + lpad(searchdate.getDate()) + 
		'&fromstation=' + fromstation +
		'&tostation='   + tostation +
		'&trainclass=2&timetype=1' + 
		'&fromtime='    + fromtime +
		'&totime='      + totime;

	//window.open(url + params, 100, 100);


	var myData = {
	    "users": [
	        {
	            "id": 123,
	            "name": "Ed",
	            "orders": [
	                {
	                    "id": 50,
	                    "total": 100,
	                    "order_items": [
	                        {
	                            "id"      : 20,
	                            "price"   : 40,
	                            "quantity": 2,
	                            "product" : {
	                                "id": 1000,
	                                "name": "MacBook Pro"
	                            }
	                        },
	                        {
	                            "id"      : 21,
	                            "price"   : 20,
	                            "quantity": 3,
	                            "product" : {
	                                "id": 1001,
	                                "name": "iPhone"
	                            }
	                        }
	                    ]
	                }
	            ]
	        }
	    ]
	};

	Ext.create('Ext.data.Store', {
	    model: 'User',
	    proxy: {
	        type: 'ajax',
	        url : myData,
	        reader: {
	            type: 'json',
	            root: 'users'
	        }
	    },
	});

	Ext.define("User", {
	    extend: 'Ext.data.Model',
	    fields: [
	        'id', 'name'
	    ],

	    hasMany: {model: 'Order', name: 'orders'},

	    proxy: {
	        type: 'rest',
	        url : myData,
	        reader: {
	            type: 'json',
	            root: 'users'
	        }
	    }
	});

	Ext.define("Order", {
	    extend: 'Ext.data.Model',
	    fields: [
	        'id', 'total'
	    ],

	    hasMany  : {model: 'OrderItem', name: 'orderItems', associationKey: 'order_items'},
	    belongsTo: 'User'
	});

	Ext.define("OrderItem", {
	    extend: 'Ext.data.Model',
	    fields: [
	        'id', 'price', 'quantity', 'order_id', 'product_id'
	    ],

	    belongsTo: ['Order', {model: 'Product', associationKey: 'product'}]
	});

	Ext.define("Product", {
	    extend: 'Ext.data.Model',
	    fields: [
	        'id', 'name'
	    ],

	    hasMany: 'OrderItem'
	});

	var store = Ext.create('Ext.data.Store', {
	    model: "User"
	});

	store.load({
	    callback: function() {
	        //the user that was loaded
	        var user = store.first();

	        console.log("Orders for " + user.get('name') + ":")

	        //iterate over the Orders for each User
	        user.orders().each(function(order) {
	            console.log("Order ID: " + order.getId() + ", which contains items:");

	            //iterate over the OrderItems for each Order
	            order.orderItems().each(function(orderItem) {
	                //we know that the Product data is already loaded, so we can use the synchronous getProduct
	                //usually, we would use the asynchronous version (see Ext.data.association.BelongsTo)
	                var product = orderItem.getProduct();

	                console.log(orderItem.get('quantity') + ' orders of ' + product.get('name'));
	            });
	        });
	    }
	});
}