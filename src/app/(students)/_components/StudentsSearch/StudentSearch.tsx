'use client';

import { useState } from "react";
import Header from "./Header";
import Search from "./Search";
import Students from "./Students";
import { Student } from "@/app/lib/definitions";

export default function StudentSearch({ studentsData }: { studentsData: Student[] }) {
    const [students, setStudents] = useState<Student[]>(studentsData);
    
    return (
        <div id='studentsCon' className="flex flex-col justify-start items-center gap-2 py-5">
            <div id="headerConSS" className="flex flex-col justify-start items-center gap-2 w-full">
                <Header />
                <Search setStudents={setStudents} />
            </div>
            <Students students={students} />
        </div>

    );
}

