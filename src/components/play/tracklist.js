import React from 'react'
import {List, Modal, Button, Input, Icon, Popup} from 'semantic-ui-react'


class Tracklist extends React.Component{

  render(){
      let videos = this.props.videoList.map((video, index)=>{
        return <List.Item onClick={()=> this.props.changeI(index)}>{video}</List.Item>
      })

    return(
      <div>
        {this.props.videoList.length > 0 ?
          <h3>Video List
            <Popup
              trigger={<Icon name='refresh'  onClick={this.props.fetchData} />}
              content="If you don't see all of your videos, try refreshing"
              basic
            />
          </h3> : ""
        }
        <List celled ordered>
          {videos}
        </List>
        {this.props.videoObjects.length > 0
          ? <Button onClick={this.props.savePlaylist}>Update Playlist</Button>
          : ''
        }
      </div>
    )
  }
}


export default Tracklist
