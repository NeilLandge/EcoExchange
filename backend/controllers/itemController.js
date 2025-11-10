const Item = require('../models/Item');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary - moved inside functions to ensure env is loaded
const configureCloudinary = () => {
  if (!cloudinary.config().cloud_name) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
  }
};

// @desc    Get all items
// @route   GET /api/items
// @access  Public
exports.getAllItems = async (req, res) => {
  try {
    const { status, search, condition, location, page = 1, limit = 10 } = req.query;
    
    let query = {};

    if (status && status !== '') {
      query.status = status;
    }

    if (search && search.trim() !== '') {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (condition && condition !== '') {
      query.condition = condition;
    }

    if (location && location.trim() !== '') {
      query.location = { $regex: location, $options: 'i' };
    }

    const skip = (page - 1) * limit;
    
    const items = await Item.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Item.countDocuments(query);

    res.status(200).json({
      success: true,
      count: items.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: items
    });
  } catch (error) {
    console.error('Error in getAllItems:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching items',
      error: error.message
    });
  }
};

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Public
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching item',
      error: error.message
    });
  }
};

// @desc    Create new item
// @route   POST /api/items
// @access  Public
exports.createItem = async (req, res) => {
  try {
    let { name, image, condition, location, description } = req.body;

    // Validate required fields
    if (!name || !image || !condition || !location || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
        missing: {
          name: !name,
          image: !image,
          condition: !condition,
          location: !location,
          description: !description
        }
      });
    }

    // Check if image is base64, upload to Cloudinary
    if (image && image.startsWith('data:image')) {
      try {
        configureCloudinary();
        const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: 'ecoexchange',
          resource_type: 'image'
        });
        image = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        // Continue with base64 for development
      }
    }

    const item = await Item.create({
      name,
      image,
      condition,
      location,
      description
    });

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: item
    });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating item',
      error: error.message
    });
  }
};

// @desc    Update item status
// @route   PUT /api/items/:id
// @access  Public
exports.updateItemStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['available', 'exchanged'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be "available" or "exchanged"'
      });
    }

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Item status updated successfully',
      data: item
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating item',
      error: error.message
    });
  }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Public
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting item',
      error: error.message
    });
  }
};
