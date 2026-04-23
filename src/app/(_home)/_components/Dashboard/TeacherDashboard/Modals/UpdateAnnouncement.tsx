import { useState, useTransition } from "react";
import { useModal } from "@/app/(_home)/_context/Modal";
import "../../Dashboard.css";
import { createAnnouncement, updateAnnouncement } from "@/app/(_home)/_actions/announcement-actions";
import { Announcement, AnnouncementFormState, Teacher, User } from "@/app/lib/definitions";

export default function UpdateAnnouncementModal({ announcement }: { announcement: Announcement }) {
  const [pending, startTransition] = useTransition();
  const [title, setTitle] = useState(announcement.title ?? '');
  const [content, setContent] = useState(announcement.content ?? '');
  const [imageUrl, setImageUrl] = useState(announcement.imageUrl ?? '');
  const [scope, setScope] = useState(announcement.scope ?? 'school');
  const [errors, setErrors] = useState<AnnouncementFormState>(undefined);
  const { closeModal } = useModal();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await updateAnnouncement(announcement.id ?? 0, announcement.userId ?? 0, title, content, imageUrl, scope);
      if (result instanceof Error) setErrors({ errors: ['Failed to update announcement. Please try again.'] } as AnnouncementFormState);
      else if (result && "errors" in result) {
        console.log('errors', result);
        setErrors(result);
      }
      else closeModal();
    });
  };

  return (
    <div className='formCon'>
      <h1 className='inputTitle'>Update Announcement</h1>
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
          >{pending ? 'Updating announcement...' : 'Update'}</button>
        </div>
        {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
      </form>
    </div>
  );
}