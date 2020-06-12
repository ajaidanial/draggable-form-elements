import React, { Component } from 'react'

import './App.css'

export default class AppDragDropDemo extends Component {
  state = {
    tasks: [
      { name: 'Learn Angular', category: 'wip', bgcolor: 'yellow' },
      { name: 'React', category: 'wip', bgcolor: 'pink' },
      { name: 'Vue', category: 'complete', bgcolor: 'skyblue' }
    ]
  }

  onDragStart = (ev, id) => {
    ev.dataTransfer.setData('id', id)
  }

  onDragOver = (ev) => {
    ev.preventDefault()
  }

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData('id')

    let tasks = this.state.tasks.filter((task) => {
      if (task.name === id) {
        task.category = cat
      }
      return task
    })

    this.setState({
      ...this.state,
      tasks
    })
  }

  render() {
    let tasks = {
      wip: [],
      complete: []
    }

    this.state.tasks.forEach((t) => {
      tasks[t.category].push(
        <div
          className="draggable"
          draggable
          key={t.name}
          onDragStart={(e) => this.onDragStart(e, t.name)}
          style={{ backgroundColor: t.bgcolor }}
        >
          {t.name}
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
              <div className="elements_holder">{tasks.wip}</div>
            </div>
          </div>

          {/* form build using the draggable elements */}
          <div
            className="build_form_container col-md-8"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e, 'complete')}
          >
            <h4 className="header">Form Building Area</h4>
            <div className="content_container form_container">
              <form className="form">
                <h5>Form Title</h5>
                <div className="form_building_area">{tasks.complete}</div>
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
