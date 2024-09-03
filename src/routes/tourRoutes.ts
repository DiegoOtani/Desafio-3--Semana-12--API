import { Router } from "express";
import { 
  registerTour, 
  getAllTours, 
  updateTour, 
  deleteTour, 
  getAllToursByPage,
  findTourById 
} from "../controllers/tourController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tours
 *   description: Routes for tour manipulation
 */

/**
 * @swagger
 * /api/tours:
 *   get:
 *     summary: Retrieve all tours
 *     description: Retrieve a list of all available tours.
 *     tags:
 *       - Tours
 *     responses:
 *       200:
 *         description: A list of tours
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tours:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       tour_id:
 *                         type: string
 *                         example: "1f40d7f3-5a87-43b1-805b-91f003c2f529"
 *                       tour_name:
 *                         type: string
 *                         example: "Radical Adventure 2"
 *                       city:
 *                         type: string
 *                         example: "CP city"
 *                       country_name:
 *                         type: string
 *                         example: "Brasil"
 *                       initial_date:
 *                         type: string
 *                         format: date
 *                         example: "2024-09-01"
 *                       end_date:
 *                         type: string
 *                         format: date
 *                         example: "2024-09-07"
 *                       duration:
 *                         type: integer
 *                         example: 7
 *                       price_per_person:
 *                         type: number
 *                         example: 200
 *                       peoples:
 *                         type: integer
 *                         example: 20
 *                       max_people:
 *                         type: integer
 *                         example: 25
 *                       min_age:
 *                         type: integer
 *                         example: 18
 *                       overview:
 *                         type: string
 *                         example: "An exciting adventure in the heart of New York."
 *                       location:
 *                         type: string
 *                         example: "Central Park"
 *                       ulrImg:
 *                         type: string
 *                         example: "/urlImage"
 *                       types:
 *                         type: string
 *                         example: "Radical, Camping"
 *                       review_count:
 *                         type: integer
 *                         example: 10
 *                       average_review:
 *                         type: number
 *                         example: 1.7
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error searching tours"
 */


router.get('/', getAllTours);

/**
 * @swagger
 * /api/tours:
 *   post:
 *     summary: Register a new tour
 *     description: Register a new tour with the provided details.
 *     tags:
 *       - Tours
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Kids Adventure"
 *               city:
 *                 type: string
 *                 example: "a9e48edb-41e2-4efe-bf17-95e18c35be52"
 *               initial_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-01"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-07"
 *               duration:
 *                 type: integer
 *                 example: 7
 *               price_per_person:
 *                 type: number
 *                 example: 500
 *               peoples:
 *                 type: integer
 *                 example: 20
 *               max_people:
 *                 type: integer
 *                 example: 25
 *               min_age:
 *                 type: integer
 *                 example: 18
 *               overview:
 *                 type: string
 *                 example: "An exciting adventure in the heart of New York."
 *               location:
 *                 type: string
 *                 example: "-22.9068, -43.1729"
 *               ulrImg:
 *                 type: string
 *                 example: "www.image.com/image"
 *               types:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "66c8ad60-eceb-423b-9961-6913a1e4049f"
 *                 example: ["66c8ad60-eceb-423b-9961-6913a1e4049f", "25a68878-3a5e-4bb3-8bf1-f92627818350"]
 *             required:
 *               - name
 *               - city
 *               - initial_date
 *               - end_date
 *               - duration
 *               - price_per_person
 *               - peoples
 *               - max_people
 *               - min_age
 *               - overview
 *               - location
 *               - ulrImg
 *               - types
 *     responses:
 *       201:
 *         description: Tour registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tour:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1f40d7f3-5a87-43b1-805b-91f003c2f529"
 *                     name:
 *                       type: string
 *                       example: "Kids Adventure"
 *                     city:
 *                       type: string
 *                       example: "a9e48edb-41e2-4efe-bf17-95e18c35be52"
 *                     initial_date:
 *                       type: string
 *                       format: date
 *                       example: "2024-08-01"
 *                     end_date:
 *                       type: string
 *                       format: date
 *                       example: "2024-09-07"
 *                     duration:
 *                       type: integer
 *                       example: 7
 *                     price_per_person:
 *                       type: number
 *                       example: 500
 *                     peoples:
 *                       type: integer
 *                       example: 20
 *                     max_people:
 *                       type: integer
 *                       example: 25
 *                     min_age:
 *                       type: integer
 *                       example: 18
 *                     overview:
 *                       type: string
 *                       example: "An exciting adventure in the heart of New York."
 *                     location:
 *                       type: string
 *                       example: "Central Park"
 *                     ulrImg:
 *                       type: string
 *                       example: "www.image.com/image"
 *                     types:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["66c8ad60-eceb-423b-9961-6913a1e4049f", "25a68878-3a5e-4bb3-8bf1-f92627818350"]
 *                 message:
 *                   type: string
 *                   example: "Tour registered successfully"
 *       400:
 *         description: Bad request, invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tour:
 *                   type: null
 *                 error:
 *                   type: string
 *                   example: "Invalid tour data"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error creating tour"
 */

router.post('/', registerTour);

/**
 * @swagger
 * /api/tours/{id}:
 *   put:
 *     summary: Update an existing tour
 *     description: Update an existing tour with the provided details. Only the fields included in the request will be updated.
 *     tags:
 *       - Tours
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the tour to update
 *         schema:
 *           type: string
 *           example: "1f40d7f3-5a87-43b1-805b-91f003c2f529"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Kids Adventure"
 *               city:
 *                 type: string
 *                 example: "a9e48edb-41e2-4efe-bf17-95e18c35be52"
 *               initial_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-01"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-07"
 *               duration:
 *                 type: integer
 *                 example: 7
 *               price_per_person:
 *                 type: number
 *                 example: 500
 *               peoples:
 *                 type: integer
 *                 example: 20
 *               max_people:
 *                 type: integer
 *                 example: 25
 *               min_age:
 *                 type: integer
 *                 example: 18
 *               overview:
 *                 type: string
 *                 example: "An exciting adventure in the heart of New York."
 *               location:
 *                 type: string
 *                 example: "Central Park"
 *               ulrImg:
 *                 type: string
 *                 example: "www.image.com/image"
 *               types:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "66c8ad60-eceb-423b-9961-6913a1e4049f"
 *                 example: ["66c8ad60-eceb-423b-9961-6913a1e4049f", "25a68878-3a5e-4bb3-8bf1-f92627818350"]
 *             additionalProperties: false
 *     responses:
 *       200:
 *         description: Tour updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tour:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1f40d7f3-5a87-43b1-805b-91f003c2f529"
 *                     name:
 *                       type: string
 *                       example: "Kids Adventure"
 *                     city:
 *                       type: string
 *                       example: "a9e48edb-41e2-4efe-bf17-95e18c35be52"
 *                     initial_date:
 *                       type: string
 *                       format: date
 *                       example: "2024-08-01"
 *                     end_date:
 *                       type: string
 *                       format: date
 *                       example: "2024-09-07"
 *                     duration:
 *                       type: integer
 *                       example: 7
 *                     price_per_person:
 *                       type: number
 *                       example: 500
 *                     peoples:
 *                       type: integer
 *                       example: 20
 *                     max_people:
 *                       type: integer
 *                       example: 25
 *                     min_age:
 *                       type: integer
 *                       example: 18
 *                     overview:
 *                       type: string
 *                       example: "An exciting adventure in the heart of New York."
 *                     location:
 *                       type: string
 *                       example: "Central Park"
 *                     ulrImg:
 *                       type: string
 *                       example: "www.image.com/image"
 *                     types:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["66c8ad60-eceb-423b-9961-6913a1e4049f", "25a68878-3a5e-4bb3-8bf1-f92627818350"]
 *                 message:
 *                   type: string
 *                   example: "Tour updated successfully"
 *       400:
 *         description: Bad request, invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tour:
 *                   type: null
 *                 error:
 *                   type: string
 *                   example: "Invalid tour data"
 *       404:
 *         description: Tour not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tour:
 *                   type: null
 *                 error:
 *                   type: string
 *                   example: "Tour not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error updating tour"
 */

router.put('/:id', updateTour);

/**
 * @swagger
 * /api/tours/{id}:
 *   delete:
 *     summary: Delete a tour
 *     description: Delete a specific tour by its ID.
 *     tags:
 *       - Tours
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the tour to delete
 *         schema:
 *           type: string
 *           example: "1f40d7f3-5a87-43b1-805b-91f003c2f529"
 *     responses:
 *       200:
 *         description: Tour deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tour deleted successfully"
 *       404:
 *         description: Tour not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Tour not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error deleting tour"
 */

router.delete('/:id', deleteTour);

/**
 * @swagger
 * /api/tours/page:
 *   get:
 *     summary: Retrieve tours by page
 *     description: Retrieve a paginated list of tours with optional filters and sorting.
 *     tags:
 *       - Tours
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number to retrieve
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: The number of tours per page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: categories
 *         in: query
 *         description: Comma-separated list of categories to filter by
 *         required: false
 *         schema:
 *           type: string
 *           example: "Adventure,Camping"
 *       - name: destinations
 *         in: query
 *         description: Comma-separated list of destinations to filter by
 *         required: false
 *         schema:
 *           type: string
 *           example: "Brasil"
 *       - name: rating
 *         in: query
 *         description: Minimum rating to filter by
 *         required: false
 *         schema:
 *           type: number
 *           format: float
 *           example: 4.5
 *       - name: search
 *         in: query
 *         description: Search term to filter tours by name or description
 *         required: false
 *         schema:
 *           type: string
 *           example: "Adventure"
 *       - name: price
 *         in: query
 *         description: Minimum price to filter by
 *         required: false
 *         schema:
 *           type: number
 *           format: float
 *           example: 100
 *       - name: date
 *         in: query
 *         description: Date to filter tours by
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-08-01"
 *       - name: sortBy
 *         in: query
 *         description: Field to sort the tours by
 *         required: false
 *         schema:
 *           type: string
 *           example: "price"
 *     responses:
 *       200:
 *         description: A paginated list of tours
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tours:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       tour_id:
 *                         type: string
 *                         example: "32d2d039-da26-4da4-b0bb-cc45b260c6fd"
 *                       tour_name:
 *                         type: string
 *                         example: "Kids Adventure"
 *                       city:
 *                         type: string
 *                         example: "CP city"
 *                       country_name:
 *                         type: string
 *                         example: "Brasil"
 *                       initial_date:
 *                         type: string
 *                         format: date
 *                         example: "2024-08-01"
 *                       end_date:
 *                         type: string
 *                         format: date
 *                         example: "2024-09-07"
 *                       duration:
 *                         type: integer
 *                         example: 7
 *                       price_per_person:
 *                         type: number
 *                         format: float
 *                         example: 500
 *                       peoples:
 *                         type: integer
 *                         example: 20
 *                       max_people:
 *                         type: integer
 *                         example: 25
 *                       min_age:
 *                         type: integer
 *                         example: 18
 *                       overview:
 *                         type: string
 *                         example: "An exciting adventure in the heart of New York."
 *                       location:
 *                         type: string
 *                         example: "Central Park"
 *                       ulrImg:
 *                         type: string
 *                         example: "www.image.com/image"
 *                       types:
 *                         type: string
 *                         example: "Camping"
 *                       review_count:
 *                         type: integer
 *                         example: 0
 *                       average_review:
 *                         type: number
 *                         format: float
 *                         nullable: true
 *                         example: null
 *                 total:
 *                   type: integer
 *                   example: 100
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error retrieving tours"
 */

router.get('/page', getAllToursByPage);

/**
 * @swagger
 * /api/tours/{id}:
 *   get:
 *     summary: Retrieve a tour by ID
 *     description: Retrieve detailed information about a specific tour by its ID.
 *     tags:
 *       - Tours
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the tour to retrieve
 *         required: true
 *         schema:
 *           type: string
 *           example: "32d2d039-da26-4da4-b0bb-cc45b260c6fd"
 *     responses:
 *       200:
 *         description: Details of the tour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tour:
 *                   type: object
 *                   properties:
 *                     tour_id:
 *                       type: string
 *                       example: "32d2d039-da26-4da4-b0bb-cc45b260c6fd"
 *                     tour_name:
 *                       type: string
 *                       example: "Kids Adventure"
 *                     city:
 *                       type: string
 *                       example: "CP city"
 *                     country_name:
 *                       type: string
 *                       example: "Brasil"
 *                     initial_date:
 *                       type: string
 *                       format: date
 *                       example: "2024-08-01"
 *                     end_date:
 *                       type: string
 *                       format: date
 *                       example: "2024-09-07"
 *                     duration:
 *                       type: integer
 *                       example: 7
 *                     price_per_person:
 *                       type: number
 *                       format: float
 *                       example: 500
 *                     peoples:
 *                       type: integer
 *                       example: 20
 *                     max_people:
 *                       type: integer
 *                       example: 25
 *                     min_age:
 *                       type: integer
 *                       example: 18
 *                     overview:
 *                       type: string
 *                       example: "An exciting adventure in the heart of New York."
 *                     location:
 *                       type: string
 *                       example: "-22.9068, -43.1729"
 *                     ulrImg:
 *                       type: string
 *                       example: "www.image.com/image"
 *                     types:
 *                       type: string
 *                       example: "Radical,Camping"
 *                     review_count:
 *                       type: integer
 *                       example: 0
 *                     average_review:
 *                       type: number
 *                       format: float
 *                       nullable: true
 *                       example: null
 *       404:
 *         description: Tour not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Tour not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error retrieving tour details"
 */

router.get('/:id', findTourById);

export default router;