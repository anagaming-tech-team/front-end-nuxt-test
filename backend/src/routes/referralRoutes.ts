import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { ReferralController } from "../controllers/referralController";

const router = Router();

/**
 * @openapi
 * /referrals/check:
 *   get:
 *     summary: Get list of users you have referred and your current points
 *     tags:
 *       - Referrals
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: An object containing an array of referred users and the referrer's points
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 referrals:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "60c72b2f9b1e8a5d4c8f1234"
 *                       name:
 *                         type: string
 *                         example: "Bob"
 *                       email:
 *                         type: string
 *                         example: "bob@example.com"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-04-23T14:30:00.000Z"
 *                 points:
 *                   type: integer
 *                   example: 450
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
router.get("/check", authMiddleware, ReferralController.checkReferrals);

export default router;
