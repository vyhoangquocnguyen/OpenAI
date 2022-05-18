import React, { useState, useEffect, useRef } from 'react';
import {v4 as uuidv4} from 'uuid'
import { Button, Form, Card, Container, Row, Col, FloatingLabel, ButtonGroup  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputList from './InputList';



const STORAGE_KEY = 'userData'

function TextForm() {
    const userInputRef = useRef();
    const [userData, setUserInputs] = useState(()=>{
        const savedData = localStorage.getItem(STORAGE_KEY);
        return savedData ? JSON.parse(savedData) : []
    })

    useEffect(()=>{
        const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY))
        if(storedData) 
        {  
            setUserInputs(storedData)}
    }, [])

    useEffect(() =>{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
    }, [ userData ])

    function clearResult(){
        localStorage.removeItem(STORAGE_KEY)
        
    }
   async function onFormSubmit(event) {
        const refInput = userInputRef.current.value
        if(refInput === '') return
        handleReponse(refInput)
        userInputRef.current.value= null
        event.preventDefault();
    }

  

    async function handleReponse(refInput){
        const { Configuration, OpenAIApi } = require("openai");
        
        
        const configuration = new Configuration({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const response = await openai.createCompletion("text-curie-001", {
            prompt: "Write a creative, professional ad for the following product to run on Instagram " + refInput,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            });
        setUserInputs(prevInput =>{
            return [...prevInput , {id: uuidv4() , input: refInput, resp: response.data.choices[0].text}]
        });
    }




  return (
    <> 
        <Container fluid ="sm true" className='my-4 py-5'>
            <Row className="d-flex justify-content-center">
                <Col>
                <Card>
                    <div></div>
                    <Card.Img varian="top"style={{maxHeight:'180px'}} src="https://images.pexels.com/photos/267401/pexels-photo-267401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" responsive />
                    <Card.Body>
                        <Card.Body className="d-flex">
                                <Card.Title className='fw-bold mt-1'>Product Ad Generator</Card.Title><br/>
                        </Card.Body>
                        <Card.Text className ='text-muted fst-italic fw-bold'>Your Results:</Card.Text>
                        <Form onSubmit={clearResult}>
                            <Card.Text className='mt-3 mb-4 pb-2'>
                                <Form.Text><InputList userInputsList = {userData}/></Form.Text>
                            </Card.Text>
                            <ButtonGroup className='float-end mt-2 pt-1'>
                                <Button variant="secondary" type="submit">Clear Results</Button>
                            </ButtonGroup>
                        </Form>
                    </Card.Body>
                    <Card.Footer className='border-0 py-3}'>
                    <Form onSubmit={onFormSubmit} >
                            <Form.Group className='flex-start'controlId="inputText" >
                                <FloatingLabel label="Insert a product you want to generate an ad for: ">
                                    <Form.Control 
                                    type="text"
                                    ref= {userInputRef}
                                    placeholder="Ad" 
                                    style={{ height: '100px' }}/>
                                </FloatingLabel>
                            <ButtonGroup className='float-end mt-2 pt-1'>
                                <Button variant="primary" type="submit">Submit</Button>
                                 {' '}
                                <Button variant="secondary" type="reset">Reset</Button>
                            </ButtonGroup>
                            </Form.Group>
                        </Form> 
                    </Card.Footer>
                </Card>
                </Col>  
            </Row>
        </Container>
    </>
  )
}

export default TextForm;