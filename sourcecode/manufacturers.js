module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveManufacturers(req, res){
        //Selects the data from the manufacturer table
        console.log("Manufacturer page loaded")
        var query = 'SELECT * FROM Manufacturers';
        var mysql = req.app.get('mysql');
        var context = {};

        

        function handleRenderingOfManufacturers(error, results, fields){
          console.log(error)
          console.log(results)
          console.log(fields)
          //take the results of that query and store it inside context
          context.manufacturers = results;
          //pass it to handlebars to put inside a file
          res.render('manufacturers', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfManufacturers)

    }

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Manufacturers (manufacturerEmail, manufacturerAddress, manufacturerPhone) VALUES (?,?,?)";
        var inserts = [req.body.manufacturerEmail, req.body.manufacturerAddress, req.body.manufacturerPhone];
        //Puts the data into the sql query
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                //redirects into manufacturer page
                res.redirect('/manufacturers');
            }
        });
    });

    //Serves the page of manufacturers
    router.get('/', serveManufacturers);
    return router;
}();