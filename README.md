# Wanderlust - Inspired by Airbnb  
### Full-Stack Web Application 🚀

![Visitor Count](https://profile-counter.glitch.me/BlackRabbitHere/count.svg) <!-- Add visitor count link here -->

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies & Packages Used](#technologies--packages-used)
- [Key Features](#key-features)
- [How to Install](#how-to-install)
- [Challenges & Solutions](#challenges--solutions)
- [Special Thanks](#special-thanks)
- [Author](#author)
- [Project Links](#project-links)
- [Thank You](#thank-you)

---

## Project Overview
Welcome to **Wanderlust**, a comprehensive full-stack web application inspired by Airbnb. The platform allows users to list and book properties, offering features such as user authentication, reviews, and interactive maps. The project leverages **MongoDB**, **Express.js**, and **Node.js** to create a robust and scalable application.

---

## Technologies & Packages Used

### Backend
- **MongoDB**: NoSQL database for efficient and flexible data storage.
- **Express.js**: Framework for building robust web and mobile applications.
- **Node.js**: JavaScript runtime environment for server-side development.

### Authentication
- **Passport.js**: Authentication middleware supporting multiple strategies.
- **Dotenv**: Securely manages environment variables.

### Image Storage
- **Cloudinary**: Cloud-based service for managing images and videos.

### Maps
- **Mapbox**: Provides customized interactive maps and location services.

### Frontend
- **EJS**: Embedded JavaScript templates for rendering dynamic content.

### Session Management
- **Connect Flash**: Flash messaging middleware for Express.js.
- **Connect Mongo**: MongoDB session store for managing user sessions.
- **Cookie Parser**: Parses cookies attached to client requests.

### Validation
- **Joi**: Data validation library.

### Object Modeling
- **Mongoose**: ODM for MongoDB and Node.js for easier data manipulation.

### File Uploads
- **Multer**: Middleware for handling multipart/form-data, primarily used for file uploads.

### Social Authentication
- **Passport Local**: Local authentication strategy.
- **Passport Facebook**: Facebook login integration.
- **Passport Google OAuth20**: Google OAuth 2.0 authentication.
- **Passport Local Mongoose**: Simplifies integration of Mongoose with Passport for user authentication.

---

## Key Features
- **User Authentication**: Login, Logout, and User Profile Section
- **CRUD Operations**: Create, Read, Update, and Delete Listings
- **Review System**: Users can add and delete reviews
- **Account Management**: Update user account details and password
- **Data Security**: Password hashing and encryption for secure data storage
- **Interactive Maps**: Utilize Mapbox to visualize property locations
- **Social Logins**: Login using Google or Facebook, along with traditional email login

---

## How to Install

To run this project locally, follow these steps:

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/yourusername/wanderlust.git
    cd wanderlust
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:

    Create a `.env` file in the root directory and configure the following variables:

    ```bash
    # Cloudinary
    CLOUD_NAME=your_cloudinary_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_secret

    # Mapbox
    MAP_TOKEN=your_mapbox_token

    # MongoDB Atlas
    ATLASDB_URL=your_mongodb_atlas_url

    # Session Secret
    SECRET=your_random_secret_key

    # Google OAuth
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GOOGLE_CALLBACK_URL=http://localhost:8080/auth/google/callback

    # Facebook OAuth
    FACEBOOK_APP_ID=your_facebook_app_id
    FACEBOOK_APP_SECRET=your_facebook_app_secret
    FACEBOOK_CALLBACK_URL=http://localhost:8080/auth/facebook/callback
    ```

4. **Run the Application**:

    ```bash
    node app.js
    ```

5. **Open in Your Browser**:

    Visit [http://localhost:8080/listings](http://localhost:8080/listings) to explore the application locally.

---

## Challenges & Solutions
During the development of **Wanderlust**, several challenges arose, particularly with handling data efficiently and scaling the backend. Through research and implementation of optimized solutions, these issues were resolved, ensuring the application's scalability and performance.

---

## Special Thanks
A huge thank you to **Shradha Khapra** ma'am and **Aman Dhattarwal** bhaiya from **Apna College**. Their mentorship and support have been instrumental in the success of this project.

---

## Author
**Kshitij**  
- LinkedIn: [Kshitij's Profile](https://www.linkedin.com/in/your-linkedin-profile)
- GitHub: [Kshitij's GitHub](https://github.com/yourusername)

---

## Project Links
- **Live Project**: [Wanderlust](https://lnkd.in/gzzup62R)
- **Project Repository**: [GitHub Repo](https://lnkd.in/grSVvb2h)

---

## Thank You
Thank you for exploring **Wanderlust**! I would love to hear your feedback or suggestions. Feel free to share your thoughts! 😊
