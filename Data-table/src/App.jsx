import React, { useState } from 'react'
import { Container, Table, Form } from "react-bootstrap";
import studentsData from "./StudentsData"

const App = () => {

    const [students] = useState(studentsData);

    const [studentsQuery, setStudentsQuery] = useState({
        search: "",
        filter: "",
    })

    const handleChange = (identifier, e) => {
        setStudentsQuery({
            ...studentsQuery,
            [identifier]: e.target.value
        })
    }

   
  const filteredList = students.filter((student) =>
    student.name.toLowerCase().includes(studentsQuery.search.toLowerCase())
  );

  const sortedList = [...filteredList].sort((a, b) => {
    if (studentsQuery.filter === "asc") return a.id - b.id;
    if (studentsQuery.filter === "desc") return b.id - a.id;
    return 0;
  });

    return (
        <Container className='mt-4'>
            <h2>Students Management System</h2>

            <Form className='d-flex gap-2 mb-3'>
                <Form.Control placeholder="Search for Students Name" value={studentsQuery.search} onChange={(e) => handleChange("search", e)} />
                <Form.Select value={studentsQuery.filter} onChange={(e) => handleChange("filter", e)}>
                    <option value="">Sort By ID</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </Form.Select>
            </Form>

            <Table striped bordered hover>
                <thead>
                    <tr className='table-dark'>
                        <th>#</th>
                        <th>NAME</th>
                        <th>GR-ID</th>
                        <th>COURSE</th>
                    </tr>   
                </thead>
                <tbody>
                    {sortedList.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.id}</td>
                            <td>{student.course}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default App
