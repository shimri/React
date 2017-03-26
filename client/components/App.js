import React from 'react'
import NavigationBar  from './NavigationBar'
import FlashMessagesList from '../components/flash/FlashMessagesList'

class App extends React.Component {
   render() {

     return (
      <div className="container">
        <NavigationBar />
        <FlashMessagesList/>
      </div>
     )
   }
 }

export default App
