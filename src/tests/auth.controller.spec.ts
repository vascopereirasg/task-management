import { AuthController } from "../controllers/auth.controller"
import type { AuthService } from "../services/auth.service"
import type { UserService } from "../services/user.service"
import type { Request, Response } from "express"
import type { User } from "../entities/user.entity"
import { jest } from "@jest/globals"

// Mock dependencies
jest.mock("../services/auth.service")
jest.mock("../services/user.service")

describe("AuthController", () => {
  let authController: AuthController
  let authService: jest.Mocked<AuthService>
  let userService: jest.Mocked<UserService>
  let req: Partial<Request>
  let res: Partial<Response>

  beforeEach(() => {
    // Create mocked instances with proper typing
    authService = {
      register: jest.fn(),
      validateUser: jest.fn(),
      generateToken: jest.fn(),
    } as unknown as jest.Mocked<AuthService>

    userService = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
    } as unknown as jest.Mocked<UserService>

    // Create a new controller instance with mocked services
    authController = new AuthController()
    // Replace the controller's services with our mocks
    ;(authController as any).authService = authService
    ;(authController as any).userService = userService

    // Mock request and response
    req = {
      body: {},
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Partial<Response>
  })

  describe("register", () => {
    it("should return 400 if validation fails", async () => {
      // Arrange
      req.body = {
        // Missing required fields
      }

      // Act
      await authController.register(req as Request, res as Response)

      // Assert
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalled()
    })

    it("should return 400 if user already exists", async () => {
      // Arrange
      req.body = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
        firstName: "Test",
        lastName: "User",
      }

      // Mock the findByEmail method to return a user
      userService.findByEmail.mockResolvedValue({ id: 1 } as User)

      // Act
      await authController.register(req as Request, res as Response)

      // Assert
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ message: "User with this email already exists" })
    })

    it("should return 201 and user data with token on successful registration", async () => {
      // Arrange
      req.body = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
        firstName: "Test",
        lastName: "User",
      }

      // Mock the findByEmail method to return null (user doesn't exist)
      userService.findByEmail.mockResolvedValue(null)

      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
      }

      // Mock the register method to return a user
      authService.register.mockResolvedValue(mockUser as Partial<User>)

      // Mock the generateToken method to return a token
      authService.generateToken.mockReturnValue("mock-token")

      // Act
      await authController.register(req as Request, res as Response)

      // Assert
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({ ...mockUser, token: "mock-token" })
    })
  })

  describe("login", () => {
    it("should return 400 if validation fails", async () => {
      // Arrange
      req.body = {
        // Missing required fields
      }

      // Act
      await authController.login(req as Request, res as Response)

      // Assert
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalled()
    })

    it("should return 401 if credentials are invalid", async () => {
      // Arrange
      req.body = {
        email: "test@example.com",
        password: "wrongpassword",
      }

      // Mock the validateUser method to return invalid credentials
      authService.validateUser.mockResolvedValue({ user: null, isValid: false })

      // Act
      await authController.login(req as Request, res as Response)

      // Assert
      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" })
    })

    it("should return 200 and user data with token on successful login", async () => {
      // Arrange
      req.body = {
        email: "test@example.com",
        password: "password123",
      }

      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
      }

      // Mock the validateUser method to return valid credentials
      authService.validateUser.mockResolvedValue({ user: mockUser as Partial<User>, isValid: true })

      // Mock the generateToken method to return a token
      authService.generateToken.mockReturnValue("mock-token")

      // Act
      await authController.login(req as Request, res as Response)

      // Assert
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ ...mockUser, token: "mock-token" })
    })
  })
})

