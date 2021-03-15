
import React, { Component } from 'react';
export default <style>{`

/* loader */

#pageloader-overlay {
    opacity: 0;
    top: 0px;
    left: 0px;
    position: fixed;
    background-color: #073e933b;
    height: 100%;
    width: 100%;
    z-index: 9998;
    -webkit-transition: opacity 0.2s linear;
    -moz-transition: opacity 0.2s linear;
    transition: opacity 0.2s linear;
}

    #pageloader-overlay.visible {
        opacity: 1;
    }

    #pageloader-overlay.hidden {
        opacity: 0;
        height: 0px;
        width: 0px;
        z-index: -10000;
    }

    #pageloader-overlay .loader-wrapper-outer {
        background-color: transparent;
        z-index: 9999;
        margin: auto;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: table;
        text-align: center;
        vertical-align: middle;
    }

    #pageloader-overlay .loader-wrapper-inner {
        display: table-cell;
        vertical-align: middle;
    }

    #pageloader-overlay .loader {
        margin: auto;
        font-size: 10px;
        position: relative;
        text-indent: -9999em;
        border-top: 8px solid rgba(255, 255, 255, 0.5);
        border-right: 8px solid rgba(255, 255, 255, 0.5);
        border-bottom: 8px solid rgba(255, 255, 255, 0.5);
        border-left: 8px solid #AAA;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation: pageloader 1.1s infinite linear;
        animation: pageloader 1.1s infinite linear;
    }

        #pageloader-overlay .loader, #pageloader-overlay .loader:after {
            border-radius: 50%;
            width: 50px;
            height: 50px;
        }

@-webkit-keyframes pageloader {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes pageloader {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

`}</style>
