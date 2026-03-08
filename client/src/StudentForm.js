import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentForm.css";

const API = "http://localhost:5000";

function StudentForm() {

  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    course: "",
    email: "",
    phone: "",
    address: "",
    enrollmentNumber: "",
    department: "",
    year: ""
  });

  const [editId, setEditId] = useState(null);

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API}/students`);
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update student
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API}/students/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post(`${API}/students`, form);
      }

      setForm({
        name: "",
        age: "",
        gender: "",
        course: "",
        email: "",
        phone: "",
        address: "",
        enrollmentNumber: "",
        department: "",
        year: ""
      });

      fetchStudents();

    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  // Edit student
  const handleEdit = (student) => {
    setForm(student);
    setEditId(student._id);
  };

  // Delete student
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API}/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="container">

      <h2 className="dashboard-title">🎓 Student Management System</h2>

      <div className="form-section">
        <form onSubmit={handleSubmit}>

          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />
          <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} />
          <input name="course" placeholder="Course" value={form.course} onChange={handleChange} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
          <input name="year" placeholder="Year" value={form.year} onChange={handleChange} />

          <button className="submit-btn" type="submit">
            {editId ? "Update Student" : "Add Student"}
          </button>

        </form>
      </div>

      <div className="student-grid">

        {students.map((student) => (

          <div key={student._id} className="student-card">

            <h4>{student.name}</h4>

            <p><b>Course:</b> {student.course}</p>
            <p><b>Email:</b> {student.email}</p>
            <p><b>Phone:</b> {student.phone}</p>

            <button
              className="edit-btn"
              onClick={() => handleEdit(student)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteStudent(student._id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default StudentForm;