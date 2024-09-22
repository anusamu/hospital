const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Define the path to your hospitals.json file
const filePath = path.join(__dirname, 'hospitals.json');

// Function to read hospital data from the JSON file
const readHospitalsData = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Function to write hospital data back to the JSON file
const writeHospitalsData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};



// get operation
router.get("/:id",(req,res)=>{
  
           res.sendFile(path.join(__dirname,"","hospitals.json"))
         });

// POST operation - Add new hospital data
router.post('/add', (req, res) => {
  const newHospital = req.body;  // Extract new hospital data from request body
  if (!newHospital || Object.keys(newHospital).length === 0) {
    return res.status(400).send('Invalid data provided');
  }
  let hospitalsData = readHospitalsData(); // Read the current hospitals data
  hospitalsData.push(newHospital);// Push the new hospital data
  writeHospitalsData(hospitalsData);// Write the updated data back to the file
  res.status(201).send('New hospital data added successfully');// Respond with success message
});





// put operation
router.put('/edit/:id', (req, res) => {
    const hospitalId = parseInt(req.params.id); // Get the ID from the URL
    const updatedHospitalData = req.body; // Get the updated data from the request body
    let hospitalsData = readHospitalsData(); // Read the current hospitals data
    const hospitalIndex = hospitalsData.findIndex(hospital => hospital.id === hospitalId);// Find the hospital by ID
    if (hospitalIndex === -1) {
      return res.status(404).send('Hospital not found');// If the hospital with the given ID is not found
    }
    hospitalsData[hospitalIndex] = { ...hospitalsData[hospitalIndex], ...updatedHospitalData }; // Update the hospital record 
    writeHospitalsData(hospitalsData);// Write the updated data back to the file
    res.status(200).send('Hospital data updated successfully'); // Respond with success message
  });



//   deteltion operation

router.delete('/delete/:id', (req, res) => {
    const hospitalId = parseInt(req.params.id); // Get the ID from the URL
    let hospitalsData = readHospitalsData();// Read the current hospitals data
    const hospitalIndex = hospitalsData.findIndex(hospital => hospital.id === hospitalId); // Find the hospital by ID
    if (hospitalIndex === -1) {
      return res.status(404).send('Hospital not found');// If the hospital with the given ID is not found
    } 
    hospitalsData.splice(hospitalIndex, 1); // Remove the hospital from the array
    writeHospitalsData(hospitalsData); // Write the updated data back to the file
    res.status(200).send('Hospital deleted successfully');// Respond with success message
  });







module.exports = router;
