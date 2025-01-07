"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Routes for reviews manipulation
 */
/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Retrieve all reviews
 *     description: Retrieve a list of all reviews with detailed information.
 *     tags:
 *       - Reviews
 *     responses:
 *       200:
 *         description: A list of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reviews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "182aa6ea-bfac-4f26-9a53-48e02a50242c"
 *                       name:
 *                         type: string
 *                         example: "John"
 *                       email:
 *                         type: string
 *                         example: "johndoe@example.com"
 *                       comment:
 *                         type: string
 *                         example: "Amazing tour! The guide was very knowledgeable, and the locations were breathtaking."
 *                       services:
 *                         type: integer
 *                         example: 1
 *                       locations:
 *                         type: integer
 *                         example: 1
 *                       amenities:
 *                         type: integer
 *                         example: 4
 *                       prices:
 *                         type: integer
 *                         example: 4
 *                       food:
 *                         type: integer
 *                         example: 5
 *                       room_comfort_quality:
 *                         type: integer
 *                         example: 4
 *                       average:
 *                         type: number
 *                         format: float
 *                         example: 4.5
 *                       date_review:
 *                         type: string
 *                         format: date
 *                         example: "2024-08-23"
 *                       user_id:
 *                         type: string
 *                         example: "dfafd"
 *                       tour_id:
 *                         type: string
 *                         example: "10416760-046a-4e7a-861e-3b3dca139344"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error retrieving reviews"
 */
router.post('/', reviewController_1.registerReview);
/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     description: Submit a new review for a tour in the system.
 *     tags:
 *       - Reviews
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               comment:
 *                 type: string
 *                 example: "Amazing tour! The guide was very knowledgeable, and the locations were breathtaking."
 *               services:
 *                 type: integer
 *                 example: 1
 *               locations:
 *                 type: integer
 *                 example: 1
 *               amenities:
 *                 type: integer
 *                 example: 1
 *               prices:
 *                 type: integer
 *                 example: 1
 *               food:
 *                 type: integer
 *                 example: 1
 *               room_comfort_quality:
 *                 type: integer
 *                 example: 1
 *               average:
 *                 type: number
 *                 format: float
 *                 example: 1.0
 *               date_review:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-23"
 *               user_id:
 *                 type: string
 *                 example: "diegoid"
 *               tour_id:
 *                 type: string
 *                 example: "1f40d7f3-5a87-43b1-805b-91f003c2f529"
 *             required:
 *               - name
 *               - email
 *               - comment
 *               - services
 *               - locations
 *               - amenities
 *               - prices
 *               - food
 *               - room_comfort_quality
 *               - average
 *               - date_review
 *               - user_id
 *               - tour_id
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 review:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "182aa6ea-bfac-4f26-9a53-48e02a50242c"
 *                     name:
 *                       type: string
 *                       example: "John"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     comment:
 *                       type: string
 *                       example: "Amazing tour! The guide was very knowledgeable, and the locations were breathtaking."
 *                     services:
 *                       type: integer
 *                       example: 1
 *                     locations:
 *                       type: integer
 *                       example: 1
 *                     amenities:
 *                       type: integer
 *                       example: 1
 *                     prices:
 *                       type: integer
 *                       example: 1
 *                     food:
 *                       type: integer
 *                       example: 1
 *                     room_comfort_quality:
 *                       type: integer
 *                       example: 1
 *                     average:
 *                       type: number
 *                       format: float
 *                       example: 1.0
 *                     date_review:
 *                       type: string
 *                       format: date
 *                       example: "2024-08-23"
 *                     user_id:
 *                       type: string
 *                       example: "diegoid"
 *                     tour_id:
 *                       type: string
 *                       example: "1f40d7f3-5a87-43b1-805b-91f003c2f529"
 *                 message:
 *                   type: string
 *                   example: "Review created successfully"
 *       400:
 *         description: Bad request, invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error creating review"
 */
router.get('/', reviewController_1.getAllReviews);
/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update an existing review
 *     description: Update the details of an existing review by its ID.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the review to be updated.
 *         schema:
 *           type: string
 *           example: "182aa6ea-bfac-4f26-9a53-48e02a50242c"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               comment:
 *                 type: string
 *                 example: "Amazing tour! The guide was very knowledgeable, and the locations were breathtaking."
 *               services:
 *                 type: integer
 *                 example: 1
 *               locations:
 *                 type: integer
 *                 example: 1
 *               amenities:
 *                 type: integer
 *                 example: 1
 *               prices:
 *                 type: integer
 *                 example: 1
 *               food:
 *                 type: integer
 *                 example: 1
 *               room_comfort_quality:
 *                 type: integer
 *                 example: 1
 *               average:
 *                 type: number
 *                 format: float
 *                 example: 1.0
 *               date_review:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-23"
 *               user_id:
 *                 type: string
 *                 example: "diegoid"
 *               tour_id:
 *                 type: string
 *                 example: "1f40d7f3-5a87-43b1-805b-91f003c2f529"
 *             required:
 *               - name
 *               - email
 *               - comment
 *               - services
 *               - locations
 *               - amenities
 *               - prices
 *               - food
 *               - room_comfort_quality
 *               - average
 *               - date_review
 *               - user_id
 *               - tour_id
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 review:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "182aa6ea-bfac-4f26-9a53-48e02a50242c"
 *                     name:
 *                       type: string
 *                       example: "John"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     comment:
 *                       type: string
 *                       example: "Amazing tour! The guide was very knowledgeable, and the locations were breathtaking."
 *                     services:
 *                       type: integer
 *                       example: 1
 *                     locations:
 *                       type: integer
 *                       example: 1
 *                     amenities:
 *                       type: integer
 *                       example: 1
 *                     prices:
 *                       type: integer
 *                       example: 1
 *                     food:
 *                       type: integer
 *                       example: 1
 *                     room_comfort_quality:
 *                       type: integer
 *                       example: 1
 *                     average:
 *                       type: number
 *                       format: float
 *                       example: 1.0
 *                     date_review:
 *                       type: string
 *                       format: date
 *                       example: "2024-08-23"
 *                     user_id:
 *                       type: string
 *                       example: "diegoid"
 *                     tour_id:
 *                       type: string
 *                       example: "1f40d7f3-5a87-43b1-805b-91f003c2f529"
 *                 message:
 *                   type: string
 *                   example: "Review updated successfully"
 *       400:
 *         description: Bad request, invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data"
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Review with the given ID not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error updating review"
 */
router.put('/:id', reviewController_1.updateReview);
/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete an existing review
 *     description: Delete a review by its ID.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the review to be deleted.
 *         schema:
 *           type: string
 *           example: "182aa6ea-bfac-4f26-9a53-48e02a50242c"
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 review:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "182aa6ea-bfac-4f26-9a53-48e02a50242c"
 *                     name:
 *                       type: string
 *                       example: "John"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     comment:
 *                       type: string
 *                       example: "Amazing tour! The guide was very knowledgeable, and the locations were breathtaking."
 *                     services:
 *                       type: integer
 *                       example: 1
 *                     locations:
 *                       type: integer
 *                       example: 1
 *                     amenities:
 *                       type: integer
 *                       example: 1
 *                     prices:
 *                       type: integer
 *                       example: 1
 *                     food:
 *                       type: integer
 *                       example: 1
 *                     room_comfort_quality:
 *                       type: integer
 *                       example: 1
 *                     average:
 *                       type: number
 *                       format: float
 *                       example: 1.0
 *                     date_review:
 *                       type: string
 *                       format: date
 *                       example: "2024-08-23"
 *                     user_id:
 *                       type: string
 *                       example: "diegoid"
 *                     tour_id:
 *                       type: string
 *                       example: "1f40d7f3-5a87-43b1-805b-91f003c2f529"
 *                 message:
 *                   type: string
 *                   example: "Review deleted successfully"
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Review with the given ID not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error deleting review"
 */
router.delete('/:id', reviewController_1.deleteReview);
/**
 * @swagger
 * /api/reviews/avg/{id}:
 *   get:
 *     summary: Retrieve average ratings for a specific tour
 *     description: Retrieve average ratings for services, prices, locations, food, amenities, and room comfort quality for a specific tour identified by its ID.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the tour for which to retrieve average ratings.
 *         schema:
 *           type: string
 *           example: "10416760-046a-4e7a-861e-3b3dca139344"
 *     responses:
 *       200:
 *         description: Successfully retrieved average ratings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 review:
 *                   type: object
 *                   properties:
 *                     avg_services:
 *                       type: number
 *                       format: float
 *                       example: 1.4
 *                     avg_prices:
 *                       type: number
 *                       format: float
 *                       example: 3.8
 *                     avg_locations:
 *                       type: number
 *                       format: float
 *                       example: 1.2
 *                     avg_food:
 *                       type: number
 *                       format: float
 *                       example: 4.6
 *                     avg_amenities:
 *                       type: number
 *                       format: float
 *                       example: 3.8
 *                     avg_room_comfort_quality:
 *                       type: number
 *                       format: float
 *                       example: 4
 *                     avg_overall:
 *                       type: number
 *                       format: float
 *                       example: 4.12
 *       404:
 *         description: Tour not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Tour with the given ID not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error retrieving average ratings"
 */
router.get('/avg/:id', reviewController_1.getAverageReviewById);
/**
 * @swagger
 * /api/reviews/tour/{id}:
 *   get:
 *     summary: Retrieve reviews for a specific tour
 *     description: Retrieve all reviews for a specific tour identified by its ID, including details like review date, reviewer's name, average rating, comment, and the count of reviews by the user.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the tour for which to retrieve reviews.
 *         schema:
 *           type: string
 *           example: "10416760-046a-4e7a-861e-3b3dca139344"
 *     responses:
 *       200:
 *         description: Successfully retrieved reviews for the specified tour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reviews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date_review:
 *                         type: string
 *                         format: date
 *                         example: "2024-08-23"
 *                       name:
 *                         type: string
 *                         example: "John"
 *                       average_rating:
 *                         type: number
 *                         format: float
 *                         example: 4.5
 *                       comment:
 *                         type: string
 *                         example: "Amazing tour! The guide was very knowledgeable, and the locations were breathtaking."
 *                       review_count_by_user:
 *                         type: integer
 *                         example: 2
 *       404:
 *         description: Tour not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Tour with the given ID not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error retrieving reviews"
 */
router.get('/tour/:id', reviewController_1.getReviewsByTour);
exports.default = router;
