webix.ready(function() {
    let myGUI = webix.ui({
        rows:[
            {rows:[{template:"Магазин"}], height: 80},
            {cols:[storageTable, bascketTable], height: 300},
            { view:"text", id:"sum", value:"0", label:"Итого: ", width: 200}
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
        	removeFromBascket();
        }
    },
};


//функция добавления товара в корзину
function addToBascket(){
	productQuantity = $$('storageTable').getSelectedItem().quantity;
	if (productQuantity == 0){ // если на складе нет товара
		alert('Failed');
	} else {		           // если на складе есть товар
		$$('storageTable').getSelectedItem().quantity--; // уменьшаем на складе количество товара на единицу
		$$('storageTable').refresh();

		let selected_id = $$("storageTable").getItem($$("storageTable").getSelectedId(true)).id; //получаем id выбранного товара
		let copyRow = webix.copy( $$('storageTable').getSelectedItem()); // копируем выбранный товар

		if($$('bascketTable').exists(selected_id)){ //если в корзине уже есть товар с данным id 
			console.log("exists");

			$$('bascketTable').getItem(selected_id).quantity++; // в корзине увеличиваем количество товара на единицу
			$$('bascketTable').getItem(selected_id).price+=$$('storageTable').getItem(selected_id).price; //увеличиваем стоимость на цену товара
			$$('bascketTable').refresh();
		} else{ // если в корзине нет товара с таким id
			$$('bascketTable').add(copyRow); // добавляем в корзину
			$$('bascketTable').getItem(selected_id).quantity = 1; 
			$$('bascketTable').refresh();
		}    
	}
	totalPrice();
}

//функция подсчета итоговой стоимости товаров в корзине
function totalPrice(){
	let sum = 0;
	$$('bascketTable').eachRow(function(row){
		sum += $$('bascketTable').getItem(row).price;
	});	
	$$("sum").setValue(sum);


}

//функция удаления товара из корзины
function removeFromBascket(){ 
	let selected_id = $$('bascketTable').getItem($$('bascketTable').getSelectedId(true)).id;  //получаем id выбранного товара
	if( $$('bascketTable').getSelectedItem().quantity == 1 ){ // если в корзине у выбранного товара количество равно 1
		$$('storageTable').getItem(selected_id).quantity++; // на складе увеличиваем количество на единицу
		$$('storageTable').refresh();
		$$('bascketTable').remove(selected_id); // удаляем строку из корзины

	} else {
		$$('storageTable').getItem(selected_id).quantity++; // на складе увеличиваем количество товара на единицу
		$$('storageTable').refresh();

		$$('bascketTable').getSelectedItem().quantity--; // в корзине уменьшаем количество на единицу
		$$('bascketTable').getItem(selected_id).price-=$$('storageTable').getItem(selected_id).price; //уменьшаем стоимость 
		$$('bascketTable').refresh();
	}	
	totalPrice();
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