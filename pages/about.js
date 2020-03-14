import Link from 'next/link';
import { useSelector } from 'react-redux';
export default function About() {

    const employeeState = useSelector(state => state.employees);

    return <>
        <h1>About</h1>
        <Link href="/">Home</Link>
        {
            employeeState.data && <ul>
                {employeeState.data.data.map((e, i) => <li key={i}>{e.employee_name}</li>)}
            </ul>
        }
    </>
}