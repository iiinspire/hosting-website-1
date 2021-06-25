import Home from './home'
import Dashboard from './dashboard'
import DashChildren from './dashboard/routes'
import Project from './project'
import ProjectChildren from './project/routes'
import Build from './build'
import BuildChildren from './build/routes'

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
	{
		path: '/build',
		component: Build,
		children: BuildChildren,
	},
]