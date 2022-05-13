const {Router} = require('express');
const router = Router();
const usrJson = require("./sample.json");
const _ = require('underscore');

//routes
router.get('/', (req, res)=>{
    res.json(usrJson);
});

 router.post('/register', (req, res)=>{
     const {username, password, role} = req.body;
     if(username&&password&&role){
        const id = usrJson.length+1;
        const newUser = {...req.body, id};
        usrJson.push(newUser);
        res.json(usrJson);
     }else{
         res.json({"message":"Estimado usuario, los datos ingresados no son correctos. Favor de Validar.", "status":"400"});
     }
    
 });

 router.put('/update/:id', (req, res)=>{
     const {id} = req.params;
     const {username, password, role} = req.body;

     if(username&&password&&role){
         _.each(usrJson, (user, index)=>{
            if(user.id === id){
                user.username = username;
                user.password = password;
                user.role = role;
                res.status(200).setHeader('Content-Type', 'application/json').send({"message":"Datos actualizados correctamente.", "status":"200", "data":usrJson[index]});
            }else{
                res.setHeader('Content-Type', 'application/json').send({"message":"Datos no actualizados. Usuario incorrecto o no existe.", "status":"400"});
            }
        });
     }else{
        res.json({"message":"Falta información.", "status":"400"});
     }

 });

 router.delete('/remove/:id', (req, res)=>{
    const {id} = req.params;
    _.each(usrJson, (user, index)=>{
        if(user.id === id){
            usrJson.splice(index, 1);
            res.setHeader('Content-Type', 'application/json');
            res.json({"message":"El usuario ha sido eliminado.", "status":"200"});
        }else{
            res.json({"message":"El usuario no puede ser eliminado.", "status":"400"});
        }
    });

 });

module.exports = router;