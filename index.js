const express = require('express');
const app = express();

const mongoose = require('mongoose');


const bodyParser = require('body-parser');
app.use(bodyParser.json())               
app.use(bodyParser.urlencoded({ extended: true }));

const Student = require('./modules/Student'); 

app.use(express.static('public')) 

app.get('/', (req, res) => {
    // defaults to index.html
  });

app.get('/getStudents', async (req, res) => {
    try {
        const students = await Student.find({});
        //console.log(students);
        res.send(students);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error getting students');
    }
});
  
app.get('/getStudentsByMajor', async (req, res) => {
  const major = req.query.major;

  try {
      let students;
      if (major === 'all') {
          students = await Student.find({});
      } else {
          students = await Student.find({ major: major });
      }
      res.send(students);
  } catch (err) {
      console.log(err);
      res.status(500).send('Error getting students');
  }
});



app.post('/updateStudent', async (req, res) => {
    const sid = req.body.sid;
    const major = req.body.major;
    const gpaPoints = req.body.gpa_points;
    const hrsAttempted = req.body.hrs_attempted;
  
    try {
      const updatedStudent = await Student.findOneAndUpdate(
        { sid: sid },
        { major: major, gpa_points: gpaPoints, hrs_attempted: hrsAttempted },
        { new: true }
      );
      res.send(updatedStudent);
      //console.log(updatedStudent);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error updating student');
    }
  });

  app.delete('/deleteStudent/:sid', async (req, res) => {
    const sid = req.params.sid;

    try {
        const deletedStudent = await Student.findOneAndDelete({ sid: sid });
        res.send(deletedStudent);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error deleting student');
    }
});

app.post('/addStudentRecord', async (req, res) => {
  const newStudentData = req.body;
  
  try {
      const existingStudent = await Student.findOne({ sid: newStudentData.sid });

      if (existingStudent) {
          res.status(409).send('Student ID already exists.');
      } else {
          const newStudent = new Student(newStudentData);
          await newStudent.save();
          res.status(201).send('Student added successfully.');
      }
  } catch (error) {
      console.log(error);
      res.status(500).send('Error adding student.');
  }
});



  



app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
