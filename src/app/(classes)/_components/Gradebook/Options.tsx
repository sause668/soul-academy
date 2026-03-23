import NewAssignmentModal from './Modals/NewAssignmentModal';
import OpenModalButton from '@/app/(_home)/_components/OpenModalComponents/OpenModalButton';
import './Gradebook.css';

export default function Options({ quarter, setQuarter, courseId }: { quarter: number, setQuarter: (quarter: number) => void, courseId: number }) {
    return (
        <div id="optionsConGB" className="whiteBox p-2 flex justify-between items-center gap-2">
            <OpenModalButton
                buttonText={'New Assignment'}
                // modalComponent={'<NewAssignmentModal classId={classId} quarter={quarter} />'}
                modalComponent={<NewAssignmentModal
                    courseId={courseId}
                    quarter={quarter}
                />}
                cssClasses={'gradeBookButtonGB newAssignmentGB'}
            />
            <div className='quarterSelectConGB flex justify-between items-center gap-1 text-lg'>
                <label htmlFor='quarter'>
                    <p className=''>
                        Quarter
                    </p>
                </label>
                <select
                    name="quarter"
                    id="quarter"
                    className="quarterSelectGB"
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