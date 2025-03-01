//Contains logic for implementing tag requests
/**
 * This includes:
 * Creating a new tag (POST)
 * Getting all tags or a specific tag by its id or name (GET)
 * Updating its global popularity count PATCH
 * Deleting a tag (DELETE)
 */

const Tag = require('../models/tag');

//Create a new tag (if it doesn't exist)
const createTag = async (tagName) => {
    try {
        let tag = await Tag.findOne({ name: tagName});
        if (!tag) {
            tag = new Tag({
                name: tagName,
                popularityCount: 0,
            })
            await tag.save();
        }
        return tag;
    } catch (error) {
        throw new Error('Error creating tag');
    }
}

//Get all tags
const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({message: 'Error fetching tags', error});
    }
}

//Get a specific tag by its ID
const getTagById = async (req, res) => {
    try{
        const tag = await Tag.findById(req.params.tagId);
        if (!tag) return res.status(404).json({message: 'Tag not found'});
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({message: 'Error fetching tag', error});
    }
}

//Get a specific tag by its name
const getTagByName = async (req, res) => {
    try{
        const tag = await Tag.findOne({name: req.params.tagName});
        if (!tag) return res.status(404).json({message: 'Tag not found'});
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({message: 'Error fetching tag', error});
    }
}

//Update popularity count for a tag (this would be used when users vote on tags)
const updateTagPopularity = async (tagId, vote) => {
    try {
        await Tag.findByIdAndUpdate(tagId, {$inc: {popularityCount: vote}});
    } catch (error) {
        throw new Error('Error updating popularity count');
    }
}

//Delete a tag
const deleteTag = async (req, res) => {
    try{
        const { tagId } = req.params;
        const tag = await Tag.findById(tagId);
        if (!tag) return res.status(400).json({message: 'Tag not found'});
        await tag.remove();
        res.status(204).send()
    } catch (error) {
        res.status(500).json({message: 'Error deleting tag', error});
    }
}

module.exports = {
    createTag,
    getAllTags,
    getTagById,
    getTagByName,
    updateTagPopularity,
    deleteTag
}