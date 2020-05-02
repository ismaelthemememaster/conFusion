import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

    class DishDetail extends Component {

        constructor(props) {
            super(props);

        }

        renderComments(comments){

            if (comments != null){

                let comentarios = comments.map((com) => {

                    return (
                        <li key={com.id}>
                            <p className="text">{com.comment}</p> <p>-- {com.author}, {com.date}</p>
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
            )
        }
    
        render() {
            
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