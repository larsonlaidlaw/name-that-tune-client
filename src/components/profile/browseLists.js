import React from 'react'
import {List} from 'semantic-ui-react'
const BASE_URL = process.env.REACT_APP_API


class BrowseLists extends React.Component {
  state = {
    lists: null
  }

  componentDidMount(){
    fetch(`${BASE_URL}/api/v1/lists`)
      .then(response => response.json())
      .then((data) => {
        console.log('1', data)
        this.setState({
          lists: data
        })
      }
    )
  }

  render(){
    let lists = null

    if (this.state.lists) {
      lists = this.state.lists.map((list=>{
        return (<List.Item>
                  <List.Content>
                    <List.Header>{list.title}</List.Header>
                    <List.Description>{list.videos.map((video) =>
                      video.video_title + '***'
                    )}</List.Description>
                  </List.Content>
                </List.Item>)
      }))

      } else {
      lists = ''
    }

    return(
      <List>{lists}</List>
    )
  }
}

export default BrowseLists
