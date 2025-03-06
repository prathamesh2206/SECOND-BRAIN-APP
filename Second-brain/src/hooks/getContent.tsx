import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState, useEffect, useCallback } from "react";

interface Content {
    _id?: string;
    title: string;
    link: string;
    type: "youtube" | "twitter";
    tags: {
      _id?: string;
      title: string;
    }[];
    userId?: {
      _id: string;
      username: string;
    };
}

export function useContent() {
    const [content, setContent] = useState<Content[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const fetchContent = useCallback(async () => {
        // Get Authorization token
        const token = localStorage.getItem("Authorization");
        
        // Early return if no token
        if (!token) {
            setError("No authorization token found");
            return [];
        }

        try {
            setLoading(true);
            setError(null);
            
            const response = await axios.get(`${BACKEND_URL}/content`, {
                headers: { Authorization: token },
                timeout: 10000
            });
            
            if (response.data && Array.isArray(response.data.contents)) {
                setContent(response.data.contents);
                return response.data.contents;
            } else {
                throw new Error("Invalid response format");
            }
        } catch (err: any) {
            let errorMessage = "An unexpected error occurred";
            
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    errorMessage = err.response.data.message || `Server error: ${err.response.status}`;
                } else if (err.request) {
                    errorMessage = "No response received from server";
                } else {
                    errorMessage = "Error setting up the request";
                }
            } else {
                errorMessage = err.message || errorMessage;
            }
            
            setError(errorMessage);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    // Use fetchContent in the dependency array
    useEffect(() => {
        fetchContent();
    }, [fetchContent]);

    return {
        content,
        loading,
        error,
        fetchContent
    };
}