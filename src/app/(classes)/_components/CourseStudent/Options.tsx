import { Course } from "@/app/lib/definitions";
import './CourseStudent.css';

export default function Options({ quarter, setQuarter }: { quarter: number, setQuarter: (quarter: number) => void }) {
    return (
        <div id="optionsConC" className="whiteBox p-2 flex justify-between items-center gap-2">
            <div className='quarterSelectConC flex justify-between items-center gap-1'>
                <label htmlFor='quarter'>
                    <p className='text-md'>Quarter</p>
                </label>
                <select
                    name="quarter"
                    id="quarter"
                    className="quarterSelectC "
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