-- phpMyAdmin SQL Dump
-- version 5.1.3-2.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 11, 2022 at 10:47 PM
-- Server version: 10.6.7-MariaDB-log
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_richarm4`
--

-- --------------------------------------------------------

--
-- Table structure for table `Customers`
--
DROP TABLE IF EXISTS `Customers`;
DROP TABLE IF EXISTS `Manufacturers`;
DROP TABLE IF EXISTS `Orders`;
DROP TABLE IF EXISTS `OrderDetails`;
DROP TABLE IF EXISTS `Products`;
CREATE TABLE `Customers` (
  `customerID` int(11) PRIMARY KEY AUTO_INCREMENT,
  `Fname` varchar(256) NOT NULL,
  `Lname` varchar(256) NOT NULL,
  `customerEmail` varchar(256) NOT NULL,
  `customerAddress` varchar(256) NOT NULL,
  `customerPhone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Customers`
--

INSERT INTO `Customers` (`Fname`, `Lname`, `customerEmail`, `customerAddress`, `customerPhone`) VALUES
('Sam', 'Smith', 'Smith@gmail.com', '123 Smith Ave', '971-000-0000'),
('Peter', 'Tran', 'Tran@gmail.com', '456 Peter Ave', '971-000-0001'),
('Joyce', 'Lee', 'Lee@gmail.com', '789 Lee Ave', '971-000-0002'),
('Kevin', 'Lou', 'Lou@gmail.com', '912 Lou Aver', '971-000-0003');

-- --------------------------------------------------------

--
-- Table structure for table `Manufacturers`
--

CREATE TABLE `Manufacturers` (
  `manufacturerID` int(11) PRIMARY KEY AUTO_INCREMENT,
  `manufacturerEmail` varchar(256) NOT NULL,
  `manufacturerAddress` varchar(256) NOT NULL,
  `manufacturerPhone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Manufacturers`
--

INSERT INTO `Manufacturers` (`manufacturerID`, `manufacturerEmail`, `manufacturerAddress`, `manufacturerPhone`) VALUES
(1, 'intel@intel.com', '123 SW Inter Ave', '000-000-0001'),
(2, 'amd@amd.com', '123 SW Amd Ave', '000-000-0002'),
(3, 'nvidia@nvidia.com', '123 SW Nvidia Ave', '000-000-0003'),
(4, 'corsair@corsair.com', '123 SW Corsair Ave', '000-000-0004');

-- --------------------------------------------------------

--
-- Table structure for table `OrderDetails`
--

CREATE TABLE `OrderDetails` (
  `orderNumber` int(11),
   FOREIGN KEY (orderNumber) REFERENCES Orders(orderNumber) ON DELETE CASCADE,
  `SKU` int(11),
   FOREIGN KEY (SKU) REFERENCES Products(SKU) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `OrderDetails`
--

INSERT INTO `OrderDetails` (`orderNumber`, `SKU`) VALUES
(1, 6439400),
(1, 6439401),
(2, 6439402);

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `orderNumber` int(11) PRIMARY KEY AUTO_INCREMENT,
  `customerID` int(11),
   FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE CASCADE,
  `itemsOrdered` int(11) NOT NULL,
  `orderDate` date NOT NULL,
  `orderTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `orderTotal` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`orderNumber`, `customerID`, `itemsOrdered`, `orderDate`, `orderTime`, `orderTotal`) VALUES
(0, 3, 12, '2022-05-02', '2022-05-11 22:29:30', 300.12),
(1, 4, 2, '2022-05-06', '2022-05-11 22:30:19', 300.4),
(2, 2, 20, '2022-04-04', '2022-05-11 22:31:22', 125.24),
(3, 1, 2, '2022-05-03', '2022-05-11 22:32:35', 456.78);

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `UPC` int(15) NOT NULL,
  `SKU` int(11) PRIMARY KEY AUTO_INCREMENT,
  `productStock` int(11) NOT NULL,
  `productName` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`UPC`, `SKU`, `productStock`, `productName`) VALUES
(812674021, 6439400, 1, 'NVIDIA GEFORCE RTX 3080'),
(812674023, 6439401, 1, 'NVIDIA GEFORCE RTX 3070'),
(812674024, 6439402, 3, 'NVIDIA GEFORCE RTX 3060 TI'),
(812674029, 6439409, 13, 'NVIDIA GEFORCE RTX 3090 TI');

--
-- Indexes for dumped tables
--


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
