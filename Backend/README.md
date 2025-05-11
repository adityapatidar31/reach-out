# ReachOut Backend

This is the backend service for **ReachOut**, a community-driven platform enabling users to create, manage, and respond to help requests. Built using **Spring Boot**, it provides a secure and scalable RESTful API, handles real-time messaging with WebSockets, and integrates services like Cloudinary for media handling.

---

## ⚙️ Tech Stack

- **Java 17**
- **Spring Boot 3**
  - Spring Web
  - Spring Data JPA
  - Spring Security
  - Bean Validation
- **JWT (JSON Web Tokens)** – For authentication
- **WebSocket** – For real-time chat
- **PostgreSQL** – As the database
- **Cloudinary** – For image upload and management
- **Maven** – Project build tool

---

## 📁 Project Structure

```
out/
├── OutApplication.java
├── config/
│ ├── AppConfig.java
│ ├── CloudinaryConfig.java
│ ├── CorsConfig.java
│ ├── SecurityConfig.java
├── Dto/
│ ├── HelpAllResponse.java
│ ├── HelpOfferRequest.java
│ ├── HelpOfferResponse.java
│ ├── HelpOfferResponseByUser.java
│ ├── HelpOfferResponseWithUser.java
│ ├── HelpOfferStatusUpdateRequest.java
│ ├── HelpPatchRequest.java
│ ├── HelpRequest.java
│ ├── LoginRequest.java
│ ├── PasswordUpdateRequest.java
│ ├── SignupRequest.java
│ ├── UpdateUserNameRequest.java
│ └── Conversation/
│ ├── ConversationResponse.java
│ ├── ConversationSummaryResponse.java
│ ├── CreateConversationRequest.java
│ ├── MessageResponse.java
│ ├── SendMessageRequest.java
├── enums/
│ ├── Category.java
│ ├── HelpOfferStatus.java
│ ├── HelpStatus.java
│ ├── HelpType.java
├── Exceptions/
│ ├── ApiException.java
│ ├── GlobalExceptionHandler.java
├── Mapper/
│ ├── ConversationMapper.java
│ ├── HelpMapper.java
│ ├── HelpOfferMapper.java
│ ├── MessageMapper.java
├── Model/
│ ├── Conversation.java
│ ├── Help.java
│ ├── HelpOffer.java
│ ├── Message.java
│ ├── User.java
├── Repository/
│ ├── ConversationRepository.java
│ ├── HelpOfferRepository.java
│ ├── HelpRepository.java
│ ├── MessageRepository.java
│ ├── UserRepository.java
├── Security/
│ ├── CustomUserDetailsService.java
│ ├── JwtAuthenticationEntryPoint.java
│ ├── JwtAuthenticationFilter.java
│ ├── JwtTokenProvider.java
├── Service/
│ ├── ConversationService.java
│ ├── HelpOfferService.java
│ ├── HelpService.java
│ ├── MessageService.java
│ ├── UserService.java
├── Controller/
│ ├── AuthController.java
│ ├── ConversationController.java
│ ├── HelpController.java
│ ├── HelpOfferController.java
│ ├── MessageController.java
│ ├── ProfileController.java
│ └── WebSocketController.java
```

## 🛠️ Setup Instructions

1. **Install Dependencies & Build**

   Ensure you have **Java 17**, **Maven**, and **PostgreSQL** installed.

   ```bash
   mvn clean install
   ```

2. **🔐 Set Up Environment Variables**

   Create a .env file or configure the environment directly with the following variables:

   ```bash
    # ========== PostgreSQL Configuration ==========
    SPRING_DATASOURCE_URL=your_database_url
    SPRING_DATASOURCE_USERNAME=your_database_username
    SPRING_DATASOURCE_PASSWORD=your_database_password

    # ========== JWT Configuration ==========
    JWT_SECRET=your_jwt_secret_key
    JWT_EXPIRATION_MS=your_token_expiration_in_ms

    # ========== Cloudinary Configuration ==========
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   ```

3. **Run the application**

   ```bash
   mvn spring-boot:run
   ```

Great! Here's the **second part** of your `README.md` for the **ReachOut backend**, focused on **Routes**:

---

## 📡 Routes

### 🔐 Authenticated Routes

These routes require a valid JWT token in the `Authorization` header.

| Method | Endpoint                    | Description                              |
| ------ | --------------------------- | ---------------------------------------- |
| POST   | `/api/help`                 | Create a new help request                |
| PUT    | `/api/help/{id}`            | Update an existing help request          |
| DELETE | `/api/help/{id}`            | Delete a help request                    |
| POST   | `/api/help-offers/{helpId}` | Offer help to a specific help request    |
| GET    | `/api/user/me`              | Fetch current logged-in user's profile   |
| PUT    | `/api/user/me`              | Update current user's profile            |
| POST   | `/api/conversations/{id}`   | Create a conversation                    |
| GET    | `/api/conversations`        | Get all conversations for logged-in user |
| GET    | `/api/messages/{id}`        | Get messages for a specific conversation |
| POST   | `/api/messages/{id}`        | Send a message in a conversation         |
| POST   | `/api/logout`               | Log out the user                         |

---

### 🌐 Public Routes

These routes are open to all users.

| Method | Endpoint             | Description                         |
| ------ | -------------------- | ----------------------------------- |
| POST   | `/api/auth/register` | Register a new user                 |
| POST   | `/api/auth/login`    | Login and receive JWT token         |
| GET    | `/api/help`          | View all public help requests       |
| GET    | `/api/help/{id}`     | Get details of a specific help post |
| GET    | `/api/user/{userId}` | View public profile of any user     |
