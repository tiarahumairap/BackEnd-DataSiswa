const express = require('express');
const router = express.Router();
const SiswaController = require('../controllers/SiswaController');
const { validationSiswaCreate, validateSiswaUpdate } = require('../middleware/validation');

router.get('/', SiswaController.getAll);
router.get('/:id', SiswaController.getById);
router.post('/', validationSiswaCreate, SiswaController.create);
router.put('/:id', validateSiswaUpdate, SiswaController.update);
router.delete('/:id', SiswaController.remove);

module.exports = router;
