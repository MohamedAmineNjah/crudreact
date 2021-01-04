import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IRootState } from '.';
import { Button, Label, FormGroup } from 'reactstrap';

import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { Grid } from '@material-ui/core';
import { getEntity, updateEntity } from './categorie.reducer'
import { ICategorie } from './categorie.model';
import { numberRegex, SnackBarCustom, validateErrorOnField, validateRequired } from './snackbar';


export interface IAddProp extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

const Edit = (props: IAddProp) => {
    const [valeurs, setvaleurs] = useState<ICategorie>({});
    const [openSnack, setopenSnack] = useState(false);
    const [openSnackMessage, setopenSnackMessage] = useState('');
    const [regexValues, setregexValues] = useState({
        position: { isOnError: false },
    });

    const requiredValues = [
        { field: 'nom', fieldName: 'Nom ' },
        { field: 'description', fieldName: 'Description' },
        { field: 'position', fieldName: 'Position' },
    ];

    const handleCloseSnack = () => {
        setopenSnack(false);
    };
    useEffect(() => {
        console.log(props.match.params.id);
        props.getEntity(props.match.params.id);
        console.log("azaz");

    }, []);

    useEffect(() => {

        console.log(props.entite);
        setvaleurs(props.entite);
    }, [props.entite]);

    useEffect(() => {
        if (props.updateSuccess) {
            //setvaleurs({});
            handleClose();
        }
    }, [props.updateSuccess]);

    const handleClose = () => {
        props.history.push('/');
    };
    const handleInputChange = (event: any, state: any, setState: any) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    }
    const modif = () => {
        console.log(valeurs);

        if (!validateRequired(valeurs, requiredValues, setopenSnackMessage) && !validateErrorOnField(regexValues))
            props.updateEntity(valeurs);
        else
            setopenSnack(true);
    }
    return (
        <div>
            {props.loading ? (
                <p>Loading.....</p>
            ) : (
                    <Grid container item xs={12} justify="center" >
                        <AvForm>
                            {/* With AvField */}
                            <AvField name="nom" label="Nom" required
                                onChange={(e: any) => handleInputChange(e, valeurs, setvaleurs)}
                                value={valeurs ? valeurs.nom : ''}

                            />
                            {/* With AvGroup AvInput and AvFeedback to build your own */}
                            <AvGroup>
                                <Label for="example">Description</Label>
                                <AvInput name="description" id="example" required
                                    onChange={(e: any) => handleInputChange(e, valeurs, setvaleurs)}
                                    value={valeurs ? valeurs.description : ''}
                                />
                                {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                                <AvFeedback>This is an error!</AvFeedback>
                            </AvGroup>

                            {/* With select and AvField */}
                            <AvField type="select" name="position" label="Position" helpMessage="position here!"
                                onChange={(e: any) => handleInputChange(e, valeurs, setvaleurs)}
                                value={valeurs ? valeurs.position : ''}
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </AvField>

                            {/* Radios */}
                            <AvRadioGroup inline name="etat" label="Etat" required
                                onChange={(e: any) => handleInputChange(e, valeurs, setvaleurs)}
                                value={valeurs ? valeurs.etat : false}
                            >
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
                                <Button onClick={modif}>Edit</Button>
                            </FormGroup>
                        </AvForm>
                        {valeurs && <div>
                            <h5>Submission values</h5>
          Values: <pre>{JSON.stringify(valeurs, null, 2)}</pre>

                        </div>}


                    </Grid>
                )}
            <SnackBarCustom textMessage={openSnackMessage} isSnackOpen={openSnack} handleClose={handleCloseSnack} />

        </div>
    );

}


const mapStateToProps = ({ produit, categorie }: IRootState) => ({
    entite: categorie.entity,
    entiteupdated: categorie.entity,
    updateSuccess: categorie.updateSuccess,
    loading: categorie.loading,
});

const mapDispatchToProps = {
    getEntity,
    updateEntity

};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Edit);