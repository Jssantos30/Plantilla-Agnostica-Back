import mongoose from "mongoose";
import dotenv from 'dotenv';
import express,{ Request, Response, NextFunction } from "express";
import * as routes from './routes'

dotenv.config();
console.clear()
const port = process.env.PORT || 9000;
const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    //res.header('Access-Control-Allow-Origin', 'http://192.168.0.173:8080'); //Con este damos acceso a la api unicamente desde el dominio que se ponga.
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, x_token ,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

app.use(express.json());

//URL----------- 

app.use("/api", routes.users)
app.use("/api", routes.zone)
app.use("/api", routes.record)

//--------------

app.get('/', (req, res) => {
    res.send("API funcionado en sincronia");
})

mongoose.connect(`${process.env.MONGODB_URI}`).then(()=>{
    console.log("MongoDB connected")
}).catch((error)=>{
    console.log("ERROR");
    console.log(error);
});

app.listen(port, ()=> console.log("API lisening in the port: ", port));

