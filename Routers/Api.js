const express = require('express');
const { f } = require('../Database/DatabaseSetup');
const router = express.Router();
const jwt = require('jsonwebtoken');

/** */

router.use((req,res,next) => {
    var decoded = jwt.decode(req.headers.authorization ? req.headers.authorization : "", {complete: true});
    if(decoded == null)return res.send({auth: 'access denied'}); else return next();
})

function OwnerCheck(req,res,next){
    var decoded = jwt.decode(req.headers.authorization ? req.headers.authorization : "", {complete: true});
    if(decoded.user.role === 'Owner'){
        next()
    }else{
        return res.send({auth: 'access denied'});
    }
}; 
/** User */

router.get('/users',OwnerCheck,(req,res,next) => {
    var decoded = jwt.decode(req.headers.authorization ? req.headers.authorization : "", {complete: true});
    
    f.serialize(() => {
        f.all('SELECT * FROM f LIMIT 50',function(err,rows){
            res.send(rows);
        });
    });
});

router.get('/users/:id',OwnerCheck,(req,res,next) => {
    f.serialize(() => {
        f.all('SELECT * FROM f WHERE userID = '+req.params.id,function(err,rows){
            res.send(rows[0]);
        });
    });
});

router.delete('/users/:id',(req,res,next) => {
    var decoded = jwt.decode(req.headers.authorization ? req.headers.authorization : "", {complete: true});
    if(decoded.user.role === 'Owner' || decoded.user.role === 'Admin');
    if(decoded.user.id !== req.params.id)return;

    f.serialize(() => {
        f.exec('DELET FROM f WHERE userID= '+req.params.id)
    });
});

/** Products */



module.exports = router;