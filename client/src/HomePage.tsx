import { useEffect, useState } from "react";
import { requestWrapper } from "./requestWrapper";

type TNewsItem = {
    id: string;
    title: string;
    image: string;
    content: string;
};

export const HomePage = () => {
    const [newsList, setNewsList] = useState<TNewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        requestWrapper('private/news')
            .then((data) => {
                return new Promise<TNewsItem[]>((resolve) => {
                    setTimeout(() => {
                        setNewsList(data as TNewsItem[]);
                        resolve(data as TNewsItem[]);
                    }, 2000);
                });
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div>Загрузка...</div>
    }

    return (
        <div>
            {newsList.map((newsItem) => (
                <div key={newsItem.id}>
                    <h3>{newsItem.title}</h3>
                    <img 
                    src={newsItem.image} 
                    width="100%" 
                    height="100%" />
                    <p>{newsItem.content}</p>
                </div>
            ))}
        </div>
    )
}