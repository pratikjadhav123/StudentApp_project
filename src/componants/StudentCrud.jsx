import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentCrud() {
  const [id, setId] = useState('');
  const [stname, setName] = useState('');
  const [course, setCourse] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    try {
      const result = await axios.get('https://localhost:7172/api/Student/GetStudent');
      setStudents(result.data);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post('https://localhost:7172/api/Student/AddStudent', {
        stname: stname,
        course: course,
      });
      alert('Student Registration Successfully');
      setName('');
      setCourse('');
      Load();
    } catch (err) {
      console.error('Error registering student:', err);
      alert('Failed to register student');
    }
  }

  async function editStudent(student) {
    setName(student.stname);
    setCourse(student.course);
    setId(student.id);
  }

  async function DeleteStudent(idToDelete) {
    try {
      await axios.delete(`https://localhost:7172/api/Student/DeleteStudent/${idToDelete}`);
      alert('Student deleted successfully');
      setName('');
      setCourse('');
      setId('');
      Load();
    } catch (err) {
      console.error('Error deleting student:', err);
      alert('Failed to delete student');
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(`https://localhost:7172/api/Student/UpdateStudent/${id}`, {
        id: id,
        stname: stname,
        course: course,
      });
      alert('Student details updated');
      setName('');
      setCourse('');
      setId('');
      Load();
    } catch (err) {
      console.error('Error updating student:', err);
      alert('Failed to update student');
    }
  }

  return (
    <div>
      <h1>Student Details</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="stname"
              value={stname}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter student name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="course"
              value={course}
              onChange={(event) => setCourse(event.target.value)}
              placeholder="Enter course"
            />
          </div>
          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button className="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br />
      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Student Id</th>
            <th scope="col">Student Name</th>
            <th scope="col">Course</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.stname}</td>
              <td>{student.course}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editStudent(student)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => DeleteStudent(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentCrud;
