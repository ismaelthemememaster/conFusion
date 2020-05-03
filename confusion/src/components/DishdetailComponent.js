import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

    class DishDetail extends Component {

        componentDidMount(){
            console.log("Se acaba de montar el deshDetail");
        }

        componentDidUpdate(){
            console.log("La base de datos de platos ha sido actalizada");
        }

        renderComments(comments){

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

        renderDish(dish){

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
                            {this.renderComments(this.props.dish.comments)}
                        </div>
                    </div>
                </div>
            )
        }
    
        render() {

            console.log("Cada renderizada que hace este codigo me quita dos meses de vida");
            
            if (this.props.dish != null)
                return(
                    this.renderDish(this.props.dish)
                );
            else
                return(
                    <div></div>
                );
        };

        ///console.log("copiar el renderDish con el details");

        
            
    }
    

export default DishDetail;