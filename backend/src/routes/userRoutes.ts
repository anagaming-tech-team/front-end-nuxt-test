import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

/**
 * @openapi
 * /users/referral:
 *   get:
 *     summary: Get your own referral code
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Your referral code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 referralCode:
 *                   type: string
 *                   example: "60afb2e5c2a3d45f6b1a1234"
 *       '401':
 *         description: Unauthorized – valid JWT required
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
 *                   example: "Unauthorized"
 *       '404':
 *         description: User not found
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
 *                   example: "User not found"
 */
router.get("/referral", authMiddleware, UserController.getReferralCode);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: List all users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Array of user objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60afb2e5c2a3d45f6b1a1234"
 *                   name:
 *                     type: string
 *                     example: "Alice"
 *                   email:
 *                     type: string
 *                     example: "alice@example.com"
 *                   points:
 *                     type: integer
 *                     example: 250
 *                   referralCode:
 *                     type: string
 *                     example: "60afb2e5c2a3d45f6b1a1234"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-04-23T10:00:00.000Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-04-23T12:30:00.000Z"
 *       '401':
 *         description: Unauthorized – valid JWT required
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
 *                   example: "Unauthorized"
 */
router.get("/", authMiddleware, UserController.getAllUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get one user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 60afb2...
 *     responses:
 *       '200':
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             examples:
 *               example-1:
 *                 summary: A sample user
 *                 value:
 *                   id: "60afb2..."
 *                   name: "Alice"
 *                   email: "alice@example.com"
 *                   points: 200
 *                   referralCode: "60afb2..."
 *                   createdAt: "2025-04-23T10:00:00Z"
 *                   updatedAt: "2025-04-23T10:00:00Z"
 *
 *       '404':
 *         description: Not found
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
 *                   example: "User not found"
 */
router.get("/:id", authMiddleware, UserController.getUserById);
export default router;
