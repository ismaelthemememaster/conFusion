import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


    
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
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg top src={dish.image} alt={dish.name} />
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>  

                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <RenderComments comments = {dish.comments} />
                        </div>
                    </div>
                </div>
            )
        }
    
        const  DishDetail = (props) => {

            console.log("Cada renderizada que hace este codigo me quita dos meses de vida");
            
            if (props.dish != null)
                return(
                    <RenderDish dish= {props.dish} />
                );
            else
                return(
                    <div></div>
                );
        };

        ///console.log("copiar el renderDish con el details");


    export default DishDetail;