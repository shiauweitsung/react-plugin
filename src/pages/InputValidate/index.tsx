import * as React from 'react'
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  ErrorMessage
} from 'formik'
import * as Yup from 'yup'

interface MyFormValues {
  firstName: string
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(10, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required')
})

// 如果要寫成componets
// <Field /> 要將field參數傳入component,並且在component內 onChange={()=> { field.onChange(event) }}
// onBlur={(event)=>{ field.onBlur(event) }}

export default function FormikForm () {
  const initialValues: MyFormValues = { firstName: '' }
  return (
    <div>
      <h1>My Example</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          console.log({ values, actions })
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="firstName" placeholder="First Name" />
            {errors.firstName && touched.firstName
              ? (
              <div>{errors.firstName}</div>
                )
              : null}
            <ErrorMessage name="firstName">
              {(msg) => <div>{msg}</div>}
            </ErrorMessage>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
