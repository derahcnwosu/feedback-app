import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList"
import FeedbackStats from "./components/FeedbackStats"
import FeedbackForm from "./components/FeedbackForm"
import AboutPage from './pages/AboutPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AboutLink from "./components/AboutLink"
import {FeedbackProvider} from '../src/components/context/FeedbackContext'

function App() {

  return (
    <>
    <FeedbackProvider>
      <Router>
              <Header text= 'Feedback UI' bgColor= 'rgba(0,0,0,0.4)' textColor= '#ff6a95'/>
              <div className="container">
            <Routes>
              <Route exact path = '/' element = {
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                  <AboutLink />
                </>
              }>
              </Route>
              <Route path = '/about' element = {<AboutPage />}>

              </Route>

            </Routes>
          </div>
      </Router>
    </FeedbackProvider>

    </>
  )
}

export default App