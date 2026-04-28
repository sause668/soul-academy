import { useRouter } from 'next/navigation';
import { MdEdit } from 'react-icons/md';
import { Group, Student } from '@/app/lib/definitions';

export default function Groups({ groups, students, courseId, isTeacher }: { groups: Group[], students: Student[], courseId: number, isTeacher: boolean }) {
    const router = useRouter();
    const groupedStudents: number[] = [];
    return (
        <div id="groupConC" className="whiteBox w-[90%] xs:w-[85%] sm:w-[80%] md:w-[85%] 2xl:w-[80%] overflow-hidden">
            <div className="subTitleConC p-2 flex justify-between items-center bg-blue-500 text-white rounded-t-lg text-center">
                <h2 className="subTitleC font-subtitle text-xl font-bold">Class Groups</h2>
                {isTeacher && (
                    <div id="groupEditConC"
                        onClick={(e) => { e.stopPropagation(); router.push(`/gradebook/${courseId}#groupsConGB`) }}
                        className="text-2xl bg-blue-500 text-white rounded-full p-1 cursor-pointer hover:bg-white hover:text-blue-500 transition-all duration-300">
                        <MdEdit />
                    </div>
                )}
            </div>
            <div className="groupListConC">
                {groups.map((group, index) => (
                    <div id="groupConC" className={`flex justify-between items-center gap-2 p-2 ${index % 2 == 0 ? 'bg-blue-100' : 'bg-blue-50'} border-b border-gray-300`} key={`groupConC${index}`}>
                        <h3 className="groupNameC font-subtitle text-lg font-bold">{group.name}</h3>
                        <div className="groupStudentsConC">
                            {group.students?.map((student, index) => {
                                groupedStudents.push(student.id ?? 0);
                                return (
                                <div id="studentConC" className="flex justify-between items-center gap-2 p-2" key={`studentConC${index}`}>
                                    <h3 className="studentNameC font-body text-md ">{student.lastName}, {student.firstName}</h3>
                                </div>
                            )})}
                        </div>
                    </div>
                ))}
                <div id="noGroupConC" className="flex justify-between items-center gap-2 p-2 bg-gray-100 rounded-lg text-center">
                    <h3 className="noGroupNameC font-subtitle text-lg font-bold">No Group</h3>
                    <div className="noGroupStudentsConC">
                        {students.filter(student => !groupedStudents.includes(student.id ?? -1)).map((student, index) => (
                            <div id="studentConC" className="flex justify-between items-center gap-2 p-2" key={`studentConC${index}`}>
                                <h3 className="studentNameC font-body text-md ">{student.lastName}, {student.firstName}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}