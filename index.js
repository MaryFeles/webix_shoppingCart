webix.ready(function() {
    let myGUI = webix.ui({
        rows:[
            {rows:[{template:"Магазин"}], height: 80},
            {cols:[storageTable, bascketTable]},
            {template: "Итого:", height: 80}
        ], 
    });
    $$('storageTable').parse(storage);
    $$('bascketTable').parse(bascket);

});

let storageTable = {
	view:"datatable",
	id: "storageTable",
	select: true,
	columns:[
		{id:"id", header:"№", width:40, sort:"int"},
		{id:"name", header:"Наименование", width: 200, sort:"string"},
		{id:"quantity", header:"Кол-во на складе", width:150, sort:"int"},
		{id:"price", header:"Стоимость, шт", width:150, sort:"int"},
	],        
	on:{
        "onItemClick": function(id, e, trg) {
        	addToBascket();
        }
    },
};

let bascketTable = {
    view: "datatable",
    id: "bascketTable",
    select: true,
    columns:[
        {id:"id", header:"№", width:40, sort:"int"},
        {id:"name", header:"Наименование", width: 200, sort:"string"},
        {id:"quantity", header:"Кол-во", width:150, sort:"int"},
        {id:"price", header:"Стоимость", width:150, sort:"int"}
    ],
    on:{
        "onItemClick": function(id, e, trg) {
        	//webix.message("Click on row: " + id.row+", column: " + id.column)
        	removeFromBascket();
        }
    },
};

function addToBascket(){
	productQuantity = $$('storageTable').getSelectedItem().quantity;
	if (productQuantity == 0){
		alert('Failed');
	} else {		
		$$('storageTable').getSelectedItem().quantity--;
		$$('storageTable').refresh();

		let selected_id = $$("storageTable").getItem($$("storageTable").getSelectedId(true)).id;
		let copyRow = webix.copy( $$('storageTable').getSelectedItem());

		if($$('bascketTable').exists(selected_id)){
			console.log("exists");

			$$('bascketTable').getItem(selected_id).quantity++;
			$$('bascketTable').getItem(selected_id).price+=$$('storageTable').getItem(selected_id).price;
			$$('bascketTable').refresh();
		} else{
			$$('bascketTable').add(copyRow);
			$$('bascketTable').getItem(selected_id).quantity = 1;
			$$('bascketTable').refresh();
		}    
	}
}

function removeFromBascket(){
	let selected_id = $$('bascketTable').getItem($$('bascketTable').getSelectedId(true)).id;
	if( $$('bascketTable').getSelectedItem().quantity == 1 ){
		$$('storageTable').getItem(selected_id).quantity++;
		$$('storageTable').refresh();
		$$('bascketTable').remove(selected_id);


	} else {
		$$('storageTable').getItem(selected_id).quantity++;
		$$('storageTable').refresh();

		$$('bascketTable').getSelectedItem().quantity--;
		$$('bascketTable').getItem(selected_id).price-=$$('storageTable').getItem(selected_id).price;
		$$('bascketTable').refresh();		
	}
	
}


let storage=[
	{id: 1, name: "CPU", quantity: 3, price: 5000},
	{id: 2, name: "GPU", quantity: 5, price: 7000},
	{id: 3, name: "HDD", quantity: 4, price: 2000},
	{id: 4, name: "SSD", quantity: 7, price: 3000},
	{id: 5, name: "Monitor", quantity: 2, price: 8000},
	{id: 6, name: "Printer", quantity: 3, price: 15000},
]

let bascket=[];