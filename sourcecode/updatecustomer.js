module.exports = function(){
    var express = require('express');
    var router = express.Router();
//Selects the customer table data
    function serveCustomers(req, res){
        console.log("Customer page loaded")
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
        var sql = "UPDATE Customers SET Fname=?, Lname=?, customerEmail=?, customerAddress=?, customerPhone=? WHERE customerID=?";
        var inserts = [req.body.Fname, req.body.Lname, req.body.customerEmail, req.body.customerAddress, req.body.customerPhone, req.body.customerID];
        //Sends sql query to update
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                //Redirects to customer page
                res.redirect('/customers');
            }
        });
    });

    //Serves the page
    router.get('/', serveCustomers);
    return router;
}();