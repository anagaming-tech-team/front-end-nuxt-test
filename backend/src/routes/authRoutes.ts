import { Router } from "express";
import { z } from "zod";
import { validate } from "../middleware/validate";
import { AuthController } from "../controllers/authController";

const router = Router();

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  referralCode: z.string().optional(),
});
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user (with optional referral)
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: User registration data; include a `referralCode` (user’s ObjectId) to credit the referrer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Alice"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "alice@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "s3cr3tPass!"
 *               referralCode:
 *                 type: string
 *                 description: ObjectId of the referrer (optional)
 *                 example: "60afb2e5c2a3d45f6b1a1234"
 *     responses:
 *       '201':
 *         description: Registration successful, returns a JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT for authenticated requests
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Invalid input or name/email already in use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Name or email already in use"
 *       '404':
 *         description: Provided referralCode does not match any user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Referrer not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  "/register",
  validate(registerSchema),
  AuthController.register as any
);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Authenticate a user and obtain a JWT
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "alice@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "s3cr3tPass!"
 *     responses:
 *       '200':
 *         description: Authentication successful, returns a JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT for authenticated requests
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/login", validate(loginSchema), AuthController.login);

export default router;
