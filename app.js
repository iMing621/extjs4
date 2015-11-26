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

	Ext.Ajax.request({
		url: url + params,
		method: 'GET',
		timeout: 60000,
/*		params:
		{
			id: 1 // loads student whose Id is 1
		},*/
/*		headers:
		{
			'Content-Type': 'application/json'
		},*/
		success: function (response) {
			Ext.getDom('center').innerHTML = response.responseText;
		},
		failure: function (response) {
			Ext.Msg.alert('Status', 'Request Failed.');

		}
	});
}