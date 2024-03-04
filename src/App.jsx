// import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import { Home } from './pages/Home'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'

export function App() {

    return (
        <>
            <section className='main-app'>
                <AppHeader />

                <main className='container'>
                    <Home />
                </main>

                <AppFooter />
            </section>
        </>

    )
}

