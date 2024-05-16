import React, { useEffect, useState } from 'react';

const useClubAdmin = (email) => {
    const [isClubAdmin, setIsClubAdmin] = useState("")
    const [clubAdminLoading, setClubAdminLoading] = useState(true)
    useEffect(() => {
        fetch(`http://localhost:5000/users/status?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data?.role === "student" || data?.role === "superAdmin") {
                    setIsClubAdmin(false)
                    setClubAdminLoading(false)
                }
                else {
                    setIsClubAdmin(data?.role)
                    setClubAdminLoading(false)
                }


            })
    }, [email])
    return [isClubAdmin, clubAdminLoading]
};

export default useClubAdmin;