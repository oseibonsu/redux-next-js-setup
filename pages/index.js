import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../redux';

const { getEmployees } = Actions;

export default function Index() {
    const dispatch = useDispatch();
    const employeeState = useSelector(state => state.employees);

    console.log(employeeState);

    useEffect(() => {
        employeeState.data || dispatch(getEmployees())
    }, [])


    return <>
        <h1>Home Page</h1>
        <Link href="/about">About</Link>
        {
            employeeState.loading && <h1>Loading</h1>
        }
        {
            employeeState.data && <ul>
                {employeeState.data.data.map((e, i) => <li key={i}>{e.employee_name}</li>)}
            </ul>
        }
    </>
}
