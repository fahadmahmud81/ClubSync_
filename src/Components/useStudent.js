import React, { useEffect, useState } from 'react';

const useStudent = (email) => {
    const [isStudent, setIsStudent] = useState("")
    const [studentLoading, setStudentLoading] = useState(true)
    useEffect(() => {
        fetch(`http://localhost:5000/users/status?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data?.role === "student") {
                    setIsStudent(data?.role)

                    setStudentLoading(false)
                }
                else {
                    setIsStudent(false)
                    setStudentLoading(false)
                }

            })
    }, [email])
    return [isStudent, studentLoading]
};

export default useStudent;