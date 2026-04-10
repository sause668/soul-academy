import { useRouter } from 'next/navigation';
import { Course } from '@/app/lib/definitions';
import './Course.css';

export default function Options({ quarter, setQuarter, course }: { quarter: number, setQuarter: (quarter: number) => void, course: Course }) {
  const router = useRouter();
  return (
    <div id="optionsConC" className="whiteBox p-2 flex justify-between items-center gap-4">
      {course.isTeacher && <button
        className='btn'
        onClick={() => router.push(`/courses/${course.id}/gradebook`)}
      >Grade Book
      </button>}
      <div className='quarterSelectConC flex justify-between items-center gap-1'>
        <label htmlFor='quarter'>
          <p className='quarterSelectLabel'>Quarter</p>
        </label>
        <select
          name="quarter"
          id="quarter"
          className="quarterSelect "
          value={quarter}
          onChange={(e) => setQuarter(parseInt(e.target.value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    </div>
  )
}