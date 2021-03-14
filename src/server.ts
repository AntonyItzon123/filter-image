require('dotenv').config();
import express , { Request, Response } from "express";
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.get( "/", async ( req, res ) => {
  
  res.send("try GET /filteredimage?image_url={{}}")

} );

app.get("/health", (req : Request, res : Response) => {
  res.status(200).send("Hello!");
});

app.get("/filteredimage", async (req : Request, res : Response) => {

  try{

    await deleteLocalFiles();
    let { image_url } = req.query;
    let filteredImage = await filterImageFromURL(`${image_url}`)
    console.log(filteredImage)
    res.status(200).sendFile(filteredImage);

  }catch(ex){

    res.status(422).send(ex)

  }

});

app.delete("/filteredimage", async (req : Request, res : Response) => {
  
  await deleteLocalFiles();
  res.status(200).send(`Local Files Deleted`);

});

app.listen(port, () => {
  
  return console.log(`server is listening on ${port}`);

});
