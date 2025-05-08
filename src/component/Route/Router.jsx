import { createBrowserRouter } from 'react-router-dom'
import MainLayouts from '../layouts/MainLayouts'
import { Children } from 'react'
const router=createBrowserRouter([
    {
        path:'/',
        element:<MainLayouts></MainLayouts>,
        // Children:[{
        //     path:'/',
        // }]
    }
])
export default router