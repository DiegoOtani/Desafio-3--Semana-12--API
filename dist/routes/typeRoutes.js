"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeController_1 = require("../controllers/typeController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Types
 *   description: Routes for type manipulation
 */
/**
 * @swagger
 * /api/types:
 *   get:
 *     summary: Retrieve all types
 *     description: Retrieve a list of all types of tours.
 *     tags:
 *       - Types
 *     responses:
 *       200:
 *         description: A list of types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 types:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type_id:
 *                         type: string
 *                         example: "223d4023-070f-42dd-b09f-9ae7f834a021"
 *                       type_name:
 *                         type: string
 *                         example: "Adventure"
 *                       tour_count:
 *                         type: integer
 *                         example: 19
 *                       min_price:
 *                         type: number
 *                         nullable: true
 *                         example: 200
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error searching type"
 */
router.get('/', typeController_1.getAllTypes);
/**
 * @swagger
 * /api/types:
 *   post:
 *     summary: Register a new type
 *     description: Register a new type of tour in the system.
 *     tags:
 *       - Types
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Camping"
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Type registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "66c8ad60-eceb-423b-9961-6913a1e4049f"
 *                     name:
 *                       type: string
 *                       example: "Camping"
 *                 message:
 *                   type: string
 *                   example: "Type registered successfully"
 *       400:
 *         description: Bad request, invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: null
 *                 error:
 *                   type: string
 *                   example: "Type with the same name already exists"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error creating type"
 */
router.post('/', typeController_1.registerType);
/**
 * @swagger
 * /api/types/{id}:
 *   put:
 *     summary: Update an existing type
 *     description: Update the details of an existing type by its ID.
 *     tags:
 *       - Types
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the type to be updated.
 *         schema:
 *           type: string
 *           example: "66c8ad60-eceb-423b-9961-6913a1e4049f"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Camping"
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Type updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "66c8ad60-eceb-423b-9961-6913a1e4049f"
 *                     name:
 *                       type: string
 *                       example: "Camping"
 *                 message:
 *                   type: string
 *                   example: "Type updated successfully"
 *       400:
 *         description: Bad request, invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: null
 *                 error:
 *                   type: string
 *                   example: "Type with the given ID not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error updating type"
 */
router.put('/:id', typeController_1.updateType);
/**
 * @swagger
 * /api/types/{id}:
 *   delete:
 *     summary: Delete an existing type
 *     description: Delete a type by its ID.
 *     tags:
 *       - Types
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the type to be deleted.
 *         schema:
 *           type: string
 *           example: "66c8ad60-eceb-423b-9961-6913a1e4049f"
 *     responses:
 *       200:
 *         description: Type deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "66c8ad60-eceb-423b-9961-6913a1e4049f"
 *                     name:
 *                       type: string
 *                       example: "Camping"
 *                 message:
 *                   type: string
 *                   example: "Type deleted successfully"
 *       400:
 *         description: Bad request, type not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: null
 *                 error:
 *                   type: string
 *                   example: "Type with the given ID not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error deleting type"
 */
router.delete('/:id', typeController_1.deleteType);
exports.default = router;
