"use strict";
import fs from 'fs'
import path from 'path'
import Link from 'next/link'

var project_list = [
	{id:'web', name:'Web Design'},
	{id:'prog', name:'Programming'},
	{id:'hard', name:'Hardware'},
	{id:'button', name:'Button Showcase'},
];

export function get_available_projects()
{
	return project_list.filter(project => fs.existsSync(path.join('app/projects',project.id)))
}

export default () => <>
	<h2>List of Projects</h2>
	<ul>
		{project_list.map(({id,name}) => <li key={id}>{fs.existsSync(path.join('app/projects',id)) ? <Link href={path.join('/projects',id)}>{name}</Link> : name}</li>)}
	</ul>
</>;
