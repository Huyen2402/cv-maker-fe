import React from 'react'
import ItemSkills from '../item/ItemSkill';


type SkillsListProps = {
    data:SkillsType []
    removeSkills: Function;
    setValueSkill?: Function;
}
type SkillsType = {
    id?: string;
    name: string;
    scores: string
  }
const SkillList = (props:SkillsListProps) => {
    return (
      <div>
            {props.data.length > 0 &&
              props.data.map((item: SkillsType) => (
                <ItemSkills item={item} key={item.id} removeSkills={props.removeSkills} setValueSkill={props.setValueSkill}/>
              ))}
      </div>
    )
  }

  export default React.memo(SkillList)