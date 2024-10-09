# Assignment Submission Portal
This is an Assignment Submission Portal built with **Node.js**, **Express.js**, **Mongoose**, and **JWT (JSON Web Tokens)**. 
The portal allows users to register, login, upload assignments, and administrators (admins) to review, accept, or reject assignments.

## Prerequisites:
Node.js installed on your system.
MongoDB setup (local or remote).
Installation Steps:
Clone the repository to your local machine:


``git clone https://github.com/your-repo/assignment-portal.git
cd assignment-portal``

Install the dependencies:  
`npm install`


## How to Start the Project
To run the project, use the following command:


`npm run dev`
This will start the server in development mode using nodemon. The server will listen on http://localhost:5000.

## API Endpoints
---
### 1. User Endpoints:
`POST /user/register` - Register a new user.
**Body Parameters:**  
name: User's name.  
email: User's email.  
password: User's password.  

`POST /user/login` - User login.    
**Body Parameters:**  
email: User's email.  
password: User's password.  

`POST /user/upload` - Upload an assignment (JWT token required i.e only after user is logged in).  
**Headers:**  
`Cookie: auth-token=<JWT Token>`  
**Body Parameters:**  
title: Assignment title.  
content: Assignment content.  

`GET /user/admins` - Fetch all admins.  
### 2. Admin Endpoints:  
**Body Parameters:**  
name: Admin's name.  
email: Admin's email.  
password: Admin's password. 

`POST /admin/register` - Register a new admin.  
**Body Parameters:**  
email: Admin's email.  
password: Admin's password.  

`POST /admin/login` - Admin login.  
**Body Parameters:**  
email: Admin's email.  
password: Admin's password.  

`GET /admin/assignments` - View assignments tagged to the admin (JWT token required).  
**Headers:**  
`Cookie: auth-token=<JWT Token>`  
`POST admin/assignments/:id/accept` - Accept an assignment.  

**Headers:**  
`Cookie: auth-token=<JWT Token>`  
`POST admin/assignments/:id/reject` - Reject an assignment.  
