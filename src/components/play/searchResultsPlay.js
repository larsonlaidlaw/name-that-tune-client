import React from 'react'
import { Image, List, Icon } from 'semantic-ui-react'

const SearchResultsPlay = (props) => {
  console.log('from search results play',props)
  let results = props.searchResults.map((result)=>{
    return(
      <List.Item onClick={()=>props.handleVideoSelection(result)}>
        <Image avatar src={result.snippet.thumbnails.default.url} />
        <List.Content>
          <List.Header>{result.snippet.title} <Icon color='green' link name="plus" size='large' onClick={()=>props.addVideoToPlaylist(result)}/></List.Header>
        </List.Content>
      </List.Item>
    )
  })
  return(
    <div>
    <List selection verticalAlign='middle'>{results}</List>

    </div>
  )
}

export default SearchResultsPlay
