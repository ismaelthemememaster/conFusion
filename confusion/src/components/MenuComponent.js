import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
///import { SUICIDIO } from './components/DishdetailComponent';
var cosa= "assets/images/angries/1.png";
var hp= "MALDITA SEA, NO HAY INTENRET";
var num= 1;

    class Menu extends Component {

        
        

        constructor(props) {
            super(props);

            
            
    
            this.state = {
                selectedDish: null
            }
        }
    
        onDishSelect(dish) {
            this.setState({ selectedDish: dish});
        }

        suicidio() {
            console.log( hp );
            
            num= num + 1;
            
            if (num > 29)  cosa= "assets/images/angries/"+num +".jpg";
            
            else cosa= "assets/images/angries/"+num+".png" ;


            if (num >=42) num = 0;

            this.setState(this);
        }

        ///console.log("copiar el renderDish con el details");
    
        renderDish(dish) {
            console.log("Voy a entrar a la mierda de if para ver si esto es null");
            if (dish != null)
                return(
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                          <CardTitle>{dish.name}</CardTitle>
                          <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                );
            else
                return(
                    <div></div>
                );
        }
    
        render() {
            const menu = this.props.dishes.map((dish) => {
                return (
                  <div  className="col-12 col-md-5 m-1">
                    <Card key={dish.id}
                      onClick={() => this.onDishSelect(dish)}>
                      <CardImg width="100%" src={dish.image} alt={dish.name} />
                      <CardImgOverlay>
                          <CardTitle>{dish.name}</CardTitle>
                      </CardImgOverlay>
                    </Card>
                  </div>
                );
            });

            
            return (
                <div className="container">
                    <div className="row">
                        {menu}
                    </div>
                    <div className="row">
                        <div  className="col-12 col-md-5 m-1">
                            {this.renderDish(this.state.selectedDish)}
                        </div>

                        <div  className="col-12 col-md-5 m-1">

                            <Card onClick={() => this.suicidio()}>
                                <CardTitle>Odio el htmml</CardTitle>
                                <CardImg width="100%" src={cosa} alt="Suicidio.png" />
                                Y POR SI FUERA POCO, TAMBIÉN ODIO JAVASCRIPT.
                                APAGUE EL COMPUTADOR SI NO QUIERE QUE LE META UN HP VIRUS
                            </Card>
                        </div>
                    </div>
                  
                </div>
            );
            
        }
    }

export default Menu;