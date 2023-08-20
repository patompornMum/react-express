-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 09, 2023 at 12:41 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_express`
--

-- --------------------------------------------------------

--
-- Table structure for table `feed`
--

CREATE TABLE `feed` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `title` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `likes` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `feed_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(100) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'admin', '$2b$10$ZJzc2ogkf5pQIT7me2DrjeCDht0SD.EviJ8oqBFollkMEUWYxB61K', 'admin'),
(2, 'mum', '$2b$10$X7WiEJJGrebhh75Is6pveOdC1/ixgWtVLCRgBrd31K0le74I9I4qO', 'user'),
(3, 'user', '$2b$10$aEDJbvq..7v/Y.ItLla4he7GOG3q.fL40jRy71yZVpP3C6Xj5WGTi', 'user'),
(4, 'patomporn', '$2b$10$rUwOO6peEou4fMbF4aca2uCG49JKLUKr9VqhcfxSWyCnb9Cs7sFEG', 'user'),
(5, 'john', '$2b$10$JMaqztlOjRQrwlKHzO1Tm.8wx68k4kpiB01lBjFWIJFV0VjKASEA6', 'user'),
(6, 'Nadine', '$2b$10$fSyC2ziZcfhiq4m4OY1yLuBIbUWBkAedvXZarpZta/Zi/LdO1Zh6G', 'user'),
(7, 'Ramiro', '$2b$10$qBDVZoB8xu0XxWLNccv.MeYUzaPivbu8MXz3suFwHscFrW7a24gsW', 'user'),
(8, 'ana', '$2b$10$SmgP/jwhn5Spd45gIEnYxOxbOMUh5hIV51c54NSirBW.4lCDvQ8tm', 'user'),
(9, 'peggy', '$2b$10$Oqhm97ZCxQWy72xpCNe1lOvZOd8Y6W/gNftBdibP8sq1g1cLWuRPK', 'user'),
(10, 'jinny', '$2b$10$Cf.gJ.6OXgHC7q0FmDfp/eZdj8UcfPl5G7POni8JfspljhrFyTC.O', 'user'),
(11, 'art', '$2b$10$f4RDgaBkLIUClRlY0gnXueAKkwH5VUUGj3gsMfFoln2y1Wox4LhfG', 'user'),
(12, 'deam', '$2b$10$l3U0EEJiYGbEdTXKmd9jWuD5CyWG5hth5qRyy6qgrAssYkPgqF//C', 'user'),
(13, 'danny', '$2b$10$ZlAjz1oVTHB1h41irVU/wugCB2JGnJVNvMHxtb0saFT6Tq/Gb0lAS', 'user'),
(14, 'pokky', '$2b$10$tIu6Qu9udVgxWXxK3vYbV.sVvPVNuSM/X79vgp0fO.cCBtL2x0B3G', 'user'),
(15, 'rafa', '$2b$10$F5EL2F6euFaIi.l699g1KOmk6mo320U1p85ZOpZcrZW0wCkt9JcKG', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feed`
--
ALTER TABLE `feed`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feed`
--
ALTER TABLE `feed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
