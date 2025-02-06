const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

const DEADLINE = new Date('2025-02-7');

app.get('/api/deadline', (req, res) => {
    const now = new Date();
    const differenceMs = DEADLINE.getTime() - now.getTime();
    
    // Calculate seconds left, return 0 if deadline has passed
    const secondsLeft = Math.ceil(Math.max(differenceMs / 1000, 0));
    
    res.json({ secondsLeft: secondsLeft });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
