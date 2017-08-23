import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

class YTSearch extends Component {
  state = {
    searchTerm: '',
  }

  render() {
    return (
      <div className='searchMargin'>
        <form onSubmit={this.props.handleSearchSubmit}>
          <Input
            onChange={this.props.handleSearchChange}
            icon='search'
            placeholder='Search for a video...'
            value={this.props.searchTerm}
          />
        </form>
      </div>
    )
  }
}

export default YTSearch
