import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isModal2Open: false
    };

    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.toggleModal2 = this.toggleModal2.bind(this);

    }

    handleSubmit2(values) {
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    toggleModal2() {
        this.setState({
          isModal2Open: !this.state.isModal2Open
        });
        console.log("hizo el toggle");
    }

    render(){

        return(

            <React.Fragment>

                <button outline onClick={this.toggleModal2} type="button" class="btn btn-outline-secondary"><i className="fa fa-pencil"></i>   Submit Comment</button>
            
                <Modal isOpen={this.state.isModal2Open} toggle={this.toggleModal2}>
                    <ModalHeader toggle={this.toggleModal2}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit2(values)}>
                            
                            <FormGroup>
                                <Label htmlFor="rating" >Rating</Label>
                                
                                    <Control.select id="rating" model=".rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    </Control.select>
                            </FormGroup>
                                
                            <FormGroup>
                                <Label htmlFor="name" >Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                        />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="comment" >Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                            </FormGroup>

                            
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                            
                        </LocalForm>
                        
                    </ModalBody>
                </Modal>

            </React.Fragment>
            
        )

    }
    
}

function RenderComments({comments, addComment, dishId}) {

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
                    <CommentForm dishId={dishId} addComment={addComment} />
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
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>           
        )
    }

    const  DishDetail = (props) => {

        console.log("Cada renderizada que hace este codigo me quita dos meses de vida");
        
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) 
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
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
                        />
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