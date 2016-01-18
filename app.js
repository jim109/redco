var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect("mongodb://localhost/redcodb");

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

	var data = {
		title: "Mi primer super producto",
		description: "Una mega",
		imageUrl: "data.png",
		pricing: 10
	}

	var product = new Product(data);

	product.save(function(err){
		console.log(product);
	});

	respuesta.render("index");
});
//HTTP
	//Metodos
	//GET
	//POST

app.listen(8080);