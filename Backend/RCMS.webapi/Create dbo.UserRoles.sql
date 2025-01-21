/*CREATE TABLE UserRoles (
    Id INT IDENTITY(1000, 1) PRIMARY KEY, -- Auto-increment starting from 1000
    UserId INT NOT NULL, -- Define UserId, should not be NULL
    RoleId INT NOT NULL, -- Define RoleId, should not be NULL
    CONSTRAINT FK_UserRoles_UserId FOREIGN KEY (UserId) REFERENCES Users(Id), -- Foreign key for Users table
    CONSTRAINT FK_UserRoles_RoleId FOREIGN KEY (RoleId) REFERENCES Roles(RoleId) -- Foreign key for Roles table
);
;

select * from UserRoles