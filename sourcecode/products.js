module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveProducts(req, res){
        //Selects table of products
        console.log("Products page loaded")
        var query = 'SELECT * FROM Products';
        var mysql = req.app.get('mysql');
        var context = {};

        

        function handleRenderingOfProducts(error, results, fields){
          console.log(error)
          console.log(results)
          console.log(fields)
          //take the results of that query and store it inside context
          context.products = results;
          //pass it to handlebars to put inside a file
          res.render('products', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfProducts)
    }

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        //SQL query to insert into products table
        var sql = "INSERT INTO Products (UPC, SKU, productStock, productName) VALUES (?,?,?,?)";
        var inserts = [req.body.UPC, req.body.SKU, req.body.productStock, req.body.productName];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                //redirect back to products page
                res.redirect('/products');
            }
        });
    });

    //Serves the product page
    router.get('/', serveProducts);
    return router;
}();