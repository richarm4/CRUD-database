module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveOrders(req, res){
        //Selects the data from the orders page
        console.log("Order page loaded")
        var query = 'SELECT Orders.orderNumber, Customers.customerID, Orders.itemsOrdered, Orders.orderDate, Orders.OrderTime, Orders.orderTotal FROM Orders INNER JOIN Customers ON Orders.customerID = Customers.customerID';
        var mysql = req.app.get('mysql');
        var context = {};

        

        function handleRenderingOfOrders(error, results, fields){
          console.log(error)
          console.log(results)
          console.log(fields)
          //take the results of that query and store ti inside context
          context.orders = results;
          //pass it to handlebars to put inside a file
          res.render('orders', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfOrders)
    }
//moves order into table
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        //Execules sql query to insert
        var sql = "INSERT INTO Orders (customerID, itemsOrdered, orderDate, orderTime, orderTotal) VALUES (?,?,?,?,?)";
        var inserts = [req.body.customerID, req.body.itemsOrdered, req.body.orderDate, req.body.orderTime, req.body.orderTotal];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                //Returns back to page
                res.redirect('/orders');
            }
        });
    });

    //Serves the page of orders
    router.get('/', serveOrders);
    return router;
}();