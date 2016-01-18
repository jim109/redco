var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect("mongodb://localhost/redcodb");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Definir el esquema de nuestro productos o la tabla
var productSchema = {
	title:String,
	description:String,
	imageUrl:String,
	pricing:Number
};

//Modelo
var Product = mongoose.model("Product", productSchema);


app.set("view engine", "jade");

app.use(express.static("public"));

app.get("/",function(solicitud,respuesta){

	/*var data = {
		title: "Mi primer super producto",
		description: "Una mega",
		imageUrl: "data.png",
		pricing: 10
	}

	var product = new Product(data);

	product.save(function(err){
		console.log(product);
	});*/

	respuesta.render("index");
});

app.post("/productos", function(solicitud, respuesta){
	
	if(solicitud.body.password == "123"){
		var data = {
			title: solicitud.body.title,
			description: solicitud.body.description,
			imageUrl: "data.png",
			pricing: solicitud.body.pricing
		}

		var product = new Product(data);

		product.save(function(err){
			console.log(product);
			respuesta.render("index");
		});

	}else{
		respuesta.render("productos/new");
	}




});

app.get("/productos/new", function(solicitud, respuesta){

	respuesta.render("productos/new")
});

app.listen(8080);