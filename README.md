# globalpaq-app
Desarrollo de prueba para globalpaq

En este test se desarrollan ejemplos (Básicos) de consumo de API REST con NODEJS, Libreria Express.js (https://expressjs.com/es/) y JavaScript. Se utilizan los metodos GET, POST, PUT y DELETE para llevar a cabo un CRUD tomando la información desde un archivo sample.json que sirve como DB.

Las API´s son las siguientes:

# Obtener todos los usuarios

EndPoint (url): "api/users"
Método: GET
Datos de entrada: ninguno
Salida: json lista de usaurios "{}"

Fragmento de Código:

router.get('/', (req, res)=>{
    return res.setHeader('Content-Type', 'application/json').json(usrJson);
});

####################################################################################################################################################################

# Registro de nuevo usuario

EndPoint(url): "api/users/register"
Método: POST
Datos de entrada: json {"username":"name", "password":"password", "role":"role"}
Salida: json {"message":"message", "status":"status"}

fragmento de código:

 router.post('/register', (req, res)=>{
     const {username, password, role} = req.body;
     if(username&&password&&role){
        const id = usrJson.length+1;
        const newUser = {...req.body, id};
        usrJson.push(newUser);
        return res.setHeader('Content-Type', 'application/json').json(usrJson);
     }else{
        return res.setHeader('Content-Type', 'application/json').json({"message":"Estimado usuario, los datos ingresados no son correctos. Favor de Validar.", "status":"400"});
     }
    
 });
 
 #####################################################################################################################################################################
 
 # Actualización de Usuario
 
 EndPoint(url): "api/users/update/{id}"
 Método: PUT
 Datos de entrada: PATHPARAM (id -> identificador), json {"username":"name", "password":"password", "role":"role"}
 Salida: json {"id":"iduser","username":"name", "password":"password", "role":"role"}
 
 Fragmento de código: 
router.put('/update/:id', (req, res)=>{
     const {id} = req.params;
     const {username, password, role} = req.body;

     if(username&&password&&role){
         _.each(usrJson, (user, index)=>{
            if(user.id === id){
                user.username = username;
                user.password = password;
                user.role = role;
                return res.status(200).setHeader('Content-Type', 'application/json').send(user);
            }else{
               return res.setHeader('Content-Type', 'application/json').send({"message":"Datos no actualizados. Usuario incorrecto o no existe.", "status":"400"});
            }
        });
     }else{
        return res.setHeader('Content-Type', 'application/json').json({"message":"Falta información.", "status":"400"});
     }

 });

#######################################################################################################################################################################

# Borrado de usuario

 EndPoint(url): "api/users/remove/{id}"
 Método: DELETE
 Datos de entrada: PATHPARAM (id -> identificador de usuario)
 Salida: json {"message":"message", "status":"status"}
 
 Fragmento de código:

 router.delete('/remove/:id', (req, res)=>{
    const {id} = req.params;
    _.each(usrJson, (user, index)=>{
        if(user.id === id){
            usrJson.splice(index, 1);
            return res.setHeader('Content-Type', 'application/json').json({"message":"El usuario ha sido eliminado.", "status":"200"});
        }else{
            return res.setHeader('Content-Type', 'application/json').json({"message":"El usuario no puede ser eliminado.", "status":"400"});
        }
    });

 });
