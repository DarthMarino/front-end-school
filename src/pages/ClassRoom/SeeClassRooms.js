import React, { Component } from 'react';
import { Card, Form } from 'react-bootstrap';


export const SeeClassRooms = () => {
    const classrooms = [
        {
            id: 0,
            name: 'Lengua Española',
            description: 'Este es el grupo 6 exposición final',
            border: 'primary',
        },
        {
            id: 1,
            name: 'Matemáticas',
            description: 'Profesora Jazmin Matos de 8vo A',
            border: 'success'
        },
        {
            id: 2,
            name: 'Ciencias Sociales',
            description: 'Grupo de la materia de 6to grado',
            border: 'danger'
        },
    ];
    return (
      <form>
            <h1>Ver aulas</h1>
            <hr />
            <h3>Yo soy...</h3>
            
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="radio" label="Docente" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="radio" label="Estudiante" />
            </Form.Group>
            
            {
                classrooms.map(classroom => {
                    return (
                        <Card border={classroom.border} style={{ width: '18rem' }}>
                            <Card.Header key= { classroom.id }>
                                {classroom.name}
                            </Card.Header>
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">{classroom.description}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </form>
    )
        
}