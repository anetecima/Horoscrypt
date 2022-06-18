import React from 'react'
import ReactQuill from 'react-quill'

/*
 * Simple editor component that takes placeholder text as a prop
 */
const Editor = ({ value, onChange }) => {
  return (
    <ReactQuill
      className="stretch m-t-12 bg-white"
      key="htmlEditor"
      theme="snow"
      placeholder="Write something..."
      value={value}
      onChange={onChange}
      modules={Editor.modules}
      formats={Editor.formats}
    />
  )
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: '3' }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
]

export const HtmlEditor = props => <Editor {...props} />
