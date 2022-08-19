module.exports = function(){
    var express = require('express');
    var router = express.Router();
//Serves list of orders
    function serveOrders(req, res){
        console.log("Order page loaded")
        var query = 'SELECT * FROM Orders';
        var mysql = req.app.get('mysql');
        var context = {};

        
//Renders the list of orders
        function handleRenderingOfOrders(error, results, fields){
          console.log(error)
          console.log(results)
          console.log(fields)
          //take the results of that query and store it inside context
          context.orders = results;
          //pass it to handlebars to put inside a file
          res.render('orders', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfOrders)

    }
     /* Deletes an order from the list given an orderNumber */

     router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Orders WHERE orderNumber=?";
        var inserts = [req.body.orderNumber];
        //Processes the sql query to delete from the orders table
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                //Redirects to the orders page
                res.redirect('/orders');
            }
        });
    });
//Gets orders and returns router
    router.get('/', serveOrders);
    return router;
}();