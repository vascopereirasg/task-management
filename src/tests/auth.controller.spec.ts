// import { AuthController } from '../controllers/auth.controller';
// import { AuthService } from '../services/auth.service';
// import { UserService } from '../services/user.service';
// import { Request, Response } from 'express';
// import { describe, beforeEach, it, expect, jest } from '@jest/globals';

// // Mock dependencies
// jest.mock('../services/auth.service');
// jest.mock('../services/user.service');

// describe('AuthController', () => {
//   let authController: AuthController;
//   let authService: AuthService;
//   let userService: UserService;
//   let req: Partial<Request>;
//   let res: Partial<Response>;

//   beforeEach(() => {
//     authService = new AuthService();
//     userService = new UserService();
//     authController = new AuthController();
    
//     // Mock request and response
//     req = {
//       body: {}
//     };
    
//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn()
//     };
//   });

//   describe('register', () => {
//     it('should return 400 if validation fails', async () => {
//       // Arrange
//       req.body = {
//         // Missing required fields
//       };
      
//       // Act
//       await authController.register(req as Request, res as Response);
      
//       // Assert
//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.json).toHaveBeenCalled();
//     });

//     it('should return 400 if user already exists', async () => {
//       // Arrange
//       req.body = {
//         username: 'testuser',
//         email: 'test@example.com',
//         password: 'password123',
//         firstName: 'Test',
//         lastName: 'User'
//       };
      
//       userService.findByEmail = jest.fn().mockResolvedValue({ id: 1 });
      
//       // Act
//       await authController.register(req as Request, res as Response);
      
//       // Assert
//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.json).toHaveBeenCalledWith({ message: 'User with this email already exists' });
//     });

//     it('should return 201 and user data with token on successful registration', async () => {
//       // Arrange
//       req.body = {
//         username: 'testuser',
//         email: 'test@example.com',
//         password: 'password123',
//         firstName: 'Test',
//         lastName: 'User'
//       };
      
//       userService.findByEmail = jest.fn().mockResolvedValue(null);
      
//       const mockUser = {
//         id: 1,
//         username: 'testuser',
//         email: 'test@example.com'
//       };
      
//       authService.register = jest.fn().mockResolvedValue(mockUser);
//       authService.generateToken = jest.fn().mockReturnValue('mock-token');
      
//       // Act
//       await authController.register(req as Request, res as Response);
      
//       // Assert
//       expect(res.status).toHaveBeenCalledWith(201);
//       expect(res.json).toHaveBeenCalledWith({ ...mockUser, token: 'mock-token' });
//     });
//   });

//   describe('login', () => {
//     it('should return 400 if validation fails', async () => {
//       // Arrange
//       req.body = {
//         // Missing required fields
//       };
      
//       // Act
//       await authController.login(req as Request, res as Response);
      
//       // Assert
//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.json).toHaveBeenCalled();
//     });

//     it('should return 401 if credentials are invalid', async () => {
//       // Arrange
//       req.body = {
//         email: 'test@example.com',
//         password: 'wrongpassword'
//       };
      
//       authService.validateUser = jest.fn().mockResolvedValue({ user: null, isValid: false });
      
//       // Act
//       await authController.login(req as Request, res as Response);
      
//       // Assert
//       expect(res.status).toHaveBeenCalledWith(401);
//       expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
//     });

//     it('should return 200 and user data with token on successful login', async () => {
//       // Arrange
//       req.body = {
//         email: 'test@example.com',
//         password: 'password123'
//       };
      
//       const mockUser = {
//         id: 1,
//         username: 'testuser',
//         email: 'test@example.com'
//       };
      
//       authService.validateUser = jest.fn().mockResolvedValue({ user: mockUser, isValid: true });
//       authService.generateToken = jest.fn().mockReturnValue('mock-token');
      
//       // Act
//       await authController.login(req as Request, res as Response);
      
//       // Assert
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.json).toHaveBeenCalledWith({ ...mockUser, token: 'mock-token' });
//     });
//   });
// });
