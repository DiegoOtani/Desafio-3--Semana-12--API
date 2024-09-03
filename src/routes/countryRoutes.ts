import { Router } from "express";
import { registerCountry, getAllCountries, updateCountry, deleteCountry, getAllCountriesByCont } from "../controllers/countryController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Country
 *   description: Routes for countries manipulation
 */

/**
 * @swagger
 * /api/country:
 *   get:
 *     summary: Get all countries
 *     description: Retrieve a list of all countries.
 *     tags:
 *      - Country
 *     responses:
 *       200:
 *         description: A list of countries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 countries:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "d4541ddc-62c7-4645-bc8c-37913964cc0d"
 *                       name:
 *                         type: string
 *                         example: "Spain"
 *                       continent:
 *                         type: string
 *                         example: "Europe"
 *                       urlImg:
 *                         type: string
 *                         format: uri
 *                         example: "https://example.com/image.jpg"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error searching countries"
 */

router.get('/', getAllCountries);

/**
 * @swagger
 * /api/country/cont:
 *   get:
 *     summary: Get all countries by continent
 *     description: Retrieve a list of countries grouped by continent.
 *     tags:
 *       - Country
 *     responses:
 *       200:
 *         description: A list of countries grouped by continent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 countries:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       continent:
 *                         type: string
 *                         example: "Europe"
 *                       countries:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "d4541ddc-62c7-4645-bc8c-37913964cc0d"
 *                             name:
 *                               type: string
 *                               example: "Spain"
 *                             urlImg:
 *                               type: string
 *                               format: uri
 *                               example: "https://example.com/image.jpg"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error searching countries by continent"
 */

router.get('/cont', getAllCountriesByCont);

/**
 * @swagger
 * /api/country:
 *   post:
 *     summary: Register a new country
 *     description: Create a new country with the provided details.
 *     tags:
 *       - Country
 *     requestBody:
 *       description: Country object to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - continent
 *               - urlImg
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Chile"
 *               continent:
 *                 type: string
 *                 example: "American"
 *               urlImg:
 *                 type: string
 *                 format: uri
 *                 example: "https://s2-casavogue.glbimg.com/pGduDbiKGCTguNBLTf-ua5lktFA=/0x0:2121x1414/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_d72fd4bf0af74c0c89d27a5a226dbbf8/internal_photos/bs/2023/R/y/EoOHxaQ62cwUyG1EyD9g/06-as-paisagens-naturais-mais-lindas-do-brasil-fernando-de-noronha2-min.jpg"
 *     responses:
 *       201:
 *         description: Country created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 country:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "6be763f4-0ca8-49b9-8888-4e1fbde8b062"
 *                     name:
 *                       type: string
 *                       example: "Chile"
 *                     continent:
 *                       type: string
 *                       example: "American"
 *                     urlImg:
 *                       type: string
 *                       format: uri
 *                       example: "https://s2-casavogue.glbimg.com/pGduDbiKGCTguNBLTf-ua5lktFA=/0x0:2121x1414/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_d72fd4bf0af74c0c89d27a5a226dbbf8/internal_photos/bs/2023/R/y/EoOHxaQ62cwUyG1EyD9g/06-as-paisagens-naturais-mais-lindas-do-brasil-fernando-de-noronha2-min.jpg"
 *                 message:
 *                   type: string
 *                   example: "Country registered successfully"
 *       400:
 *         description: Bad request, invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid country data"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error creating country"
 */

router.post('/', registerCountry);

/**
 * @swagger
 * /api/country/{id}:
 *   put:
 *     summary: Update an existing country
 *     description: Update details of an existing country identified by the provided ID. You can update the country’s name or image URL.
 *     tags:
 *       - Country
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the country to update
 *         schema:
 *           type: string
 *           example: "6be763f4-0ca8-49b9-8888-4e1fbde8b062"
 *     requestBody:
 *       description: Country object with fields to be updated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Chile"
 *               urlImg:
 *                 type: string
 *                 format: uri
 *                 example: "https://s2-casavogue.glbimg.com/pGduDbiKGCTguNBLTf-ua5lktFA=/0x0:2121x1414/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_d72fd4bf0af74c0c89d27a5a226dbbf8/internal_photos/bs/2023/R/y/EoOHxaQ62cwUyG1EyD9g/06-as-paisagens-naturais-mais-lindas-do-brasil-fernando-de-noronha2-min.jpg"
 *             required: []
 *     responses:
 *       200:
 *         description: Country updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 country:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "6be763f4-0ca8-49b9-8888-4e1fbde8b062"
 *                     name:
 *                       type: string
 *                       example: "Chile"
 *                     continent:
 *                       type: string
 *                       example: "American"
 *                     urlImg:
 *                       type: string
 *                       format: uri
 *                       example: "https://s2-casavogue.glbimg.com/pGduDbiKGCTguNBLTf-ua5lktFA=/0x0:2121x1414/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_d72fd4bf0af74c0c89d27a5a226dbbf8/internal_photos/bs/2023/R/y/EoOHxaQ62cwUyG1EyD9g/06-as-paisagens-naturais-mais-lindas-do-brasil-fernando-de-noronha2-min.jpg"
 *                 message:
 *                   type: string
 *                   example: "Country updated successfully"
 *       400:
 *         description: Bad request, invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid country data"
 *       404:
 *         description: Country not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Country not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error updating country"
 */

router.put('/:id', updateCountry);

/**
 * @swagger
 * /api/country/{id}:
 *   delete:
 *     summary: Delete a country
 *     description: Delete an existing country identified by the provided ID.
 *     tags:
 *       - Country
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the country to delete
 *         schema:
 *           type: string
 *           example: "6be763f4-0ca8-49b9-8888-4e1fbde8b062"
 *     responses:
 *       200:
 *         description: Country deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Country deleted successfully"
 *       404:
 *         description: Country not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Country not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error deleting country"
 */

router.delete('/:id', deleteCountry);

export default router;