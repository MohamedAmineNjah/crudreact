import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IRootState } from '.';
import { getAllProducts } from './products.reducer'
import { Button, InputGroup, Col, Row, Table, Badge } from 'reactstrap';
import { Grid, Breadcrumbs, Typography } from '@material-ui/core';
import { reset,deleteEntity,getEntities } from './categorie.reducer'





export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps { }


const Home = (props: IHomeProp) => {

    useEffect(() => {
        props.getAllProducts();
        props.getEntities();
        console.log(props.categorielist + "huihi1")
    }, []);// une seule fois au moment de l'aff de page
    
    useEffect(() => {
       console.log(props.updateSuccess);
        if(props.updateSuccess)
        {
            console.log(props.updateSuccess);
            handleClose();
            props.getEntities();//updateSuccess twali false (REQUEST)
        }
    }, [props.updateSuccess]);//1er fois + plusieur fois a chaque mofid de props.updateSuccess

    const handleClose = () => {
        props.history.push('/');
    };

const deletecat = (id : any) =>{
   console.log(id);
    props.deleteEntity(id);
}

    return (

        <Grid item className="justify-content-center">
            <Col sm="12">
                <h2 id="client-heading"> Liste des categories  </h2>
                <Grid container item xs={2} direction="row-reverse" justify="flex-start">
                    <Button
                        tag={Link}
                        to={`new`}
                        color="primary"
                        size="md"

                    >

                        <span className="d-none d-md-inline">
                            Ajouter categorie
                                                        </span>
                    </Button>
                </Grid>


            </Col>



            <Col sm="12">
                <Table hover size="sm" responsive>
                    <thead>
                        <tr>
                            <th className="hand" >
                              
                                    ID
                                       

                            </th>
                            <th className="hand" >
                                Nom
                                      
                            </th>
                            <th className="hand">
                                Description
                                    </th>
                            <th className="hand">
                                Position
                                    </th>
                            <th className="hand">
                                Etat
                                    </th>
                                    <th className="hand">
                                Action
                                    </th>
                        </tr>
                    </thead>
                    {props.categorielist && props.categorielist.length > 0 ? (      
                        <tbody>
                            {props.categorielist.map((categorie: any, i: any) => (   
                                <tr key={`entity-${i}`}>
                                    <td>{categorie.id}</td>

                                    <td>{categorie.nom}</td>
                                    <td>{categorie.description}</td>

                                    <td>{categorie.position}</td>
                                    <td> {''+ categorie.etat}</td>

                                    <td className="text-right">
                                        <div className="btn-group flex-btn-group-container">
                                            <Button
                                                tag={Link}
                                                to={`${categorie.id}/edit`}
                                                color="info"
                                                size="sm"
                                            >

                                                <span className="d-none d-md-inline">
                                                    Edit
                                                        </span>
                                            </Button>
                                            <Button
                                                color="warning"
                                                size="sm"
                                                onClick={() => deletecat(categorie.id)}
                                               //onClick={deletecat.bind(this,categorie.id)}
                                            >

                                                <span className="d-none d-md-inline">
                                                    Delete
                                                        </span>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (

                            <div className="alert alert-warning">
                                No product found
                            </div>

                        )}
                </Table>
            </Col>



        </Grid >

    );
}



const mapStateToProps = ({ produit, categorie }: IRootState) => ({
    listProduit: produit.entity,
    categorielist: categorie.entities,
    categorientity: categorie.entity,
    updateSuccess: categorie.updateSuccess,

});

const mapDispatchToProps = {
    getAllProducts,
    getEntities,
    deleteEntity,
    reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
