import React from 'react'
import ItemProjects from '../item/ItemProjects';


type ProjectsListProps = {
    data:ProjectsType []
    removeProjects: Function;
    setValueSProject: Function;
}
type ProjectsType = {
    id?: string;
    name: string;
    urlGit?: string;
    description?: string
  }
const ProjectList = (props:ProjectsListProps) => {
    return (
      <div>
            {props.data.length > 0 &&
              props.data.map((item: ProjectsType) => (
                <ItemProjects item={item} key={item.id} removeProjects={props.removeProjects} setValueSProject={props.setValueSProject} />
              ))}
      </div>
    )
  }

  export default React.memo(ProjectList)