import spinner from '../assets/images/loader/spinner.gif';

const Spinner = () => {
    return (
        <div className="flex justify-center">
            <img src={spinner} alt="" className="max-w-[550px]" />
        </div>
    );
};

export default Spinner;