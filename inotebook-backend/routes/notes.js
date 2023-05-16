const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    let obj = {
        a:1,
        b:2,
        c:3
    }
    res.json(obj);
});

module.exports = router;