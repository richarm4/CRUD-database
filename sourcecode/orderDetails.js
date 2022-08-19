module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveorderDetails(req, res){
        //Selects data from the order details table
        console.log("order Details page loaded")
        var query = 'SELECT * FROM OrderDetails';
        var mysql = req.app.get('mysql');
        var context = {};

        

        function handleRenderingOfOrderDetails(error, results, fields){
          console.log(error)
          console.log(results)
          console.log(fields)
          //take the results of that query and store ti inside context
          context.orderDetails = results;
          //pass it to handlebars to put inside a file
          res.render('orderDetails', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfOrderDetails)
    }

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        //SQL query to insert into orderDetails table
        var sql = "INSERT INTO OrderDetails (orderNumber, SKU) VALUES (?,?)";
        var inserts = [req.body.orderNumber, req.body.SKU];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                //Redirects to order details page
                res.redirect('/orderDetails');
            }
        });
    });

    //Serves the order details page
    router.get('/', serveorderDetails);
    return router;
}();