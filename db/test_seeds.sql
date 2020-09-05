USE fo4_char_mgr_db;

INSERT INTO dlc (name)
VALUES ("Base Game"), ("Automatron"), ("Wasteland Workshop"), ("Far Harbor"), ("Contraptions Workshop"), ("Vault-Tec Workshop"), ("Nuka-World");

INSERT INTO perk (name, perk_rank, req_name, req_rank, req_level, effect, dlc_id)
VALUES ("test", 1, "test_name", 1, 1, "test effect", 1);