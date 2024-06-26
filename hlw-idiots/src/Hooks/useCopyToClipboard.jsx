import toast from 'react-hot-toast';

const useCopyToClipboard = () => {
    const copyToClipboardHandler = textToCopy => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                toast("Link copied to clipboard");
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }

    return copyToClipboardHandler;
};

export default useCopyToClipboard;