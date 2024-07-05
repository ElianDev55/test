CREATE TABLE Developers (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Country VARCHAR(100),
    Website VARCHAR(255)
);


CREATE TABLE Platforms (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Manufacturer VARCHAR(255)
);


CREATE TABLE VideoGames (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Genre VARCHAR(50),
    PlatformID INT,
    ReleaseDate DATE,
    DeveloperID INT,
    FOREIGN KEY (PlatformID) REFERENCES Platforms(ID),
    FOREIGN KEY (DeveloperID) REFERENCES Developers(ID)
);
