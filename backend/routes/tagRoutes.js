const express = require('express');
const router = express.Router();
const {
    createTag,
    getAllTags,
    getTagById,
    getTagByName,
    deleteTag
} = require('../controllers/tagController');

// POST request to create a tag (if not existing)
router.post('/create', async (req, res) => {
    const { tagName } = req.body;
    try {
      const tag = await createTag(tagName);  // Create or fetch the tag
      res.status(201).json(tag);  // Return the created or found tag
    } catch (error) {
      res.status(500).json({ message: 'Error creating tag', error });
    }
});
  
// GET request to fetch all tags
router.get('/', getAllTags);

// GET request to fetch a tag by its ID
router.get('/:tagId', getTagById);

// GET request to fetch a tag by its name
router.get('/name/:tagName', getTagByName);

//DELETE request to delete a tag
router.delete('/:tagId', deleteTag);

module.exports = router;