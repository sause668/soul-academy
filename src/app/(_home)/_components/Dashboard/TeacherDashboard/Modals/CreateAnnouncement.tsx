import { useState, useTransition } from "react";
import { useModal } from "@/app/(_home)/_context/Modal";
import "../../Dashboard.css";
import { createAnnouncement } from "@/app/(_home)/_actions/announcement-actions";
import { AnnouncementFormState, Teacher, User } from "@/app/lib/definitions";

export default function CreateAnnouncementModal({ teacher }: { teacher: Teacher }) {
  const [pending, startTransition] = useTransition();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scope, setScope] = useState('school');
  const [errors, setErrors] = useState<AnnouncementFormState>(undefined);
  const { closeModal } = useModal();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await createAnnouncement(teacher.userId ?? 0, title, content, imageUrl, scope);
      if (result instanceof Error) setErrors({ errors: ['Failed to create announcement. Please try again.'] } as AnnouncementFormState);
      else if (result && "errors" in result) {
        console.log('errors', result);
        setErrors(result);
      }
      else closeModal();
    });
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
          {errors?.properties?.title && <p className='labelTitle error'>{errors.properties.title.errors.join(', ')}</p>}
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
          {errors?.properties?.content && <p className='labelTitle error'>{errors.properties.content.errors.join(', ')}</p>}
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
          {errors?.properties?.imageUrl && <p className='labelTitle error'>{errors.properties.imageUrl.errors.join(', ')}</p>}
        </div>
        {/* Scope */}
        {/* <div className='inputCon'>
          <label htmlFor='scope'>
            <p className='labelTitle'>Scope</p>
          </label>
          <select className='formInput' id="scope" value={scope} onChange={(e) => setScope(e.target.value)} required>
            <option value="school">School</option>
            <option value="class">Class</option>
          </select>
          {errors.scope && <p className='labelTitle error'>{errors.scope}</p>}
        </div> */}
        
        <div className="submitCon">
          <button 
            className='submitButton'
            type="submit"
            disabled={pending || !title.length || !content.length}
          >{pending ? 'Creating announcement...' : 'Submit'}</button>
        </div>
        {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
      </form>
    </div>
  );
}