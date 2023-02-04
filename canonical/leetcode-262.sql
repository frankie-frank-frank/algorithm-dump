SELECT Request_at AS Day,
ROUND(SUM(IF(Status != "completed", 1, 0))/COUNT(Status),2) AS "Cancellation Rate"
FROM Trips
WHERE Request_at >= "2013-10-01" AND Request_at <= "2013-10-03"
AND Client_Id NOT IN (SELECT Users_Id FROM Users WHERE Banned = "Yes")
AND Driver_Id NOT IN (SELECT Users_Id FROM Users WHERE Banned = "Yes")
GROUP BY Request_at

/* OPTIMIZATION
    1. round with the count and case..end immediately:
    ROUND(COUNT(CASE WHEN status != 'completed' THEN 1 ELSE NULL END)/COUNT(*),2) 

    2. use inner join instead of AND condition:
    INNER JOIN Users client on client.users_id = Trips.client_id
    INNER JOIN Users driver on driver.users_id = Trips.driver_id
*/

/*
    JOINS: Inner, Left, Right, Full, Self
    UNION
*/