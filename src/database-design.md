Auction(Memorable numbers) System Database Design

1. Users Table:
-----------------------------------------------------
• user_id (primary key) 
• username
• password
• email
• role
• address
    
    1.1 ROLES TABLE ENUM
        • REGULAR_USER
        • ADMINSTRATOR
        • FINANCE

2. Auctions Table:

-----------------------------------------------------

• auction_id (primary key)
• item_description( PHONE NUMBER)
• starting_price
• reserve_price
• start_time
• end_time

------------------------------------------------------

3. Bids Table:

-------------------------------------------------------
• bid_id (primary key)
• auction_id (foreign key referencing Auctions table)
• bidder_id (foreign key referencing Users table)
• bid_amount
• bid_time

------------------------------------------------------

4. Watchlist Table:

• watchlist_id (primary key)
• auction_id (foreign key referencing Auctions table)
• user_id (foreign key referencing Users table)

-------------------------------------------------------
5. Payments Table:

• payment_id (primary key)
• auction_id (foreign key referencing Auctions table)
• buyer_id (foreign key referencing Users table)
• seller_id (foreign key referencing Users table)
• payment_amount
• payment_time
• payment_method

---------------------------------------------------------
6. Notifications Table:

• notification_id (primary key)
• user_id (foreign key referencing Users table)
• message
• timestamp

