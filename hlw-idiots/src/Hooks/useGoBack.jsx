const useGoBack = () => {
    const goback = () => {
        window.history.back();
    };

    return { goback };
};

export default useGoBack;