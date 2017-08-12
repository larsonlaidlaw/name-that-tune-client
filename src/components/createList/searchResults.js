import React from 'react'
import { Image, List } from 'semantic-ui-react'

const SearchResults = (props) => {
  let results = props.searchResults.map((result)=>{
    return(
      <List.Item onClick={()=>props.handleVideoSelection(result)}>
        <Image avatar src={result.snippet.thumbnails.default.url} />
        <List.Content>
          <List.Header>{result.snippet.title}</List.Header>
        </List.Content>
      </List.Item>
    )
  })
  return(
    <List selection verticalAlign='middle'>{results}</List>
  )
}

export default SearchResults
