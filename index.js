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
        // the default click behavior that is true for any datatable cell
        "onItemClick": function(id, e, trg) {
        	console.log($$('storageTable').getSelectedItem());
        	$$('bascketTable').add($$('storageTable').getSelectedItem());
        	webix.message("Click on row: " + id.row+", column: " + id.column)
        }
    },
};

let bascketTable = {
    view: "datatable",
    id: "bascketTable",
    columns:[
        {id:"id", header:"№", width:40, sort:"int"},
        {id:"name", header:"Наименование", width: 200, sort:"string"},
        {id:"quantity", header:"Кол-во", width:150, sort:"int"},
        {id:"price", header:"Стоимость", width:150, sort:"int"}
    ],
};



var small_film_set = [
	{ id:1, title:"The Shawshank Redemption", year:1994, votes:678790, rating:9.2, rank:1, category:"Thriller"},
	{ id:2, title:"The Godfather", year:1972, votes:511495, rating:9.2, rank:2, category:"Crime"},
	{ id:3, title:"The Godfather: Part II", year:1974, votes:319352, rating:9.0, rank:3, category:"Crime"}
];

let storage=[
	{id: 1, name: "CPU", quantity: 3, price: 5000},
	{id: 2, name: "GPU", quantity: 5, price: 7000},
	{id: 3, name: "HDD", quantity: 4, price: 2000},
	{id: 4, name: "SSD", quantity: 7, price: 3000},
	{id: 5, name: "Monitor", quantity: 2, price: 8000},
	{id: 6, name: "Printer", quantity: 3, price: 15000},
]

let bascket=[];