module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveCustomers(req, res){
        console.log("Customer page loaded")
        //Sql query to select data from the customers table
        var query = 'SELECT * FROM Customers';
        var mysql = req.app.get('mysql');
        var context = {};

        

        function handleRenderingOfCustomers(error, results, fields){
          console.log(error)
          console.log(results)
          console.log(fields)
          //take the results of that query and store it inside context
          context.customers = results;
          //pass it to handlebars to put inside a file
          res.render('customers', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfCustomers)
    }
     /* The URI that update data is sent to in order to update a person */

     router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        //Deletes from the customer table given a specific input
        var sql = "DELETE FROM Customers WHERE customerID=?";
        var inserts = [req.body.customerID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                //Redirects to the customers page
                res.redirect('/customers');
            }
        });
    });

    //Serves the page of customers
    router.get('/', serveCustomers);
    return router;
}();