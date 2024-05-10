import axios from 'axios';
import { useState, useEffect } from 'react';
import { getEmail } from '../helper/helper';

axios.defaults.baseURL = "http://localhost:8070";

/** Custom hook */
export default function useFetch(query) {
    const [getData, setData] = useState({ isLoading: false, apiData: undefined, status: null, serverError: null });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true }));

                const { email } = await getEmail();
                let data, status;

                if (email && query) {
                    const response = await axios.get(`/api/${query}`);
                    data = response.data;
                    status = response.status;
                } else if (email) {
                    const response = await axios.get(`/api/user/${email}`);
                    data = response.data;
                    status = response.status;
                } else if (query) {
                    const response = await axios.get(`/api/${query}`);
                    data = response.data;
                    status = response.status;
                } else {
                    throw new Error("Both email and query are missing.");
                }

                setData(prev => ({ ...prev, isLoading: false, apiData: data, status: status }));
            } catch (error) {
                console.error("Error fetching data:", error);
                setData(prev => ({ ...prev, isLoading: false, serverError: error }));
            }
        };

        fetchData();
    }, [query]);

    return [getData, setData];
}
