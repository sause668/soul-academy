import { useState } from "react";
import { Student } from "@/app/lib/definitions";
import { sortStudents } from "@/app/lib/grading";
import { useRouter } from "next/navigation";
import "./StudentSearch.css";

export default function Students({ students }: { students: Student[] }) {
    const [rowHighlight, setRowHighlight] = useState(-1);
    const router = useRouter();
    return (
        <div id="tableConSS" className="whiteBox overflow-hidden">
            <table id="tableSS">
                <thead id="tableHeadSS">
                    <tr className="tableHeadRowCC">
                        <td className="tableCellSS tableHeadCellSS">Last Name</td>
                        <td className="tableCellSS tableHeadCellSS">First Name</td>
                        <td className="tableCellSS tableHeadCellSS">Grade</td>
                    </tr>
                </thead>
                <tbody id="tableBodySS">
                    {students.sort((s1, s2) => sortStudents(s1, s2)).map((student, index) => {
                        const studentInfo = [student.lastName, student.firstName, student.currentGrade]
                        const isLastRow = index === students.length - 1;
                        return (
                            <tr
                                className="tableBodyRowCC"
                                key={`studentSearchTable${index}`}
                                onClick={() => router.push(`/students/${student.id}`)}
                            >
                                {studentInfo.map((info, index2) => (
                                    <td
                                        key={`studentInfo${index}-${index2}`}
                                        className={`tableCellSS tableBodyCellSS ${index === rowHighlight && 'cellHighlightSS'} ${isLastRow ?? 'border-b'}`}
                                        onMouseOver={() => setRowHighlight(index)}
                                        onMouseLeave={() => setRowHighlight(-1)}
                                    >{info}</td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}