import React, { useEffect, useState } from 'react';

const useSuperAdmin = (email) => {
    const [isSuperAdmin, setSuperIsAdmin] = useState("")
    const [superAdminLoading, setSuperAdminLoading] = useState(true)
    useEffect(() => {
        fetch(`http://localhost:5000/users/status?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data?.role === "superAdmin") {
                    setSuperIsAdmin(data?.role)

                    setSuperAdminLoading(false)
                }
                else {
                    setSuperIsAdmin(false)
                    setSuperAdminLoading(false)
                }

            })
    }, [email])
    return [isSuperAdmin, superAdminLoading]
};

export default useSuperAdmin;