const videoLink = (videoUrl: string | undefined) => {
    if (videoUrl) {
        return `https://img.youtube.com/vi/${videoUrl}/0.jpg`;
    }
}
export default videoLink