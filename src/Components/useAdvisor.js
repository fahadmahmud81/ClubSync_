import React, { useEffect, useState } from 'react';

const useAdvisor = (email) => {
    const [isAdvisor, setIsAdvisor] = useState("")
    const [advisorLoading, setAdvisorLoading] = useState(true)
    useEffect(() => {
        fetch(`http://localhost:5000/users/status?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data?.role === "advisor") {
                    setIsAdvisor(data?.role)

                    setAdvisorLoading(false)
                }
                else {
                    setIsAdvisor(false)
                    setAdvisorLoading(false)
                }

            })
    }, [email])
    return [isAdvisor, advisorLoading]
};

export default useAdvisor;
