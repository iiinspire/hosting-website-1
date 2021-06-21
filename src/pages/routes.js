import Home from './home'
import Dashboard from './dashboard'
import DashChildren from './dashboard/routes'
import Project from './project'
import ProjectChildren from './project/routes'

export default [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/dashboard',
		component: Dashboard,
		children: DashChildren,
	},
	{
		path: '/project',
		component: Project,
		children: ProjectChildren,
	},
]