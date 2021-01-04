import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IRootState } from '.';
import { reset, getEntities, createEntity } from './categorie.reducer'
import { Button, Label, FormGroup, InputGroup, Col, Row, Table, Badge } from 'reactstrap';

import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Grid, TextField } from '@material-ui/core';



export interface IAddProp extends StateProps, DispatchProps, RouteComponentProps { }

const Add = (props: IAddProp) => {

    const [state, setState] = useState({});
    useEffect(() => {
        props.reset();
    }, []);

    useEffect(() => {
        if (props.updateSuccess) {
            setState({});
            handleClose();
        }
    }, [props.updateSuccess]);

    const handleClose = () => {
        props.history.push('/');
    };

    const verif = () => {
        console.log(state);
        props.createEntity(state);
    }
    const handleInputChange = (event: any, state: any, setState: any) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    }
    return (

        <Grid container item xs={12} justify="center" >
            <AvForm>
                {/* With AvField */}
                <AvField name="nom" label="Nom" required
                    onChange={(e: any) => handleInputChange(e, state, setState)}
                />
                {/* With AvGroup AvInput and AvFeedback to build your own */}
                <AvGroup>
                    <Label for="example">Description</Label>
                    <AvInput name="description" id="example" required
                        onChange={(e: any) => handleInputChange(e, state, setState)} />
                    {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                    <AvFeedback>This is an error!</AvFeedback>
                </AvGroup>

                {/* With select and AvField */}
                <AvField type="select" name="position" label="Position" helpMessage="position here!" onChange={(e: any) => handleInputChange(e, state, setState)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </AvField>

                {/* Radios */}
                <AvRadioGroup inline name="etat" label="Etat" required onChange={(e: any) => handleInputChange(e, state, setState)}>
                    <AvRadio label="true" value="true" />
                    <AvRadio label="false" value="false" />
                </AvRadioGroup>



                {/* <TextField
                    id="nomLabel"
                    label="Nom de la catégorie"
                    name="nom"
                    value={''}
                    required
                    // onChange={e => handleInputChange(e, valeurs, setvaleurs)}
                    style={{ width: 250 }}
                /> */}
                <FormGroup>
                    <Button onClick={verif}>Add</Button>
                </FormGroup>
            </AvForm>
            {state && <div>
                <h5>Submission values</h5>
          Values: <pre>{JSON.stringify(state, null, 2)}</pre>

            </div>}


        </Grid>
    );
}


const mapStateToProps = ({ produit, categorie }: IRootState) => ({
    // categorielist: categorie.entities,
    categorielist2: categorie.entity,
    updateSuccess: categorie.updateSuccess,

});

const mapDispatchToProps = {

    createEntity,
    reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Add);
