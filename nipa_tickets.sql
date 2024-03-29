-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2024 at 11:35 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nipa_tickets`
--

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `contactInfo` varchar(255) DEFAULT NULL,
  `createdTimeStamp` datetime DEFAULT current_timestamp(),
  `latestTimeStamp` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `title`, `description`, `contactInfo`, `createdTimeStamp`, `latestTimeStamp`, `status`) VALUES
(1, 'Comm3', 'Bye Bye', 'Pamu', '2024-03-30 01:46:00', '2024-03-30 01:05:08', 'accepted'),
(19, 'Example Ticket', 'This is a sample ticket description.', 'John Doe', '2024-04-01 10:30:00', '2024-04-01 10:30:00', 'resolved'),
(24, 'Example Ticket', 'This is a sample ticket description.', 'John Doe', '2024-03-30 03:17:11', '2024-03-30 03:17:11', 'accepted'),
(25, 'dfghbmjd', 'yjdfghjd', 'yjh', '2024-03-30 04:07:19', '2024-03-30 04:07:19', 'rejected'),
(26, 'dfhjd', 'ydfjhgfd', 'ghjf', '2024-03-30 04:07:21', '2024-03-30 04:07:21', 'resolved'),
(27, 'bvndf', 'drfytufhgj', 'fghjf', '2024-03-30 04:26:14', '2024-03-30 04:26:14', 'pending');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
