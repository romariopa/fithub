import React, { useState } from 'react';
import './App.css';
import { Button, Form, Container, Dropdown,DropdownProps } from 'semantic-ui-react';
import data from './data.json';

interface Option {
  key: string
  text: string
  value: string
}

interface Field {
  name: string
  label: string
  type: string
  options?: Array<Option>
}

function App() {
  let nameForm = {};
  data.questions.forEach((question) => {
    question.fields.forEach((field) => {
      Object.assign(nameForm, { [field.name]: "" });
    });
  });
  const [dataForm, setDataForm] = useState(nameForm);
  function _handleChangeDropdown(e: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
    setDataForm({ ...dataForm, [data.name]: data.value })
  }
  function _handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value })
  }

  const createFields = (question: { fields: Field[] }) => {
    return question.fields.map((field, i) => {
      if (field.type === "dropdown") {
        return <Dropdown
          key={i}
          name={field.name}
          placeholder='Seleccione un pais'
          search
          selection
          options={field.options}
          onChange={_handleChangeDropdown}
        />
      }
      return <Form.Field key={i}>
        <label>{field.label}</label>
        <input name={field.name} placeholder={field.label} onChange={_handleChange} />
      </Form.Field>
    })
  };

  const createForm = () => {
    return data.questions.map((question, i) => {
      return <div key={i}>
        <h3>{question.title}</h3>
        {createFields(question)}
      </div>
    });
  };

  const _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(dataForm);
  };

  return (
    <Container>
      <h1>Dinamic form</h1>
      <Form onSubmit={_handleSubmit}>
        {createForm()}
        <Button type='submit'>Submit</Button>
      </Form>
    </Container>
  );
}

export default App;
