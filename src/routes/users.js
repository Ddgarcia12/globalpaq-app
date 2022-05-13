const {Router} = require('express');
const router = Router();
const usrJson = require("./sample.json");
//routes
router.get('/', (req, res)=>{
    res.json(usrJson);
});

module.exports = router;