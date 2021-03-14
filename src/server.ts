require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

const app = express();
const port = process.env.PORT || 8080;
  
app.use(bodyParser.json());

app.get("/health", (req, res, next) => {
  res.status(200).send("Hello!");
});

app.get("/filteredimage", async (req, res, next) => {
  await deleteLocalFiles();
  let { image_url } = req.query;
  let filteredImage = await filterImageFromURL(`${image_url}`)
  res.status(200).send(`${filteredImage}`);
});

app.delete("/filteredimage", async (req, res, next) => {
  await deleteLocalFiles();
  res.status(200).send(`Local Files Deleted`);
});

app.get( "/", async ( req, res ) => {
  res.send("try GET /filteredimage?image_url={{}}")
} );

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
