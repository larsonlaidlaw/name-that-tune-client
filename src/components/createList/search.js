import React, { Component } from 'react'
import { Input, Icon } from 'semantic-ui-react'

class YTSearch extends Component {
  state = {
    searchTerm: '',
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSearchSubmit}>
          <Input
            onChange={this.props.handleSearchChange}
            icon='search'
            placeholder='Search...'
            value={this.searchTerm}
          />
        </form>
      </div>
    )
  }
}

export default YTSearch
