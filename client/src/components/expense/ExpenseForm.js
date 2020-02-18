import React, { useEffect, useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Button } from 'react-bootstrap'
import { required, date } from 'redux-form-validators'
import { connect } from 'react-redux'

import OwnInput from '../OwnInput'
import OwnComboBox from '../OwnComboBox'
import DatePicker, { formatDates, normalizeDates } from '../OwnDatePicker'

import { insertExpense } from '../../redux/actions/expensesActions'
import { saveExpense } from '../../api/expense'

const ExpenseForm = ({ handleSubmit, pristine, submitting, insertExpense, categories, history }) => {
  const [categoriesList, setCategoriesList] = useState([])

  const sendToServer = ({ amount, category, date, description }) => {
    const { _id } = JSON.parse(localStorage.getItem('user'))
    saveExpense({ amount, category, description, date, owner: _id })
      .then((result) => {
        insertExpense(result)
        history.push('/expenses')
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    setCategoriesList(categories)
  }, [])

  if (!categoriesList) {
    return <div>Loading...</div>
  }

  return (
    <Form onSubmit={handleSubmit(sendToServer)}>
      <Form.Group controlId='formBasicAmount'>
        <Form.Label>Amount</Form.Label>
        <Field name='amount' component={OwnInput} type='text' placeholder='Amount' validate={[required()]} />
      </Form.Group>

      <Form.Group controlId='formBasicCategory'>
        <Form.Label>Category</Form.Label>
        <Field name='category' component={OwnComboBox} validate={[required()]} categories={categories} />
      </Form.Group>

      <Form.Group controlId='formBasicDescription'>
        <Form.Label>Description</Form.Label>
        <Field name='description' component={OwnInput} type='text' placeholder='Description' validate={[required()]} />
      </Form.Group>

      <Form.Group controlId='formBasicDate'>
        <Form.Label>Date</Form.Label>
        <Field
          name={'date'}
          component={DatePicker}
          placeholder='Date'
          parse={normalizeDates}
          format={formatDates}
          validate={[required(), date()]}
        />
      </Form.Group>

      <div>
        <Button variant={pristine ? 'danger' : 'success'} type='submit' disabled={submitting}>
          Submit
        </Button>
      </div>
    </Form>
  )
}

const UpdatedExpenseForm = reduxForm({
  form: 'simple',
})(ExpenseForm)

const mapStateToProps = (store) => {
  return {
    categories: store.categories.data,
  }
}

export default connect(mapStateToProps, {
  insertExpense,
})(UpdatedExpenseForm)
