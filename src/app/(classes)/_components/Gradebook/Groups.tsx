import { useState } from "react";
import OpenModalButton from "@/app/(_home)/_components/OpenModalComponents/OpenModalButton";
import OpenModalTableCell from "@/app/(_home)/_components/OpenModalComponents/OpenModalTableCell";
import CreateGroupModal from "./Modals/GroupModals/CreateGroupModal";
import EditGroupModal from "./Modals/GroupModals/EditGroupModal";
import { addGroupStudent, removeGroupStudent, editGroupStudent } from "@/app/(classes)/_actions/group-actions";
import { Group, GroupFormState, Student } from "@/app/lib/definitions";
import { FaPlus } from "react-icons/fa";
import './Gradebook.css';

export default function Groups({ groups, students, courseId }: { groups: Group[], students: Student[], courseId: number }) {
    const [groupStudent, setGroupStudent] = useState<{ studentId: number, groupIdRemove: number | null } | null>(null);
    const [errors, setErrors] = useState<GroupFormState>(undefined);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, studentId: number, groupIdRemove: number | null) => {
        setGroupStudent({ studentId, groupIdRemove });
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        if (target.classList.contains('groupCellGB')) {
            target.classList.add('dragOverGB');
        } else if (target.parentElement?.classList.contains('groupCellGB')) {
            target.parentElement.classList.add('dragOverGB');
        }
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        if (!e.relatedTarget || !target.contains(e.relatedTarget as Node)) {
            target.classList.remove('dragOverGB');
        }
    }

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>, groupIdAdd: number | null) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        let classList = target.classList;
        if (classList.contains('groupCellGB')) {
            classList.remove('dragOverGB');
        } else {
            classList = target.parentElement?.classList ?? new DOMTokenList();
            if (classList.contains('groupCellGB')) {
                classList.remove('dragOverGB');
            } else {
                classList = target.parentElement?.parentElement?.classList ?? new DOMTokenList();
                if (classList.contains('groupCellGB')) {
                    classList.remove('dragOverGB');
                }
            }
        }

        const { studentId, groupIdRemove } = groupStudent ?? { studentId: 0, groupIdRemove: null };

        let result = null;
        if (!groupIdRemove) result = await addGroupStudent(groupIdAdd ?? 0, studentId, courseId);
        else if (!groupIdAdd) result = await removeGroupStudent(groupIdRemove, studentId, courseId);
        else result = await editGroupStudent(groupIdRemove, groupIdAdd, studentId, courseId);

        if (result instanceof Error) setErrors({ errors: ['Failed to add/remove/edit group student. Please try again.'] } as GroupFormState);
        else if (result && "errors" in result) setErrors(result as GroupFormState);
        
    }

    return (
        <div id="groupsConGB" className="whiteBox p-2 md:p-5 w-fit md:max-w-[55%]">
            <table id="tableGBS">
                <thead id="tableHeadGB">
                    <tr id="tableHeadRowGB" className="bg-blue-500 text-white">
                        <td className="tableCellGroupHeadGB text-lg font-bold gap-2">
                            <div className="flex justify-center items-center gap-2 px-2 py-4">
                                <h3 className="groupNameGB font-subtitle text-2xl font-bold underline">Groups</h3>
                                <OpenModalButton
                                    buttonText={<FaPlus className="text-lg" />}
                                    modalComponent={<CreateGroupModal courseId={courseId} />}
                                    cssClasses={'rounded-full p-2 bg-blue-500 border border-blue-500 text-white hover:bg-white hover:text-blue-500 transition-all duration-300 cursor-pointer'}
                                />
                            </div>
                        </td>
                        <td className="tableCellGroupHeadGB text-center ">
                            <h3 className="groupNameGB font-subtitle text-2xl font-bold">Students</h3>
                        </td>
                    </tr>
                </thead>
                <tbody id="tableBodyGB">
                    {groups.map((group, gIndex) => (
                        <tr className="tableBodyRowGB" key={`groupName${gIndex}`}>
                            <OpenModalTableCell
                                cellText={group.name}
                                modalComponent={<EditGroupModal groupId={group.id ?? 0} name={group.name ?? ''} courseId={courseId} />}
                                cssClasses={`tableCellGroupHeadGB font-subtitle text-center text-lg cursor-pointer hover:opacity-80 transition-opacity duration-300 ${gIndex % 2 == 0 ? 'bg-blue-200' : 'bg-blue-100'}`}
                            />
                            <td className="tableCellGroupGB groupCellGB">
                                <div
                                    className={`groupCellGB flex flex-wrap justify-start items-center gap-2 p-2 ${gIndex % 2 == 0 ? 'bg-blue-100' : 'bg-blue-50'}`}
                                    onDragOver={(e) => handleDragOver(e)}
                                    onDragLeave={(e) => handleDragLeave(e)}
                                    onDrop={(e) => handleDrop(e, group.id ?? null)}
                                >
                                    {group.students?.map((student, sIndex) => (
                                        <div
                                            className="studentConGB font-subtitle text-md text-center p-2 rounded-lg bg-blue-300 cursor-pointer hover:opacity-80 transition-opacity duration-300" key={`groupStudent${gIndex}-${sIndex}`}
                                            draggable="true"
                                            onDragStart={(e) => handleDragStart(e, student.id ?? 0, group.id ?? null)}
                                        >
                                            <h3 className="studentNameGB">{student.lastName}, {student.firstName}</h3>
                                        </div>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                    <tr className="tableBodyRowGB" >

                        <td className="tableCellGB bg-slate-200 font-subtitle text-lg" >No Group</td>
                        <td className={`tableCellGroupGB groupCellGB bg-slate-100`}>
                            <div
                                className="groupCellGB flex flex-wrap justify-start items-center gap-2 p-2"
                                onDragOver={(e) => handleDragOver(e)}
                                onDragLeave={(e) => handleDragLeave(e)}
                                onDrop={(e) => handleDrop(e, null)}
                            >
                                {students
                                    .filter(student => {
                                        return !groups?.some(group => group.students?.some(groupStudent => groupStudent.id === student.id))
                                        // return !groups?.some(group => group.students?.some(groupStudent => (groupStudent.firstName ?? '' === student.firstName ?? '' ) && (groupStudent.lastName ?? '' === student.lastName ?? '')))
                                        // return student.id === 1;})
                                    })
                                    .map((student, index) => (
                                        <div
                                            className="studentConGB font-subtitle text-md p-2 rounded-lg text-center bg-slate-300 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                                            key={`studentConGB${index}`}
                                            draggable="true"
                                            onDragStart={(e) => handleDragStart(e, student.id ?? 0, null)}
                                        >
                                            <h3 className="studentNameGB">{student.lastName}, {student.firstName}</h3>
                                        </div>
                                    ))}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
        </div>
    )
}