import  ReactQuill  from "react-quill"
import 'react-quill/dist/quill.snow.css'

export default function Editor({value,onChange}){
    
     const modules={
        toolbar:[
            [{'header':[1,2,false]}],
            ['bold','italic','underline','strike','blockquote'],
            [{'list':'ordered'},{'list':'bullet'}],
            [{ 'align': [] }],  
                    ['link', 'image'],  
                    ['clean'],  
                    [{ 'color': [] }]
        ],
     }
     return(
        
    <ReactQuill placeholder="Create your blog" value={value} theme={'snow'} onChange={onChange} modules={modules} />
    
    )         
}

// export default Editor