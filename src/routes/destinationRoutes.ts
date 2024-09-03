import { Router } from "express";
import { registerDestination, getAllDestinations, updateDestination, deleteDestination } from "../controllers/destinationController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Destination
 *   description: Routes for destination manipulation
 */


/**
 * @swagger
 * /api/destinations:
 *   get:
 *     summary: Retrieve a list of destinations
 *     description: Get all the destinations available in the database, including their IDs, countries, and cities.
 *     tags:
 *       - Destination
 *     responses:
 *       200:
 *         description: List of destinations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 destinations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "2d88c34c-dc4e-40a3-b252-d47ae40848a0"
 *                       country:
 *                         type: string
 *                         example: "Espanha2"
 *                       city:
 *                         type: string
 *                         example: "Madrid4"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error searching destinations"
 */

router.get('/', getAllDestinations);

/**
 * @swagger
 * /api/destinations:
 *   post:
 *     summary: Create a new destination
 *     description: Creates a new destination in the database with the specified country and city.
 *     tags:
 *       - Destination
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               country:
 *                 type: string
 *                 description: ID of the country where the destination is located
 *                 example: "6be763f4-0ca8-49b9-8888-4e1fbde8b062"
 *               city:
 *                 type: string
 *                 description: Name of the city
 *                 example: "Cidade da Holanda"
 *     responses:
 *       201:
 *         description: Destination created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 destination:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "7dfc7b23-5c2f-4d83-8f5f-2c4e04eb3fc7"
 *                     country:
 *                       type: string
 *                       example: "6be763f4-0ca8-49b9-8888-4e1fbde8b062"
 *                     city:
 *                       type: string
 *                       example: "Cidade da Holanda"
 *                 message:
 *                   type: string
 *                   example: "Destination created successfully"
 *       400:
 *         description: Invalid input or error in creating destination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 destination:
 *                   type: "null"
 *                 error:
 *                   type: string
 *                   example: "Country ID is invalid"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error creating destination"
 */

router.post('/', registerDestination);

/**
 * @swagger
 * /api/destinations/{id}:
 *   put:
 *     summary: Update an existing destination
 *     description: Updates the details of an existing destination by its ID. You can update the country or city fields.
 *     tags:
 *       - Destination
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the destination to update
 *         example: "7dfc7b23-5c2f-4d83-8f5f-2c4e04eb3fc7"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               country:
 *                 type: string
 *                 description: ID of the new country for the destination
 *                 example: "6be763f4-0ca8-49b9-8888-4e1fbde8b062"
 *               city:
 *                 type: string
 *                 description: Name of the new city for the destination
 *                 example: "Nova Cidade"
 *     responses:
 *       200:
 *         description: Destination updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 destination:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "7dfc7b23-5c2f-4d83-8f5f-2c4e04eb3fc7"
 *                     country:
 *                       type: string
 *                       example: "6be763f4-0ca8-49b9-8888-4e1fbde8b062"
 *                     city:
 *                       type: string
 *                       example: "Nova Cidade"
 *                 message:
 *                   type: string
 *                   example: "Destination updated successfully"
 *       400:
 *         description: Invalid input or error in updating destination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 destination:
 *                   type: "null"
 *                 error:
 *                   type: string
 *                   example: "No fields provided for update"
 *       404:
 *         description: Destination not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 destination:
 *                   type: "null"
 *                 error:
 *                   type: string
 *                   example: "Destination not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error updating destination"
 */

router.put('/:id', updateDestination);

/**
 * @swagger
 * /api/destinations/{id}:
 *   delete:
 *     summary: Delete a destination
 *     description: Deletes a destination by its ID.
 *     tags:
 *       - Destination
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the destination to delete
 *         example: "7dfc7b23-5c2f-4d83-8f5f-2c4e04eb3fc7"
 *     responses:
 *       200:
 *         description: Destination deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 destination:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "7dfc7b23-5c2f-4d83-8f5f-2c4e04eb3fc7"
 *                     country:
 *                       type: string
 *                       example: "6be763f4-0ca8-49b9-8888-4e1fbde8b062"
 *                     city:
 *                       type: string
 *                       example: "Nova Cidade"
 *                 message:
 *                   type: string
 *                   example: "Destination deleted successfully"
 *       400:
 *         description: Invalid ID or error in deleting destination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 destination:
 *                   type: "null"
 *                 error:
 *                   type: string
 *                   example: "Destination ID is invalid"
 *       404:
 *         description: Destination not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 destination:
 *                   type: "null"
 *                 error:
 *                   type: string
 *                   example: "Destination not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error deleting destination"
 */


router.delete('/:id', deleteDestination);

export default router;