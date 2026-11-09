-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 09, 2026 at 09:41 PM
-- Server version: 8.0.30
-- PHP Version: 8.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_warnet`
--

-- --------------------------------------------------------

--
-- Table structure for table `computer`
--

CREATE TABLE `computer` (
  `id_computer` int NOT NULL,
  `nomor_pc` int NOT NULL,
  `jenis_pc` enum('Reguler','VIP','Premium') DEFAULT 'Reguler',
  `spesifikasi` varchar(255) DEFAULT NULL,
  `status` enum('Tersedia','Digunakan','Maintenance') DEFAULT 'Tersedia'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `computer`
--

INSERT INTO `computer` (`id_computer`, `nomor_pc`, `jenis_pc`, `spesifikasi`, `status`) VALUES
(1, 1, 'Reguler', 'Core i3-10100F, RAM 8GB, GTX 1650', 'Tersedia'),
(2, 2, 'Reguler', 'Core i3-10100F, RAM 8GB, GTX 1650', 'Tersedia'),
(3, 3, 'VIP', 'Core i5-12400F, RAM 16GB, RTX 3060', 'Tersedia'),
(4, 4, 'VIP', 'Core i5-12400F, RAM 16GB, RTX 3060', 'Tersedia'),
(5, 5, 'Premium', 'Core i7-13700K, RAM 32GB, RTX 4070', 'Tersedia'),
(6, 6, 'Premium', 'Core i7-13700K, RAM 32GB, RTX 4070', 'Tersedia');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id_member` int NOT NULL,
  `nama` varchar(100) NOT NULL,
  `no_hp` varchar(15) DEFAULT NULL,
  `saldo` int DEFAULT '0',
  `tanggal_daftar` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id_member`, `nama`, `no_hp`, `saldo`, `tanggal_daftar`) VALUES
(1, 'Dandi Prayata', '081234567890', 50000, '2026-11-09 18:18:04'),
(2, 'Ryan Gosling', '082198765432', 25000, '2026-11-09 18:18:04'),
(3, 'Romo Purnomo', '085711223344', 100000, '2026-11-09 18:18:04'),
(4, 'Bayu Trias', '083899887766', 2000000, '2026-11-09 16:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id_produk` int NOT NULL,
  `nama_produk` varchar(100) NOT NULL,
  `kategori` varchar(50) DEFAULT NULL,
  `harga` int NOT NULL,
  `stok` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`id_produk`, `nama_produk`, `kategori`, `harga`, `stok`) VALUES
(1, 'Indomie Goreng + Telur', 'Makanan', 12000, 30),
(2, 'Nasi Goreng Spesial', 'Makanan', 18000, 25),
(3, 'Es Teh Manis', 'Minuman', 5000, 50),
(4, 'Kopi Hitam', 'Minuman', 8000, 30),
(5, 'Air Mineral 600ml', 'Minuman', 4000, 50);

-- --------------------------------------------------------

--
-- Table structure for table `rental`
--

CREATE TABLE `rental` (
  `id_rental` int NOT NULL,
  `id_member` int DEFAULT NULL,
  `id_computer` int NOT NULL,
  `waktu_mulai` datetime NOT NULL,
  `waktu_selesai` datetime DEFAULT NULL,
  `total_biaya` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rental`
--

INSERT INTO `rental` (`id_rental`, `id_member`, `id_computer`, `waktu_mulai`, `waktu_selesai`, `total_biaya`) VALUES
(1, 1, 1, '2026-11-09 10:00:00', '2026-11-09 13:00:00', 15000),
(2, 2, 3, '2026-11-09 14:00:00', '2026-11-09 16:00:00', 16000),
(3, 3, 5, '2026-11-09 18:00:00', '2026-11-09 21:00:00', 36000),
(4, NULL, 2, '2026-11-10 08:00:00', '2026-11-10 10:00:00', 10000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `computer`
--
ALTER TABLE `computer`
  ADD PRIMARY KEY (`id_computer`),
  ADD UNIQUE KEY `nomor_pc` (`nomor_pc`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id_member`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id_produk`);

--
-- Indexes for table `rental`
--
ALTER TABLE `rental`
  ADD PRIMARY KEY (`id_rental`),
  ADD KEY `id_member` (`id_member`),
  ADD KEY `id_computer` (`id_computer`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `computer`
--
ALTER TABLE `computer`
  MODIFY `id_computer` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id_member` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `id_produk` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `rental`
--
ALTER TABLE `rental`
  MODIFY `id_rental` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `rental`
--
ALTER TABLE `rental`
  ADD CONSTRAINT `rental_ibfk_1` FOREIGN KEY (`id_member`) REFERENCES `member` (`id_member`) ON DELETE SET NULL,
  ADD CONSTRAINT `rental_ibfk_2` FOREIGN KEY (`id_computer`) REFERENCES `computer` (`id_computer`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
