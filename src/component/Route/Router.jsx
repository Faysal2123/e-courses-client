import { createBrowserRouter } from 'react-router-dom'
import MainLayouts from '../layouts/MainLayouts'

import Home from '../component/Home/Home'
const router=createBrowserRouter([
    {
        path:'/',
        element:<MainLayouts></MainLayouts>,
        children:[{
            path:'/',
            element:<Home></Home>
        }]
    }
])
export default router