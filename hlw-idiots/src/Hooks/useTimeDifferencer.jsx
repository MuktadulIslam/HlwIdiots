const timeDifferencer = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const differenceInMs = endDate - startDate;

    const differenceInSeconds = Math.floor(differenceInMs / 1000);

    const minutes = Math.floor(differenceInSeconds / 60);
    const seconds = differenceInSeconds % 60;

    return `${minutes} min ${seconds} sec`;
};

export default timeDifferencer;