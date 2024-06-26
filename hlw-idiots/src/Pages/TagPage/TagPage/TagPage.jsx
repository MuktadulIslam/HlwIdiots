import { useLoaderData } from 'react-router-dom';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import QuestionFetchForm from '../../QuestionFetchForm/QuestionFetchForm/QuestionFetchForm';

const TagPage = () => {
    const tag = useLoaderData();

    return (
        <div>
            <div className="card">
                <SectionTitle title={`${tag.name}`} />

                <QuestionFetchForm />
            </div>
        </div>
    );
};

export default TagPage;