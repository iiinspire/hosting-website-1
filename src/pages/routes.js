import Home from './home'
import Dashboard from './dashboard'
import DashChildren from './dashboard/routes'
import ProjectNew from './new'
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
		path: '/new',
		component: ProjectNew,
	},
	{
		path: '/project/:id',
		component: Project,
		children: ProjectChildren,
	},
	{
		path: '/build/:id',
		component: Build,
		children: BuildChildren,
	},
]