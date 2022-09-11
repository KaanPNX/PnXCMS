CREATE TABLE IF NOT EXISTS `g` (
    [OrderCount] INTEGER PRIMARY KEY AUTOINCREMENT,
    [OrderID] INTEGER NOT NULL,
    [OrderAuthor] INTEGER NOT NULL,
    [OrderPCS] INTEGER NOT NULL,
    [OrderPrice] INTEGER NOT NULL,
    [OrderProductID] INTEGER NOT NULL,
    [OrderStatus] INTEGER DEFAULT 0,
    [OrderDate] TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);