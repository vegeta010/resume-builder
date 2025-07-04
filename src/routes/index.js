import Home from "../pages/Home/Home";
import Details from "../pages/Details/Details";
import About from "../pages/About/About";
import ErrorBoundary from "../pages/Error/ErrorBoundary";
import NavbarComponent from "../components/Navbar";
import Template1 from "../pages/ResumeTemplate/Template1/Template1"
import Template2 from "../pages/ResumeTemplate/Template2/Template2"
import Template3  from "../pages/ResumeTemplate/Template3/Template3"
import Template4 from "../pages/ResumeTemplate/Template4/Template4"
import Template5 from "../pages/ResumeTemplate/Template5/Template5"
import Template6 from "../pages/ResumeTemplate/Template6/Template6"
import Template7 from "../pages/ResumeTemplate/Template7/Template7"
import Template8 from "../pages/ResumeTemplate/Template8/Template8"
import Template9 from "../pages/ResumeTemplate/Template9/Template9" 
import ResumeChecker from "../pages/resume-checker/ResumeCheker"





export const routes = [
    {
        path: '/',
        element: <NavbarComponent />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/preview',
                element: <Template1 />
            },
            {
                path: '/preview-2',
                element: <Template2  />
            },
            {
                path: '/preview-3',
                element: <Template3  />
            },
            {
                path: '/preview-4',
                element: <Template4  />
            },
            {
                path: '/preview-5',
                element: <Template5  />
            },
            {
                path: '/preview-6',
                element: <Template6  />
            },
            {
                path: '/preview-7',
                element: <Template7  />
            },
            {
                path: '/preview-8',
                element: <Template8  />
            },
            {
                path: '/preview-9',
                element: <Template9  />
            },
            {
                path: '/details',
                element: <Details />
            },
            {
                path: '/resume-checker',
                element: <ResumeChecker />
            },
            {
                path: '/about',
                element: <About />
            },
        ]
    }
]
