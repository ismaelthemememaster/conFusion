import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent';
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
            
            if (num > 29)  {cosa= "assets/images/angries/"+num +".jpg";}
            else {cosa= "assets/images/angries/"+num+".png";}

            if (num >=42) {num = 0;}

            this.setState(this);
        }

        ///console.log("copiar el renderDish con el details");
    
        renderDish(dish) {
            console.log("Voy a entrar a la mierda de if para ver si esto es null");
            return(
                    <DishDetail dish={dish}></DishDetail>
            )
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
                    
                        
                    {this.renderDish(this.state.selectedDish)}

                  
                </div>
            );
            
        }
    }

export default Menu;