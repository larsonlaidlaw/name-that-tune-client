import React, { Component } from 'react'
import { Input, Icon } from 'semantic-ui-react'


class YTSearch extends Component {


  render() {
    return (
      <div>
        <Icon link name="play" size='large' />
        <Icon color='green' link name="plus" size='large' onClick={this.props.addVideoToPlaylist}/>
        <form onSubmit={this.props.handleSearchSubmit}>
          <Input
            onChange={this.props.handleSearchChange}
            icon='search'
            placeholder='Search...'
            value={this.props.searchTerm}
          />
        </form>
      </div>
    )
  }
}

export default YTSearch
