-- ****************************************************************************
-- SOME SIMPLE CURD STATMENT TO MANIPULATE THE Customers TABLE.

-- display all data from the Customers table
SELECT customerID, Fname, Lname, customerEmail, customerAddress, customerPhone FROM Customers

-- display a single customer's first name and last name by id
SELECT Fname, Lname, FROM Customers WHERE customerID = :ENTER_CUSTOMER_ID

-- display data with different title
SELECT customerID, Fname, Lname AS Customer_ID, First_Name, Last_name FROM Customers

-- add a new customer
INSERT INTO Customers (customerID, Fname, Lname, customerEmail, customerAddress, customerPhone)
VALUES (:inputCustomerID, :inputFname, :inputLname, :inputCustomerEmail, :inputCustomerAddress, :inputCustomerPhone)

-- update a customer's phone number based on customerID
UPDATE Customers SET customerPhone = :inputCustomerPhone WHERE customerID = :ENTER_CUSTOMER_ID

-- Delete all customer
DELETE FROM Customers WHERE customerID = :ENTER_CUSTOMER_ID
-- ****************************************************************************
