import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./Dashboard.css";
import { createAnnouncement, fetchAnnouncements } from "../../redux/announcement";

function CreateAnnouncementModal() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      createAnnouncement({
        title,
        content,
        image_url: imageUrl || null
      })
    );

    if (serverResponse && serverResponse.errors) {
      setErrors(serverResponse.errors);
    } else {
      // Refresh announcements list
      dispatch(fetchAnnouncements());
      closeModal();
    }
  };

  return (
    <div className='formCon'>
      <h1 className='inputTitle'>New Announcement</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className='inputCon'>
          <label htmlFor='title'>
            <p className='labelTitle'>Title</p>
          </label>
          <input
            className='formInput'
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={200}
          />
          {errors.title && <p className='labelTitle error'>{errors.title}</p>}
        </div>
        {/* Content */}
        <div className='inputCon'>
          <label htmlFor='content'>
            <p className='labelTitle'>Content</p>
          </label>
          <textarea
            className='formInput'
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
          />
          {errors.content && <p className='labelTitle error'>{errors.content}</p>}
        </div>
        {/* Image URL */}
        <div className='inputCon'>
          <label htmlFor='imageUrl'>
            <p className='labelTitle'>Image URL (Optional)</p>
          </label>
          <input
            className='formInput'
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          {errors.image_url && <p className='labelTitle error'>{errors.image_url}</p>}
        </div>
        
        <div className="submitCon">
          <button 
            className='submitButton'
            type="submit"
            disabled={!title.length || !content.length}
          >Submit</button>
        </div>
        {errors.message && <p className='labelTitle error'>{errors.message}</p>}
      </form>
    </div>
  );
}

export default CreateAnnouncementModal;

