import React from 'react'
import EditableImage from './EditableImage';
const Avatar = ({ src, big = false, editable = false }) => {
    const widthClass = big ? ' w-24 h-24 ' : ' w-12 h-12 '
    return (

        <div className="rounded-full overflow-hidden">
            <EditableImage 
            type={'image'}
            cover={src} 
            className={"  "+widthClass}
            editable={editable}  
            />
         </div>
            
       

    )
}

export default Avatar
