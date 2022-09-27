import {
  Formik,
  // FormikHelpers,
  // FormikProps,
  Form,
  Field,
  // FieldProps,
  ErrorMessage,
  useFormik
} from 'formik'
import * as Yup from 'yup'
import React from 'react'

interface MyFormValues {
  firstName: string
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(10, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required')
})

export default function FormikForm () {
  const initialValues: MyFormValues = { firstName: '' }
  // const formiks = useFormik({
  //   initialValues: {
  //     firstName: '',
  //     lastName: '',
  //     email: ''
  //   },
  //   onSubmit: values => {
  //     alert(JSON.stringify(values, null, 2))
  //   }
  // })
  // console.log(formiks, 'formiks')
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
