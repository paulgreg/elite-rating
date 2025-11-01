import { Link, Outlet, useParams } from 'react-router-dom'
import './App.css'
import DataContextProvider from './DataContextProvider'

const InnerApp = () => (
    <div className="app">
        <header>
            <Link to="/">
                <h1>Elite Rating</h1>
            </Link>
        </header>
        <Outlet />
    </div>
)

export const App = () => {
    const { name } = useParams()

    if (name) {
        return (
            <DataContextProvider name={name}>
                <InnerApp />
            </DataContextProvider>
        )
    }
    return <InnerApp />
}
export default App
