const { Pickup, User } = require('../models/database');

// @desc    Create a new pickup request (Customer)
exports.createPickup = async (req, res) => {
  const { scrapType, estimatedWeight, estimatedValue, pickupTime, address, latitude, longitude } = req.body;

  try {
    const pickup = await Pickup.create({
      customerId: req.user.id,
      scrapType,
      estimatedWeight,
      estimatedValue,
      pickupTime,
      address,
      latitude,
      longitude,
      status: 'Requested'
    });
    res.status(201).json(pickup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all pickups for logged in user (Customer or Collector)
exports.getMyPickups = async (req, res) => {
  try {
    let pickups;
    if (req.user.role === 'customer') {
      pickups = await Pickup.findAll({
        where: { customerId: req.user.id },
        include: [{ model: User, as: 'collector', attributes: ['name', 'phone'] }],
        order: [['createdAt', 'DESC']]
      });
    } else if (req.user.role === 'picker') {
      pickups = await Pickup.findAll({
        where: { collectorId: req.user.id },
        include: [{ model: User, as: 'customer', attributes: ['name', 'phone', 'address'] }],
        order: [['createdAt', 'DESC']]
      });
    }
    res.json(pickups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all available pickups (Collector Dashboard)
exports.getAvailablePickups = async (req, res) => {
  try {
    const pickups = await Pickup.findAll({
      where: { status: 'Requested' },
      include: [{ model: User, as: 'customer', attributes: ['name', 'address', 'latitude', 'longitude'] }],
      order: [['createdAt', 'ASC']]
    });
    res.json(pickups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Accept a pickup (Collector)
exports.acceptPickup = async (req, res) => {
  try {
    const pickup = await Pickup.findByPk(req.params.id);
    if (!pickup) return res.status(404).json({ message: 'Pickup not found' });
    
    if (pickup.status !== 'Requested') {
      return res.status(400).json({ message: 'Pickup is already assigned or completed' });
    }

    pickup.collectorId = req.user.id;
    pickup.status = 'Collector Assigned';
    await pickup.save();
    
    res.json(pickup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update pickup status (En Route => Completed)
exports.updatePickupStatus = async (req, res) => {
  const { status, finalPayment, actualWeight } = req.body;
  
  try {
    const pickup = await Pickup.findByPk(req.params.id);
    if (!pickup) return res.status(404).json({ message: 'Pickup not found' });
    
    // Check auth
    if (pickup.collectorId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this pickup' });
    }

    pickup.status = status || pickup.status;
    
    if (status === 'Pickup Completed') {
      pickup.finalPayment = finalPayment;
      pickup.actualWeight = actualWeight;
      
      // Update User Eco Stats (Customer)
      const customer = await User.findByPk(pickup.customerId);
      if (customer) {
        customer.totalRecycledKg += actualWeight;
        customer.earnings += finalPayment;
        await customer.save();
      }
      
      // Update Picker earnings
      const picker = await User.findByPk(req.user.id);
      if (picker) {
        picker.earnings += (finalPayment * 0.1); // Picker earns 10% commission config maybe? Let's just track flat earnings
        await picker.save();
      }
    }
    
    await pickup.save();
    res.json(pickup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
