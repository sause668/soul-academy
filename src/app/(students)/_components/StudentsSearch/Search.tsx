import { useState } from "react";
import { Student } from "@/app/lib/definitions";
import { getStudentsSearchData } from "../../_actions/student-actions";
import './StudentSearch.css';

export default function Search({ setStudents }: { setStudents: (students: Student[]) => void }) {
    const [search, setSearch] = useState('');
  const [searchDelay, setSearchDelay] = useState(setTimeout(()=>null, 5000))
  const [errors, setErrors] = useState<string>('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(searchDelay);
        setSearch(e.target.value);
        setSearchDelay(setTimeout(()=>studentSearch(e.target.value), 250));
      }
    
      const studentSearch = async (searchStr: string) => {
        const studentsSearchData = await getStudentsSearchData(searchStr);
        if (studentsSearchData instanceof Error) setErrors(studentsSearchData.message);
        else setStudents(studentsSearchData);
      }
    return (
        <div id="searchConSS" className="whiteBox p-2 text-lg">
            <input
                type="text"
                name="studentSearch"
                id="searchInputSS"
                className="formInput border-none hover:border-none focus:border-none focus:outline-none"
                placeholder="Search"
                value={search}
                onChange={handleSearch}
            />
            {errors && <p className="labelTitle error">{errors}</p>}
        </div>
    )
}