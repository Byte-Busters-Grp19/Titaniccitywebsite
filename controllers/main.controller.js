const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Home
router.get('/', (req, res) => {
  console.log(req.session.user);
  return res.render('index', {
    user: req.session.user
  });
});

// Menu
router.get('/menu', (req, res) => {
  return res.render('menu');
})

// Contact
router.route('/contact')
.get((req, res) => {
  res.render('contact', {
    error: null,
    success: null
  })
})
.post(async (req, res) => {
  const {email, name, message} = req.body;

  try {
    const contact = await prisma.contact.create({
        data: {
            email,
            name,
            message
        }
    })

    res.render( 'contact',{
        error: null,
        success: 'Message delivered successfully.'
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;