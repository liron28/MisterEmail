import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { EmailIndex } from './pages/EmailIndex'
import { EmailDetails } from './pages/EmailDetails'
import { EmailCompose } from './cmps/EmailCompose'


export function App() {

    return (
        <Router>
            <section className='main-app'>
                    <Routes>
                        <Route path="/" element={<EmailIndex />} />
                        <Route path="/:mailStatus" element={<EmailIndex />} >
                            <Route path={`/:mailStatus/:emailId`} element={<EmailDetails />} />
                            <Route path={`/:mailStatus/compose`} element={<EmailCompose />} />
                        </Route>
                    </Routes>
            </section>
        </Router>

    )
}

