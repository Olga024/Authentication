import { useEffect, useState } from "react";
import { requestWrapper } from "./requestWrapper";
import { Loader } from "./components/Loader";

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
        return <Loader />
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Новости</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsList.map((newsItem) => (
                    <div
                        key={newsItem.id}
                        className="overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                    >
                        <div className="aspect-video overflow-hidden bg-gray-100">
                            <img
                                src={newsItem.image}
                                alt={newsItem.title}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>

                        <div className="p-5">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                                {newsItem.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                                {newsItem.content}
                            </p>

                            <button
                                className="bg-lime-500 hover:bg-lime-600 text-white font-medium py-1.5 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md"
                                onClick={() => console.log("Read news:", newsItem.id)}
                            >
                                Читать далее
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}