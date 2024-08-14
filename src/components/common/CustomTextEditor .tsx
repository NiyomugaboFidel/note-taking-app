import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface CustomTextEditorProps {
  initialValue?: string;
  onUpdate: (value: string) => void;
}

const CustomTextEditor: React.FC<CustomTextEditorProps> = ({ initialValue='', onUpdate }) => {
  const [editorContent, setEditorContent] = useState<string>(initialValue);

  useEffect(() => {
    if (initialValue !== editorContent) {
      setEditorContent(initialValue);
    }
  }, [initialValue]); // Only update if initialValue changes

  useEffect(() => {
    onUpdate(editorContent);
  }, [editorContent]);

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  return (
    <div className="my-4">
      <ReactQuill
        value={editorContent}
        onChange={handleEditorChange}
        modules={{
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }, { 'direction': 'rtl' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
          ],
        }}
        formats={[
          'header', 'font', 'list', 'bullet', 'bold', 'italic',
          'underline', 'blockquote', 'color', 'script', 'indent', 'background',
          'align', 'link',
        ]}
        placeholder="Start writing here..."
        className="bg-primary-300 text-white text-bodyDefault min-h-[45vh] quill-editor rounded-lg shadow-md"
      />
    </div>
  );
};

export default CustomTextEditor