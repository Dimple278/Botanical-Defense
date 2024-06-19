export const getImage = (path: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => {
            console.log("image loaded");
            resolve(img);
        };
        img.onerror = (e) => {
            reject(e);
        };
        img.src = path;
    });
};
