-- landing_bd.`user` definition

CREATE TABLE `user` (
  `login` text NOT NULL,
  `password` text NOT NULL,
  `role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;