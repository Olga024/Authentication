export const requestWrapper = (
    path: string,
    opts?: {
        method: string,
        body?: string,
    }
) => new Promise((resolve, reject) => {
    const options: any = {
        ...opts,
    }

    const token = localStorage.getItem('token');
    if (token) {
        options.headers = {
            'Authorization': `Bearer ${token}`,
        };
    }

    fetch(`http://localhost:7070/${path}`, options)
        .then((resp) => resp.json())
        .then((data) => {
            resolve(data as unknown);
        })
        .catch((err) => {
            reject(err);
        })
});