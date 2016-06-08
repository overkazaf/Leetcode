SELECT 
    a.Name as Employee
	FROM
	    Employee AS a
		LEFT JOIN
		(
		    SELECT Id, b.Name, b.Salary from Employee as b
		) as b on a.ManagerId = b.Id
	WHERE
		a.ManagerId IS NOT NULL
	AND 
		a.Salary > b.Salary;
