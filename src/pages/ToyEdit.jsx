import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { toyService } from "../services/toys.service.js";
import { saveToy } from "../store/actions/toy.action.js";
import { showSuccessMsg } from "../services/event-bus.service.js";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const EditSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    price: Yup.number()
        .min(1, 'to low!')
        .max(500, 'Too high!')
        .required('Required'),

});

export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, settoyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const labels = toyService.getToyLabels()
    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => settoyToEdit(toy))
            .catch(err => console.log('Had issues in toy details', err))
    }
    function handleChange({ target }) {
        let { value, type, name: field } = target
        console.log(value, type, field)
        switch (type) {
            case 'number':
                value = value === "" ? "" : +value
                break;
            case 'checkbox':
                value = (value === 'checked')
        }
        settoyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    function handleLabelChange({ target }, setFieldValue) {
        const value = target.value;


        setFieldValue("labels", prevLabels => {
            const newLabels = prevLabels.includes(value)
                ? prevLabels.filter(label => label !== value)
                : [...prevLabels, value];
            debugger

            return newLabels;
        });
    }

    function onSaveToy(values) {
        
        saveToy(values).then(() => {
            showSuccessMsg('saved toy succsefuly')
            navigate('/toys')
        }
        )
    }
    console.log(toyToEdit)
    return (
        <>
            <section className="toy-edit">
                <h2 className="title">Toy edit</h2>
                <Formik enableReinitialize={true} initialValues={{ ...toyToEdit }} validationSchema={EditSchema} onSubmit={values => onSaveToy(values)}>
                    {({ errors, touched, setFieldValue, values }) => (
                       
                        <Form>
                            <div>
                                {console.log(values)}
                                <label htmlFor="name">name:</label>
                                <Field className="name" type="text" name="name" id="name" />
                                {errors.name && touched.name ? (
                                    <div>{errors.name}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="price">price:</label>
                                <Field className="price" type="number" name="price" id="price" />
                                {errors.price && touched.price ? (
                                    <div>{errors.price}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="inStock">is in stock:</label>
                                <Field type="checkbox" name="inStock" id="inStock" />
                            </div>


                            <fieldset role="group" aria-labelledby="checkbox-group" className="labels-container">

                                {labels.map(label => (


                                    <label className="edit-tag"  key={label}>
                                        <Field
                                            name="labels"
                                            type="checkbox"
                                           
                                            value={label}
                                             />

                                        {label}</label>

                                ))}
                            </fieldset>
                            <button className="btn" type="submit">Save</button>
                        </Form>
                    )}
                </Formik>
            </section>
        </>
    )
}