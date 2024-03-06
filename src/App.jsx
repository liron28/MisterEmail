import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { EmailIndex } from './pages/EmailIndex'


export function App() {

    return (
        <Router>
            <section className='main-app'>
                    <Routes>
                        <Route path="/" element={<EmailIndex />} />
                    </Routes>
            </section>
        </Router>

    )
}

