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

    useEffect(() => {
        requestWrapper('private/news')
            .then((data) => setNewsList(data as TNewsItem[]))
            .catch(console.error);
    }, []);

    return (
        <div>
            {newsList.map(({ title }) => <div>{title}</div>)}
        </div>
    )
}