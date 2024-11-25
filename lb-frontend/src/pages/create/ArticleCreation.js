import './ArticleCreation.css'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useState } from 'react'
import Navigation from '../../components/nav/navigation'
import Axios from 'axios';
import imageCompression from 'browser-image-compression';

import Beardatorium from '../../assets/icons/beardatorium.png';
import Notice from '../../assets/icons/notice.png';
import Launchpad from '../../assets/icons/launchpad.png';
import TeamBuild from '../../assets/icons/teambuild.png';

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          Code
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          Paragraph
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        >
          H4
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
        >
          H5
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
        >
          H6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          Ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          Code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          Blockquote
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          Horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          Redo
        </button>
      </div>
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

const content = `<p>Write text here...</p>`

export default () => {
  const [editorContent, setEditorContent] = useState(content);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    category: '',
    image: '',
    content: content
  });

  const handleImageChange = async (event) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        try {
          // Compression options
          const options = {
            maxSizeMB: 50,              // Max file size in MB
            maxWidthOrHeight: 1920,    // Max width/height in pixels
            useWebWorker: true
          };

          // Compress the image
          const compressedFile = await imageCompression(file, options);

          // Convert to base64
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedImage(reader.result);
            setFormData(prev => ({ ...prev, image: reader.result }));
          };
          reader.readAsDataURL(compressedFile);
        } catch (error) {
          console.error('Error compressing image:', error);
          alert('Error processing image. Please try a smaller image.');
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = ({ editor }) => {
    const html = editor.getHTML();
    setEditorContent(html);
  };

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.author) newErrors.author = 'Author is required';
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goSubmit = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      if (!formData.author || !formData.title || !formData.category) {
        alert('Please fill in all required fields');
        return;
      }

      const currentDate = new Date().toLocaleDateString();
      const articleData = {
        ...formData,
        published_at: currentDate,
        content: editorContent
      };

      const response = await Axios.post('http://localhost:4000/create', articleData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 201) {
        alert('Article created successfully!');
        // Redirect to home page
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error creating article:', error);
      alert(error.response?.data?.message || 'Failed to create article');
    }
  };

  return (
    <div className='article-create-container'>
      <Navigation />
      <div className='create-image-holder'>
        {selectedImage ? (
          <img
            src={selectedImage}
            alt='Banner Preview'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div className='image-upload-placeholder'>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload" className='upload-label'>
              Click to upload image
            </label>
          </div>
        )}
      </div>
      <div className='create-form'>
        <div className='create-author'>
          <label>Enter your name</label>
          <input
            type="text"
            name="author"
            placeholder='John Doe'
            value={formData.author}
            onChange={handleInputChange}
          />
        </div>
        <div className='create-title'>
          <label>Article Title</label>
          <input
            type="text"
            name="title"
            placeholder='Enter title'
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className='create-category'>
          <label>Select category</label>
          <select
            className="category-select"
            name="category"
            value={formData.category}
            onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="Notice">Notice</option>
            <option value="Beardatorium">Beardatorium</option>
            <option value="Launchpad">Launchpad</option>
            <option value="Team Build">Team Build</option>
          </select>
        </div>
        <div className='text-editor'>
          <div className='create-label'>Your Article</div>
          <div className='text-editor-body'>
            <EditorProvider
              slotBefore={<MenuBar />}
              extensions={extensions}
              content={content}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
        <div className='create-btn-submit'>
          <div onClick={goSubmit} className='submit-btn'>
            <p>Submit</p>
          </div>
        </div>
      </div>
    </div>
  );
}