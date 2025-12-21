const express = require('express');
const db = require('./src/database/db')

const app = express()
app.use(express.json())