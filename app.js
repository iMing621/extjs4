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
							inputValue: 'fromstation-1005',
							checked: true
						}, {
							boxLabel: '台北',
							name: 'fromstation',
							inputValue: 'fromstation-1008'
						}, {
							boxLabel: '桃園',
							name: 'fromstation',
							inputValue: 'fromstation-1015'
						}, {
							boxLabel: '新竹',
							name: 'fromstation',
							inputValue: 'fromstation-1025'
						}, {
							boxLabel: '苗栗',
							name: 'fromstation',
							inputValue: 'fromstation-1305'
						}, {
							boxLabel: '銅鑼',
							name: 'fromstation',
							inputValue: 'fromstation-1308'
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
							inputValue: 'tostation-1005'
						}, {
							boxLabel: '台北',
							name: 'tostation',
							inputValue: 'tostation-1008'
						}, {
							boxLabel: '桃園',
							name: 'tostation',
							inputValue: 'tostation-1015'
						}, {
							boxLabel: '新竹',
							name: 'tostation',
							inputValue: 'tostation-1025'
						}, {
							boxLabel: '苗栗',
							name: 'tostation',
							inputValue: 'tostation-1305'
						}, {
							boxLabel: '銅鑼',
							name: 'tostation',
							inputValue: 'tostation-1308',
							checked: true
						}
					]
				},{
					id: 'searchdate',
					xtype: 'datepicker',
					minDate: new Date()
				}],

				buttons:
				[{
					text: 'Query',
					formBind: true,
					handler: function(btn, evt){
						console.debug(Ext.getCmp('rg-fromstation').getChecked()[0].inputValue);
						console.debug(Ext.getCmp('searchdate').getValue());
					}
				}]
		});


/*Ext.create('Ext.form.Panel', {
    title: 'Simple Form with FieldSets',
    labelWidth: 75, // label settings here cascade unless overridden
    url: 'save-form.php',
    frame: true,
    bodyStyle: 'padding:5px 5px 0',
    width: 550,
    renderTo: Ext.getBody(),
    layout: 'column', // arrange fieldsets side by side
    defaults: {
        bodyPadding: 4
    },
    items: [{
        // Fieldset in Column 1 - collapsible via toggle button
        xtype:'fieldset',
        columnWidth: 0.5,
        title: 'Fieldset 1',
        collapsible: true,
        defaultType: 'textfield',
        defaults: {anchor: '100%'},
        layout: 'anchor',
        items :[{
            fieldLabel: 'Field 1',
            name: 'field1'
        }, {
            fieldLabel: 'Field 2',
            name: 'field2'
        }]
    }, {
        // Fieldset in Column 2 - collapsible via checkbox, collapsed by default, contains a panel
        xtype:'fieldset',
        title: 'Show Panel', // title or checkboxToggle creates fieldset header
        columnWidth: 0.5,
        checkboxToggle: true,
        collapsed: true, // fieldset initially collapsed
        layout:'anchor',
        items :[{
            xtype: 'panel',
            anchor: '100%',
            title: 'Panel inside a fieldset',
            frame: true,
            height: 52
        }]
    }]
});*/

});