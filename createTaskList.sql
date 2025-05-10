DROP PROCEDURE IF EXISTS creaeTaskList;
DELIMITER //

CREATE PROCEDURE creaeTaskList(
    IN nome_usuario VARCHAR(100),
    IN nome_dia VARCHAR(20),
    IN nome_tarefa VARCHAR(100),
    IN nome_tarefa_pai VARCHAR(100)
)
BEGIN
    DECLARE user_id INT;
    DECLARE dia_id INT;
    DECLARE parent_task_id INT;

    SELECT UserID INTO user_id FROM user WHERE name = nome_usuario;

    SELECT DayID INTO dia_id FROM day WHERE name = nome_dia;

    SELECT TaskListID INTO parent_task_id
    FROM tasklist
    WHERE UserID = user_id AND DayID = dia_id AND name = nome_tarefa_pai;

    IF parent_task_id IS NULL THEN
        SET parent_task_id = NULL;
    END IF;

    INSERT INTO tasklist (UserID, DayID, name, parentId, complete)
    VALUES (user_id, dia_id, nome_tarefa, parent_task_id, FALSE);

    SELECT LAST_INSERT_ID() AS NovaTarefaID;
END //

DELIMITER ;
