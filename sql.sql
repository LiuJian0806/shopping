`users`CREATE DATABASE shopping;
CREATE TABLE users
(
	upet_name VARCHAR(20),
	uphone VARCHAR(20),
	upsw VARCHAR(50),
	uage SMALLINT,
	usex VARCHAR(2),
	uaddress VARCHAR(100),
	ujoin_time VARCHAR(20),
	PRIMARY KEY (uphone)
);


CREATE TABLE BOOK
(
	b_id VARCHAR(50),
	b_name VARCHAR(100),
	b_photo_1 VARCHAR(30),
	b_photo_2 VARCHAR(30),
	b_photo_3 VARCHAR(30),
	b_photo_4 VARCHAR(30),
	b_photo_5 VARCHAR(30),
	b_describe VARCHAR(300),
	b_newprice VARCHAR(20),
	b_oldprice VARCHAR(20),
	b_author VARCHAR(50),
	b_publish_company VARCHAR(100),
	b_publish_time VARCHAR(50),
	b_isbn VARCHAR(20),
	PRIMARY KEY(b_id)	
)
CREATE TABLE manage
(
	m_name VARCHAR(20),
	m_id VARCHAR(20),
	m_password VARCHAR(20),
	PRIMARY KEY(m_id)
)

DROP TABLE Book;


CREATE TABLE shoppingcart
(
	order_id VARCHAR(50),
	b_id VARCHAR(50),
	u_phone VARCHAR(20),
	order_num INT,
	order_status INT,
	PRIMARY KEY(order_id)
)