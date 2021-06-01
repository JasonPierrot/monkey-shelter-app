import React, { Component } from 'react'
import '../App.css';

export default class Description extends Component{
    render(){
        return(
            <div style={{alignContent:"center"}}>
                <p>
                    This application gives a report about the different Monkeys all around the world.
                    <br/>
                    Below are the Monkeys separated by species:
                </p>
            </div>
        )
    }
}