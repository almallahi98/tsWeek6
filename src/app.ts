import e from "express";
import express  from "express";
import {dataCont} from './dataTypes'
const app = express();

let dataSs:dataCont[]=[];
app.use(express.json);

app.get('./',(req,res)=>{
    return res.json(dataSs);
});
app.post('./',(req,res)=>{
    const newData= req.body as dataCont;
    newData.id= Math.floor(Math.random() * 100000000000000);
    dataSs.push(newData);
    return res.json({
        message:'added to Db',
    })
});
app.put('./user/:id',(req,res)=>{
    const updata=req.body as dataCont;
    const id =Number(req.params.id);
    const dataUpdate= dataSs.filter((data)=>{
          return data.id !== id;
    })
    dataUpdate.push(updata);
    dataSs=dataUpdate;
    return res.json({
        msg:'Db updated'
    })
}) 
app.delete('./user/:id',(req,res)=>{
    const id=Number(req.params.id);
    const updateData=dataSs.filter(elm=>{
            return elm.id !== id;
    })
    dataSs=updateData;
    return res.json({
        msg:`user with id ${id} is deleted !!`
    })
})

app.listen(5001,()=>{
    console.log('server is up and running...')
})