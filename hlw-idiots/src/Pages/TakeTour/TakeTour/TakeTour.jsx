import { Link, Navigate, useLocation } from "react-router-dom";
import { GrAnnounce } from "react-icons/gr";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import user1 from "../../../assets/images/user/user1.jpg";
import user6 from "../../../assets/images/user/user6.jpg";
import user5 from "../../../assets/images/user/user5.jpg";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const TakeTour = () => {
    const { user } = useAuth();
    const location = useLocation();
    const destination = location.state?.form || "/auth/register";

    if (user) {
        return <Navigate to={destination} replace="true"></Navigate>;
    }

    const colleges = ['নটর ডেম কলেজ', 'হলিক্রস কলেজ', 'সেন্ট জোসেফ কলেজ'];

    const collegeQuestions = [
        {
            questionType: 'সাময়িক পরীক্ষা',
            college: 'ঢাকা কলেজ'
        },
        {
            questionType: 'বার্ষিক পরীক্ষা',
            college: 'নটর ডেম কলেজ'
        },
        {
            questionType: 'বার্ষিক পরীক্ষা',
            college: 'রাজশাহী সরকারি কলেজ'
        },
        {
            questionType: 'সাপ্তাহিক পরীক্ষা',
            college: 'পাংসা সরকারি কলেজ'
        },
        {
            questionType: 'নির্বাচনী পরীক্ষা',
            college: 'পাংসা সরকারি কলেজ'
        },
        {
            questionType: 'সাপ্তাহিক পরীক্ষা',
            college: 'আব্দুল কাদির মোল্লা সিটি কলেজ, নরসিংদী'
        },
        {
            questionType: 'বার্ষিক পরীক্ষা',
            college: 'রাজশাহী সরকারি কলেজ'
        },
        {
            questionType: 'সাময়িক পরীক্ষা',
            college: 'ঢাকা কলেজ'
        },
        {
            questionType: 'বার্ষিক পরীক্ষা',
            college: 'নটর ডেম কলেজ'
        }
    ];

    const toppers = [
        {
            topperImg: user5,
            name: 'সাব্বির',
            college: 'সৈয়দ হাতেম আল কলেজ, বরিশাল'
        },
        {
            topperImg: user1,
            name: 'আফরি',
            college: 'রংপুর সরকারি কলেজ'
        },
        {
            topperImg: user6,
            name: 'হাসান',
            college: 'নটর ডেম কলেজ'
        }
    ];

    return (
        <div className="grid gap-4 pb-4">
            <Helmet>
                <title>Hlw Idiots | Take a tour</title>
            </Helmet>

            {/* overlay */}
            <div className="w-full h-full fixed top-0 left-0 bg-white/20 backdrop-blur-sm p-6">
                <div className="flex gap-3">
                    <GrAnnounce className="w-16 h-16 md:w-10 md:h-10 text-[#F06565]" />

                    <div className="card-white text-sm">
                        <p>
                            হ্যালো ইডিয়ট,
                            তোমাকে সার্ভ করতে আমরা প্রস্তুত!
                            দ্রুত রেজিস্ট্রেশন করে ফেলো!
                        </p>

                        <Link to={"/auth/login"} className="text-[#1E42FF]">Click Here...</Link>
                    </div>
                </div>
            </div>

            {/* Most Solved College */}
            <div className="card">
                <SectionTitle title={"Most Solved College"} />

                <div className="grid gap-2">
                    {
                        colleges.map((college, index) => <Link key={index} className="card-sm">{college}</Link>)
                    }
                </div>
            </div>

            {/* daily topper */}
            <div className="grid grid-cols-3 gap-5">
                {
                    toppers.map((topper, index) => <div key={index} className="flex flex-col items-center gap-2">
                        <img src={topper.topperImg} alt="" className="md:w-1/2 rounded-full" />

                        <div className="text-center">
                            <h4 className="text-sm font-semibold mb-1">{topper.name}</h4>
                            <p className="text-xs">{topper.college}</p>
                        </div>
                    </div>)
                }
            </div>

            {/* Most Solved Questions */}
            <div className="card">
                <SectionTitle title={"Most Solved Questions"} />

                <div className="grid grid-cols-3 gap-2">
                    {
                        collegeQuestions.map((collegeQuestion, index) => <Link key={index} className="card-sm">
                            <h4 className="text-sm font-semibold">{collegeQuestion.questionType}</h4>
                            <p className="text-xs">{collegeQuestion.college}</p>
                        </Link>)
                    }
                </div>
            </div>
        </div>
    );
};

export default TakeTour;