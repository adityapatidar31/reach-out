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
