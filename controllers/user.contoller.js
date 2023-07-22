const express = require('express');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

// Login
router.route('/login')
.get((req, res) => {
  return res.render('login', {
    error: null,
    success: null
  });
})
.post(async (req, res) => {
  const {username, password} = req.body;

  try {
    // Check if username exists;
    const userExists = await prisma.user.findUnique({
        where: {
            username
        }
    });

    // If username does not exist
    if (!userExists) {
        return res.render('login', {
            error: 'User does not exist',
            success: null
        })
    }

    // If username exists and password is incorrect
    if (userExists && !await bcrypt.compare(password, userExists.password)) {
        return res.render('login', {
            error: 'Password is incorrect',
            success: null
        })
    } 
    // If username exists and password is correct
    else if (userExists && await bcrypt.compare(password, userExists.password)) {
        req.session.user = username;
        return res.redirect('/');
    }
  } catch (error) {
    console.log(error)
  }
});

// Sign up
router.route('/signup')
.get((req, res) => {
  return res.render('signup', {
    error: null,
    success: null
  })
})
.post(async (req, res) => {
  const {username, email, password, confirmPassword} = req.body;

  try {
    // Check if username exists
    const userExists = await prisma.user.findUnique({
        where: {
            username
        }
    });

    // If username exists
    if (userExists) {
        return res.render('signup', {
            error: 'Username is already taken.',
            success: null
        })
    }

    if (password !== confirmPassword) {
        return res.render('signup', {
            error: 'Passwords do not match.',
            success: null
        });
    } else {
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: await bcrypt.hash(password, 12)
            }
        })

        return res.render('login', {
            error: null,
            success: 'User account created successfully. Proceed to log in.'
        })
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;