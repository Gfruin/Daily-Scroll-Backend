# Daily-Scroll-Backend

HOME PAGE: 
---------- 

1. UPDATE “/users/:user_id” Updates the Home and then will redirect to new HOME
2. POST “/newUser” Creates a user body should include username and password
3. GET ‘/users/:user_id’ get user info

CATEGORY ARTICLES:
-----------
1. GET ‘/news-category’ Gets the articles from 3rd party API and personal API under a certain category (index)


USER ARTICLES:
-----------
1. POST ‘/news-articles’ creates a personal post by a user; body should include article title, description, category
2. GET ‘/news-articles/:article_id’ get info about 1 article
4. DELETE ‘/news-article/:article_id deletes the news article
5. PUT ‘/news-article/:article_id updates the news article 

COMMENT: 
-----------
1. POST ‘/comment/’ creates a comment attached to a post 

Stretch Goals: 
------------
1. POST '/news-category' Creates a new category that users can post articles to or create their own.
2. PUT '/comment/:comment_id updates the comment made by user
3. GET '/comment/:comment_id gets all the commments for an entire article post
4. DELETE '/comment/:comment_id' deletes the comment from the post

