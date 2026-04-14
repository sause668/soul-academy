import { Group } from "@/app/lib/definitions";
import './CourseStudent.css';

export default function Group({ group }: { group: Group }) {
    return (
        <div id="groupConC" className="whiteBox flex flex-col justify-flex-start items-start w-[80%] overflow-hidden">
            <h2 id="groupTitleC" className="text-xl font-bold text-center bg-blue-500 font-subtitle text-white rounded-t-lg p-2 w-full">Class Group: {group.name}</h2>
            <div id="groupStudentsConC" className="flex flex-col justify-flex-start items-start w-full min-h-10">
                {group.students?.map((student, index) => (
                    <h3 id="groupStudentC" className={`font-subtitle text-md p-2 w-full ${index % 2 == 0 ? 'bg-blue-100' : 'bg-blue-50'} ${index < (group.students?.length ?? 0) - 1 ? 'border-b border-gray-300' : ''}`} key={`groupStudentC${index}`}>{student.lastName}, {student.firstName}</h3>
                ))}
            </div>
        </div>
    )
}