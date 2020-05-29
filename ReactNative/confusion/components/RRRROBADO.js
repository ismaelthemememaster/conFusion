import React, { Component } from 'react';

import { Text, View, ScrollView, FlatList,StyleSheet,Button,Modal } from 'react-native';
import { Card, Icon,Input,Rating } from 'react-native-elements';

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
    postComment: (dishId,rating,author,comment)=>dispatch(postComment(dishId,rating,author,comment))
})


function RenderComments(props) {
   
    
    
   
        const renderCommentItem = ({item, index}) => {
        
            return (
                <View key={index} style={{margin: 10}}>
                    <Text style={{fontSize: 14}}>{item.comment}</Text>
            <View style={{alignItems:"flex-start"}}>
            <Rating
         
           
            startingValue={item.rating}
           imageSize={14}
           readonly
           />
                    </View>
                    <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
                </View>
            );
        };
        return (
            <View>
  
            <Card title='Comments' >
            <FlatList 
                data={props.comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
            </Card>
            
            </View>
      
        );
    }
   

function RenderDish (props) {
    
 
        if (props.dish != null) {
            return(
               
         
                <Card
                featuredTitle={props.dish.name}
                
                image={{uri: baseUrl + props.dish.image}}>
                <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <Icon
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') :props.onPress()}
                    />
                    <Icon
                    raised
                    reverse
                    name={ 'pencil'}
                    type='font-awesome'
                    color='#512DA8'
                    onPress={() =>props.addComment()}
                    />
                    </View>

                    <Text style={{margin: 10}}>
                        {props.dish.description}
                    </Text>
                </Card>
                
            );
        }
        else {
            return(<View></View>);
        }
    }


class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state={
            showModal:false,
            author:"",
            comment:"",
            rating:1
        }
   
    }
  
    ratingCompleted=(value)=>{
        this.setState({rating:value})
    }
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    resetForm(){
        //...
    }
    setComment=(val)=>{
        this.setState({ comment: val })
    }
    setAuthor=(val)=>{
        this.setState({ author: val })

    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    handleSubmit()  {
        const dishId = this.props.navigation.getParam('dishId','');
        this.props.postComment(dishId,
            this.state.rating,
            this.state.author,
            {
            comment: this.state.comment,
            date: new Date().toISOString()
            })
         
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                    <Modal animationType = {"slide"}
                transparent = {false}
                visible = {this.state.showModal}
                onDismiss = {() => this.toggleModal() }
                onRequestClose = {() => this.toggleModal() }>
                <View style = {{justifyContent: 'center',margin: 20}}>
                <Rating showRating fractions="{1}"  startingValue={1} onFinishRating={(val)=>{this.ratingCompleted(val)} }/>
                <Input
                    placeholder="Author"
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                  
                    onChangeText={(val)=>this.setAuthor(val)}
                    />
                
                
                <Input
                    placeholder="Comment"
                    leftIcon={{ type: 'font-awesome', name: 'comment' }}
                   
                    onChangeText={(val)=>this.setComment(val)}
                />
                    
                <View style={{marginTop:10}}>
                    <Button 
                        onPress = {() =>{this.handleSubmit();this.toggleModal();}}
                        color="#512DA8"
                        title="Submit" 
                        />
                </View>
                <View style={{marginTop:10}}>
                    <Button 
                        onPress = {() =>{this.toggleModal(); this.resetForm();}}
                        color="grey"
                        title="Cancel" 
                        />
                </View>
                </View>
                </Modal>  
            <RenderDish dish={this.props.dishes.dishes[+dishId]}
              favorite={this.props.favorites.some(el => el === dishId)}
                onPress={() => this.markFavorite(dishId)} 
                addComment={()=>this.toggleModal()}
                />
            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
        </ScrollView>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);