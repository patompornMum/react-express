GRANT ALL PRIVILEGES ON * . * TO 'blue'@'%';

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(100) NOT NULL DEFAULT 'user',
  `status` enum('enable','disable') NOT NULL DEFAULT 'enable'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `created_at`, `username`, `password`, `role`, `status`) VALUES
(1, '2023-08-01 02:52:03', 'admin', '$2b$10$ZJzc2ogkf5pQIT7me2DrjeCDht0SD.EviJ8oqBFollkMEUWYxB61K', 'admin', 'enable'),
(2, '2023-08-02 04:31:20', 'mum', '$2b$10$X7WiEJJGrebhh75Is6pveOdC1/ixgWtVLCRgBrd31K0le74I9I4qO', 'admin', 'enable'),
(3, '2023-08-04 02:52:28', 'user', '$2b$10$aEDJbvq..7v/Y.ItLla4he7GOG3q.fL40jRy71yZVpP3C6Xj5WGTi', 'user', 'enable'),
(4, '2023-08-04 03:00:00', 'patomporn', '$2b$10$rUwOO6peEou4fMbF4aca2uCG49JKLUKr9VqhcfxSWyCnb9Cs7sFEG', 'user', 'enable'),
(5, '2023-08-05 05:00:00', 'john', '$2b$10$JMaqztlOjRQrwlKHzO1Tm.8wx68k4kpiB01lBjFWIJFV0VjKASEA6', 'user', 'disable'),
(6, '2023-08-20 06:00:00', 'Nadine', '$2b$10$fSyC2ziZcfhiq4m4OY1yLuBIbUWBkAedvXZarpZta/Zi/LdO1Zh6G', 'user', 'enable'),
(7, '2023-08-23 04:44:20', 'Ramiro', '$2b$10$qBDVZoB8xu0XxWLNccv.MeYUzaPivbu8MXz3suFwHscFrW7a24gsW', 'user', 'enable'),
(8, '2023-08-27 01:00:01', 'ana', '$2b$10$SmgP/jwhn5Spd45gIEnYxOxbOMUh5hIV51c54NSirBW.4lCDvQ8tm', 'user', 'enable'),
(9, '2023-09-01 03:00:00', 'peggy', '$2b$10$Oqhm97ZCxQWy72xpCNe1lOvZOd8Y6W/gNftBdibP8sq1g1cLWuRPK', 'user', 'enable'),
(10, '2023-09-01 05:00:00', 'jinny', '$2b$10$Cf.gJ.6OXgHC7q0FmDfp/eZdj8UcfPl5G7POni8JfspljhrFyTC.O', 'user', 'enable'),
(11, '2023-09-01 06:00:00', 'art', '$2b$10$f4RDgaBkLIUClRlY0gnXueAKkwH5VUUGj3gsMfFoln2y1Wox4LhfG', 'user', 'enable'),
(12, '2023-09-01 08:00:00', 'deam', '$2b$10$l3U0EEJiYGbEdTXKmd9jWuD5CyWG5hth5qRyy6qgrAssYkPgqF//C', 'user', 'enable'),
(13, '2023-09-01 10:00:00', 'danny', '$2b$10$ZlAjz1oVTHB1h41irVU/wugCB2JGnJVNvMHxtb0saFT6Tq/Gb0lAS', 'user', 'enable'),
(14, '2023-09-02 05:00:00', 'pokky', '$2b$10$tIu6Qu9udVgxWXxK3vYbV.sVvPVNuSM/X79vgp0fO.cCBtL2x0B3G', 'user', 'enable'),
(15, '2023-09-03 07:00:00', 'rafa', '$2b$10$F5EL2F6euFaIi.l699g1KOmk6mo320U1p85ZOpZcrZW0wCkt9JcKG', 'user', 'enable');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;