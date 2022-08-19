module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveCustomers(req, res){
        //SQL Query to select the customer table
        console.log("Customer page loaded")
        var query = 'SELECT * FROM Customers';
        var mysql = req.app.get('mysql');
        var context = {};

        

        function handleRenderingOfCustomers(error, results, fields){
          console.log(error)
          console.log(results)
          console.log(fields)
          //take the results of that query and stores inside context
          context.customers = results;
          //pass it to handlebars to put inside a file
          res.render('customers', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfCustomers)
    }

    router.post('/', function(req, res){
        //Puts the created customer into the customers table
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Customers (Fname, Lname, customerEmail, customerAddress, customerPhone) VALUES (?,?,?,?,?)";
        var inserts = [req.body.Fname, req.body.Lname, req.body.customerEmail, req.body.customerAddress, req.body.customerPhone];
        //Inserts values into the sql query
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                //Takes you back to the customer page
                res.redirect('/customers');
            }
        });
    });

    //Returns the page
    router.get('/', serveCustomers);
    return router;
}();