import { useCallback } from 'react'
import Filename from '../Components/Filename'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()
    const onLoadFilename = useCallback(
        (filename: string) => {
            navigate(filename)
        },
        [navigate]
    )

    return <Filename onLoadFilename={onLoadFilename} />
}

export default HomePage
