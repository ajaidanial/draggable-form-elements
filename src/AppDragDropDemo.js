import React, { Component } from 'react'

import './App.css'

export default class AppDragDropDemo extends Component {
  state = {
    available_form_elements: [
      {
        id: 'input_text',
        element: <input className="input_text" type="text" />
      },
      {
        id: 'input_password',
        element: <input className="input_password" type="password" />
      },
      {
        id: 'input_date',
        element: <input className="input_date" type="date" />
      },
      {
        id: 'input_time',
        element: <input className="input_time" type="time" />
      },
      {
        id: 'input_week',
        element: <input className="input_week" type="week" />
      },
      {
        id: 'input_file',
        element: <input className="input_file" type="file" />
      }
    ],
    selected_form_elements: []
  }

  onDragStart = (ev, id) => {
    ev.dataTransfer.setData('id', id)
  }

  onDragOver = (ev) => {
    ev.preventDefault()
  }

  onDrop = (event) => {
    let id = event.dataTransfer.getData('id')
    let selected_form_elements = this.state.selected_form_elements

    this.state.available_form_elements.forEach((element) => {
      if (element.id === id) {
        selected_form_elements.push(element)
      }
    })

    this.setState({
      ...this.state,
      selected_form_elements: selected_form_elements
    })
  }

  render() {
    let available_form_elements = []
    this.state.available_form_elements.forEach((element) => {
      available_form_elements.push(
        <div
          className="single_element_holder"
          draggable
          key={element.id}
          onDragStart={(e) => this.onDragStart(e, element.id)}
        >
          <p>{element.id.replace('_', ' - ')}</p>
          {element.element}
        </div>
      )
    })

    let selected_form_elements = []
    this.state.selected_form_elements.forEach((element) => {
      selected_form_elements.push(
        <div className="single_element_holder" key={element.id}>
          {element.element}
        </div>
      )
    })

    return (
      <div className="container_drag container-fluid">
        <div className="row">
          {/* draggable elements for the form */}
          <div
            className="form_elements_container col-md-4"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => {
              this.onDrop(e, 'wip')
            }}
          >
            <h4 className="header">Form elements</h4>
            <div className="content_container">
              <div className="elements_holder">{available_form_elements}</div>
            </div>
          </div>

          {/* form build using the draggable elements */}
          <div
            className="build_form_container col-md-8"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e)}
          >
            <h4 className="header">Form Building Area</h4>
            <div className="content_container form_container">
              <form className="form">
                <h5>Form Title</h5>
                <div className="form_building_area">
                  {selected_form_elements}
                </div>
                <button className="btn btn-primary submit_button" type="button">
                  Submit Form
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
