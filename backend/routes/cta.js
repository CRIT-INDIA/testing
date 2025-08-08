const express = require('express');
const router = express.Router();
const Cta = require('../models/Cta');

// Input validation middleware
const validateCtaInput = (req, res, next) => {
  const { name, email, phone, service } = req.body;
  
  if (!name || !email || !phone || !service) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields',
      required: ['name', 'email', 'phone', 'service']
    });
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }
  
  next();
};

// POST - Submit CTA form
router.post('/submit', validateCtaInput, async (req, res) => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 9);
  
  const log = (message, data = {}) => {
    console.log(`[${new Date().toISOString()}] [${requestId}] ${message}`, data);
  };
  
  log('CTA form submission started', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  
  try {
    const {
      name,
      email,
      company = '',
      phone,
      countryCode = '+91', // Default to India
      service,
      message = ''
    } = req.body;
    
    log('Processing CTA submission', {
      email,
      service,
      hasCompany: !!company,
      hasMessage: !!message
    });

    // Create new CTA entry
    const cta = new Cta({
      name,
      email: email.toLowerCase().trim(),
      company: company.trim(),
      phone: phone.trim(),
      countryCode: countryCode.trim(),
      service,
      message: message.trim(),
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      referrer: req.get('referer')
    });

    // Save to database with timeout
    const savePromise = cta.save();
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database operation timed out')), 10000)
    );
    
    const savedCta = await Promise.race([savePromise, timeoutPromise]);
    
    const responseTime = Date.now() - startTime;
    log('CTA submission successful', {
      ctaId: savedCta._id,
      responseTime: `${responseTime}ms`
    });

    res.status(201).json({
      success: true,
      message: 'Consultation request submitted successfully!',
      requestId,
      data: {
        id: savedCta._id,
        name: savedCta.name,
        email: savedCta.email,
        service: savedCta.service
      },
      meta: {
        responseTime: `${responseTime}ms`
      }
    });

  } catch (error) {
    const errorType = error.name || 'UnknownError';
    const errorMessage = error.message || 'Unknown error occurred';
    const responseTime = Date.now() - startTime;
    
    log('CTA submission failed', {
      error: errorMessage,
      type: errorType,
      responseTime: `${responseTime}ms`,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
    
    // Handle specific error types
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        requestId,
        errors,
        meta: { responseTime: `${responseTime}ms` }
      });
    }
    
    if (error.message === 'Database operation timed out') {
      return res.status(504).json({
        success: false,
        requestId,
        message: 'Request timeout. Please try again later.',
        meta: { responseTime: `${responseTime}ms` }
      });
    }
    
    // Generic error response
    res.status(500).json({
      success: false,
      requestId,
      message: 'An unexpected error occurred. Please try again later.',
      ...(process.env.NODE_ENV === 'development' && { error: errorMessage }),
      meta: { responseTime: `${responseTime}ms` }
    });
  }
});

// GET - Get all CTA submissions (admin)
router.get('/all', async (req, res) => {
  try {
    const ctaSubmissions = await Cta.find().sort({ submittedAt: -1 });
    res.json({
      success: true,
      data: ctaSubmissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching CTA submissions'
    });
  }
});

// PUT - Update CTA status (admin)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const cta = await Cta.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!cta) {
      return res.status(404).json({
        success: false,
        message: 'CTA submission not found'
      });
    }

    res.json({
      success: true,
      data: cta
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating CTA status'
    });
  }
});

module.exports = router; 