import React, { Component } from "react";
import './loader.css'

class Loader extends Component {
    render() {
        return (
            <div class="sk-chase sk-center">
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
            </div>
        )
    }
}

export default Loader