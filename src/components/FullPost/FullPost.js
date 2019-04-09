import React, { Component } from 'react';
import axiosInstance from '../../axios';


import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost:null,
        error:null
    }

    componentDidUpdate () {
        if ( this.props.id ) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id) ) {
                axiosInstance.get( '/posts/' + this.props.id )
                    .then( response => {
                        this.setState( { loadedPost: response.data } );
                    } )
                    .catch(err =>  this.setState( { error: err } ))

            }
        }
    }
    deletePost = ()=> {
        axiosInstance.delete( '/posts/' + this.props.id )
        .then(res => console.log(res))
        .catch(err =>  this.setState( { error: err } ))


    }
    render () {
        let post = <p style={{textAlign:'center'}}>Please select a Post!</p>;
        if(this.props.id) {
            post = (
                <p style={{textAlign:'center'}}>Loading...</p>    
            );
        }
        if(this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePost}>Delete</button>
                    </div>
                </div>
    
            );

        }

        return post;
    }
}

export default FullPost;