import React from 'react'
import ExperienceItem from '../item/ItemExperience'

type ExperiencesListProps = {
    data:ExperienceType []
    removeExperience: Function;
    setValueExperience?: Function;
}


type ExperienceType = {
    id?: string;
    position?: string;
    company?: string;
    startDate?: string;
    endDate?: string;
  };


const ExperiencesList = (props:ExperiencesListProps) => {
  return (
    <div>
          {props.data.length > 0 &&
            props.data.map((item: ExperienceType) => (
              <ExperienceItem item={item} key={item.id} removeExperience={props.removeExperience} setValueExperience={props.setValueExperience} />
            ))}
    </div>
  )
}

export default React.memo(ExperiencesList)