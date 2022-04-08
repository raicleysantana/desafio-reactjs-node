-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 08-Abr-2022 às 05:37
-- Versão do servidor: 10.4.22-MariaDB
-- versão do PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db`
--
CREATE DATABASE IF NOT EXISTS `db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `products`
--

CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `name` varchar(60) NOT NULL,
  `description` text DEFAULT NULL,
  `price` double NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `createdAt`, `updatedAt`) VALUES
(1, 'SMART TV 65\" UHD 4K,CRYSTAL 4K,ALEXA,BIV', 'Samsung Smart TV 65\'\' Crystal UHD 4K UN65AU7700GXZD, Borda ultrafina, Controle Remoto Único, Bluetooth. Com bordas imperceptíveis, a Crystal UHD, proporciona elegância ao seu ambiente e permite que você experiencie muita imersão no conteúdo assistido.', 4899, '2022-04-08 03:30:57', '2022-04-08 03:30:57'),
(2, 'Notebook Acer Aspire 5 A515-54-511Q, Intel® Core I5-1035G1, ', 'Notebooks da linha Aspire 5 são convenientemente portáteis e elegantes para acompanhar suas tarefas do dia a dia. Os recursos tecnológicos de sua confiança ao seu lado sempre que precisar. Desempenho suficiente para todas as tarefas com processador Intel® Core i5 de 10ª geração, edita, compartilha e assiste vídeos, fotos e imagens sem dificuldades.', 4789, '2022-04-08 03:31:40', '2022-04-08 03:31:40'),
(3, 'Impressora Epson Multifuncional ECOTANK L3250', 'A Epson EcoTank L3250 é uma multifuncional tanque de tinta 3 em 1 com conexão wireless destinada à famílias, estudantes, e profissionais. Oferece baixo custo de impressão graças ao sistema de EcoTank, que imprime até 4.500 páginas em preto e 7.500 páginas coloridas¹ com cada kit de garrafas de reposição original. A tecnologia Heat-Free da Epson não requer aquecimento da tinta no processo, e com isso garante mais rapidez, economia de energia e confiabilidade à impressora.', 1529, '2022-04-08 03:32:17', '2022-04-08 03:32:17'),
(4, 'Gabinete C3Tech Micro-ATX MT-25V2BK com fonte 200W', 'Desfrute de um produto com design moderno e inovador, unindo o seu gosto com o seu ambiente residencial ou de trabalho. Com abertura para ventilação lateral e interna e painel com áudio e USB. Não acompanha Cooler.', 229, '2022-04-08 03:32:43', '2022-04-08 03:32:43'),
(5, 'Monitor Prizi Slim 17\" LED PZ0017HDMI Bivolt Preto', 'Desfrute de todas as qualidades que o monitor Prizi PZ0017HDMI tem para lhe oferecer. Um monitor adaptado a você, com à sua tela LED, desfrute de gráficos com cores vivas e atraentes. Uma experiência visual de qualidade que vai ser ideal para você em sua vida diária, seja para estudar ou trabalhar. Além disso, a sua resolução de 1280x1024 permite que você desfrute de momentos únicos graças a uma imagem nítida.', 789, '2022-04-08 03:33:20', '2022-04-08 03:33:20');

-- --------------------------------------------------------

--
-- Estrutura da tabela `sales`
--

CREATE TABLE `sales` (
  `id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` double NOT NULL,
  `payment_type` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `sales`
--

INSERT INTO `sales` (`id`, `product_id`, `quantity`, `total`, `payment_type`, `status`, `createdAt`) VALUES
(1, 4, 2, 458, 'cartao_de_credito', 'pago', '2022-04-08 03:34:48'),
(2, 2, 1, 4789, 'boleto', 'pendente', '2022-04-08 03:35:09'),
(3, 3, 1, 1529, 'cartao_de_credito', 'cancelado', '2022-04-08 03:36:39');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `sales`
--
ALTER TABLE `sales`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
