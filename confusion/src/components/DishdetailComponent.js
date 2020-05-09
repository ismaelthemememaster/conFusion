import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

        function RenderComments({comments}){

            if (comments != null){

                let comentarios = comments.map((com) => {

                    return (
                        
                        <li key={com.id}>
                            <p className="text">{com.comment}</p> <p>-- {com.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(com.date)))}</p>
                        </li>
               
                    );
                });

                return(
                    <ul className="list-unstyled">
                        {comentarios}
                        <button type="button" class="btn btn-outline-secondary"><i className="fa fa-pencil"></i>   Submit Comment</button>
                    </ul>
                );

            }
            else {

                return(
                    <div>
                    </div>
                )
            }
        }

        function RenderDish({dish}){

            return(
                
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                        
            )
        }
    
        const  DishDetail = (props) => {

            console.log("Cada renderizada que hace este codigo me quita dos meses de vida");
            
            if (props.dish != null)
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
            );
            else
                return(
                    <div></div>
                );
        };

        ///console.log("copiar el renderDish con el details");


    export default DishDetail;