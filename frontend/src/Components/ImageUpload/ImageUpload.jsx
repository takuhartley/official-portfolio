import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const ImageUpload = () => {
  const [images, setImages] = useState([]);

  const onDrop = async (acceptedFiles) => {
    // Send the image to the server for processing
    const res = await axios.post('/api/image-upload', acceptedFiles[0]);
    setImages([...images, res.data]);
  };

  return (
    <Dropzone onDrop={onDrop} accept="image/*">
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      )}
    </Dropzone>
  );
};

export default ImageUpload;
Express.js route:

Copy code
const express = require('express');
const router = express.Router();
const multer = require('multer

