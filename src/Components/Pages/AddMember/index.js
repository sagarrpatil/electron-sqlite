import React, { useRef, useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Box,
  MenuItem,
  Typography,
  Grid,
} from '@mui/material';

import { Buffer } from 'buffer';



export default function MemberForm() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [lastId, setLastId] = useState(null);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero for single digits
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }; 
  let defaultInputs = {
    name: "",
    birthDate: "",
    gender: "",
    weight: "",
    height: "",
    phoneNumber: "",
    email: "",
    membershipStartDate: formatDate(new Date()), // Same for other dates
    billDate: formatDate(new Date()),
    idProof: null, 
    bloodGroup: "NA",
    address: "",
  }
  let bloods = ["NA", "A positive (A+)",
  "A negative (A-)",
  "B positive (B+)",
  "B negative (B-)",
  "AB positive (AB+)",
  "AB negative (AB-)",
  "O positive (O+)",
  "O negative (O-)" ]

  const [formData, setFormData] = useState(defaultInputs);
  useEffect(() => {
    const fetchLastId = async () => {
      try {
        // Assuming the IPC method fetches the last inserted member ID
        const result = await window.electronAPI.getLastMemberId(); 
        setLastId(result);
      } catch (error) {
        console.error('Error fetching last member ID:', error);
      }
    };

    fetchLastId();
  }, [formData]); 

  useEffect(() => {
    if (isCameraOpen) {
      startWebcam();
    }
    return () => {
      stopWebcam();
    };
  }, [isCameraOpen]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
      setIsCameraOpen(false);
      stopWebcam();
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const convertBase64ToBlob = (base64) => {
    const binaryString = window.atob(base64.split(',')[1]); // Remove data URL prefix
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
  
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
  
    return Buffer.from(bytes); // Convert to Buffer
  };

  const handleSubmit = async () => {
    // Convert captured image to Buffer if it exists
    const capturedImageBuffer = capturedImage ? convertBase64ToBlob(capturedImage) : null;
  
    const formDataWithImage = {
      ...formData,
      capturedImage: capturedImageBuffer, // Add the captured image as Buffer
    };
  
    try {
      // Call the addNewMember function exposed in preload.js
      const newUser = await window.electronAPI.addNewMember(formDataWithImage);
      setFormData(defaultInputs)// Corrected 'result' to 'newUser'
      setCapturedImage(null);
      setIsCameraOpen(false);
      stopWebcam();
      alert('Member Added successfully');
    } catch (err) {
      console.error('Error adding member:', err);
      // Handle error (you can show a message to the user if needed)
    }
  };

  return (
    <Box sx={{ maxWidth: "100%", mx: 'auto', mt: 3 }}>
      <Typography variant="h6" gutterBottom sx={{textAlign: "center"}}>
        New Member Registration :{lastId + 1}
      </Typography>
      <br/>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                label="Bill Date"
                type="date"
                name="billDate"
                fullWidth
                InputLabelProps={{ shrink: true }}
                // error={!formData.billDate}
                helperText={!formData.billDate && "Required"}
                value={formData.billDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Member Name"
                name="name"
                fullWidth
                // error={!formData.name}
                helperText={!formData.name && "Required"}
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Date of Birth"
                type="date"
                name="birthDate"
                fullWidth
                InputLabelProps={{ shrink: true }}
                // error={!formData.birthDate}
                helperText={!formData.birthDate && "Required"}
                value={formData.birthDate}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                select
                label="Gender"
                name="gender"
                fullWidth
                // error={!formData.gender}
                helperText={!formData.gender && "Required"}
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                fullWidth
                // error={!formData.phoneNumber}
                helperText={!formData.phoneNumber && "Required"}
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Weight (kg)"
                name="weight"
                type="number"
                fullWidth
                // error={!formData.weight}
                helperText={!formData.weight && "Required"}
                value={formData.weight}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Height (cm)"
                name="height"
                type="number"
                fullWidth
                // error={!formData.height}
                helperText={!formData.height && "Required"}
                value={formData.height}
                onChange={handleChange}
              />
            </Grid>

      

            <Grid item xs={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                // error={!formData.email}
                helperText={!formData.email && "Required"}
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Membership Start Date"
                type="date"
                name="membershipStartDate"
                fullWidth
                InputLabelProps={{ shrink: true }}
                // error={!formData.membershipStartDate}
                helperText={!formData.membershipStartDate && "Required"}
                value={formData.membershipStartDate}
                onChange={handleChange}
              />
            </Grid>


            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                type="address"
                fullWidth
                rows={2}
                multiline
             
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="Blood Group"
                name="bloodGroup"
                fullWidth
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                {bloods.map(val =><MenuItem value={val}>{val}</MenuItem>)}
              
              </TextField>
            </Grid>
           

            <Grid item xs={12}>
              <Button variant="contained" color="success" onClick={handleSubmit} fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Box>
            {capturedImage ? (
              <Grid item xs={12}>
                <Typography>Captured Image:</Typography>
                <img
                  src={capturedImage}
                  alt="Captured"
                  style={{ width: '100%', maxWidth: 400 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setCapturedImage(null)}
                >
                  Clear Photo
                </Button>
              </Grid>
            ) : isCameraOpen ? (
              <>
                <video ref={videoRef} autoPlay style={{ width: '100%', maxWidth: 400 }} />
                <br />
                <Button variant="contained" color="primary" onClick={capturePhoto}>
                  Capture Photo
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsCameraOpen(false)}
                  sx={{ ml: 1 }}
                >
                  Close Webcam
                </Button>
              </>
            ) : (
              <Button variant="contained" color="primary" onClick={() => {setIsCameraOpen(true); } }>
                Open Webcam
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Box>
  );
}
