"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userPersonalizationController = __importStar(require("../controllers/userPersonalization.controller"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: UserPersonalization
 *   description: User personalization management
 */
/**
 * @swagger
 * /user-personalization:
 *   post:
 *     summary: Create user personalization
 *     tags: [UserPersonalization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: User personalization created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', userPersonalizationController.createUserPersonalization);
/**
 * @swagger
 * /user-personalization:
 *   get:
 *     summary: Get all user personalizations
 *     tags: [UserPersonalization]
 *     responses:
 *       200:
 *         description: A list of user personalizations
 */
router.get('/', userPersonalizationController.getUserPersonalizations);
/**
 * @swagger
 * /user-personalization/{id}:
 *   get:
 *     summary: Get user personalization by ID
 *     tags: [UserPersonalization]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user personalization ID
 *     responses:
 *       200:
 *         description: User personalization found
 *       404:
 *         description: User personalization not found
 */
router.get('/:id', userPersonalizationController.getUserPersonalization);
/**
 * @swagger
 * /user-personalization/{id}:
 *   put:
 *     summary: Update user personalization
 *     tags: [UserPersonalization]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user personalization ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: User personalization updated successfully
 *       400:
 *         description: Bad request
 */
router.put('/:id', userPersonalizationController.updateUserPersonalization);
/**
 * @swagger
 * /user-personalization/{id}:
 *   delete:
 *     summary: Delete user personalization
 *     tags: [UserPersonalization]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user personalization ID
 *     responses:
 *       204:
 *         description: User personalization deleted successfully
 */
router.delete('/:id', userPersonalizationController.deleteUserPersonalization);
exports.default = router;
