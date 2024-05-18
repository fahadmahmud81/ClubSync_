import React, { useEffect, useState } from 'react';

const useAdmin = (email) => {
    const [isAdmin, setIsAdmin] = useState("")
    const [adminLoading, setAdminLoading] = useState(true)
    useEffect(() => {
        fetch(`http://localhost:5000/users/status?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data?.role === "admin") {
                    setIsAdmin(data?.role)

                    setAdminLoading(false)
                }
                else {
                    setIsAdmin(false)
                    setAdminLoading(false)
                }

            })
    }, [email])
    return [isAdmin, adminLoading]
};

export default useAdmin;
