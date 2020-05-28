import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button } from 'react-native';
import { Card, Icon, Rating, Input  } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card
                    featuredTitle={dish.name}
                    image={{uri: baseUrl + dish.image}}>
                        <Text style={{margin: 10}}>
                            {dish.description}
                        </Text>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row'}}>
                            <Icon
                                raised
                                reverse
                                name={ props.favorite ? 'heart' : 'heart-o'}
                                type='font-awesome'
                                color='#f50'
                                onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                                />
                            <Icon
                                raised
                                reverse
                                name={'pencil'}
                                type='font-awesome'
                                color='#512DA8'
                                onPress={() => props.onPress2()}
                                />
                        </View>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date } </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class DishDetail extends Component {    

    constructor(props) {
        super(props);

        this.state = {
            rating: null,
            author: '',
            comment: '',
            showModal: false
        }
    }

    
    
    static navigationOptions = {
        title: 'Dish Details'
    };

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleComment() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
        this.props.postComment(this.props.navigation.getParam('dishId', ''), this.state.rating, this.state.author, this.state.comment);

    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        const rating = null;
        const author = '';
        const comment = '';

        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    onPress2={() => this.toggleModal(dishId)}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {{justifyContent: 'center', margin: 20}}>
                        <Rating
                            showRating
                            count={5}
                            reviews={["1", "2", "3", "4", "5"]}
                            defaultRating={3}
                            size={5}
                            onFinishRating={value => this.setState({ rating: value })}
                            />
                        <Input
                            placeholder=' Author'
                            onChangeText={value => this.setState({ author: value })}
                            leftIcon={
                                <Icon
                                name={'user-o'}
                                size={24}
                                color='black'
                                type='font-awesome'
                                />
                            }/>
                        <Input
                            placeholder=' Comment'
                            onChangeText={value => this.setState({ comment: value })}
                            leftIcon={
                                <Icon
                                name={'comment-o'}
                                size={24}
                                color='black'
                                type='font-awesome'
                                />
                            }/>
                        <Button 
                            onPress={() => this.handleComment()}
                            color="#512DA8"
                            title="SUBMIT" 
                            />
                        </View>
                        <View style = {{justifyContent: 'center', margin: 20}}>
                        <Button 
                            onPress = {() =>{this.toggleModal()}}
                            color="gray"
                            title="CANCEL" 
                            />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);