-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2022 at 08:31 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mysqldb100`
--

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `ID` int(5) NOT NULL,
  `CAR_NAME` varchar(200) NOT NULL,
  `BRAND` varchar(200) NOT NULL,
  `BODY_TYPE` varchar(200) NOT NULL,
  `YEAR` int(4) NOT NULL,
  `TRANSMISSION` varchar(200) NOT NULL,
  `TYPE` varchar(200) NOT NULL,
  `ENGINE` varchar(200) NOT NULL,
  `SEAT` int(200) NOT NULL,
  `COLOR` varchar(100) NOT NULL,
  `CONDITION` varchar(200) NOT NULL,
  `IMAGE` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`ID`, `CAR_NAME`, `BRAND`, `BODY_TYPE`, `YEAR`, `TRANSMISSION`, `TYPE`, `ENGINE`, `SEAT`, `COLOR`, `CONDITION`, `IMAGE`) VALUES
(11101, 'BMW X2', 'BMW', 'crossover SUV', 2002, 'Automatic', 'fuel', 'engine1', 5, 'gray', 'no side mirrors', '1656686690889--bmw-logo-672.png'),
(11102, 'BMW 4', 'BMW', 'crossover', 2018, 'automatic', 'fuel', 'engine2', 5, 'red', 'missing wheel1', '1656685568222--bmw-logo-672.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(6) NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `birthday` date NOT NULL,
  `country` varchar(100) NOT NULL,
  `position` varchar(200) NOT NULL,
  `picture` varchar(200) DEFAULT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `first_name`, `last_name`, `email`, `birthday`, `country`, `position`, `picture`, `password`) VALUES
(202202, 'Lan', 'b', 'kikz', '0000-00-00', 'philippines', 'staff', '1656687593384--l200_23711645437616.jpg', '1234'),
(202207, 'Ma. Roxanne', 'Lagazon', 'roxannelagazon@gmail.com', '0000-00-00', 'Philippines', 'Administrator', '1656699782132--roxanne.jpg', 'undefined'),
(202208, 'Lalaine', 'Beato', 'lalaine@gmail.com', '1999-01-01', 'Philippines', 'Administrator', '1656700061382--laine.jpg', '1234'),
(202209, 'Mary Aleth', 'Dumandal', 'maryalethdumandal01@gmail.com', '1991-04-05', 'Philippines', 'Administrator', '1656700120494--aleth.jpg', '1234');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11108;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=202210;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
