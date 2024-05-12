import EditableImage from './EditableImage';





const Cover = ({cover,editable}) => { 
  return (
       <EditableImage 
       cover={cover} 
       className={' h-36 w-full '} 
       type={"cover"} 
       editable={editable}
       />
  )
}

export default Cover
