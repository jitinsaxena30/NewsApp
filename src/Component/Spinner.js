import React, { Component } from 'react'
import loading from '../spinner.gif';

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center mySpinner'>
        <img src={loading} alt="loading" />
      </div>
    )
  }
}
