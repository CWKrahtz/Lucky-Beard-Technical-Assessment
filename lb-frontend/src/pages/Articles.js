import { useEffect, useState } from 'react';
import Axios from 'axios';
import Navigation from '../components/nav/navigation';
import './Articles.css';
import ArticleCard from '../components/article-cards/article-card';

import Beardatorium from '../assets/icons/beardatorium.png';
import Notice from '../assets/icons/notice.png';
import Launchpad from '../assets/icons/launchpad.png';
import TeamBuild from '../assets/icons/teambuild.png';
import { useLocation, useNavigate } from 'react-router-dom';

function Article() {

    const [article, setArticles] = useState();
    const [articleHeader, setArticlesHeader] = useState([]);
    const [articleBody, setArticlesBody] = useState([]);
    const [articleBodySide, setArticlesBodySide] = useState([]);
    const [articleRest, setArticleRest] = useState([]);
    const [icon, setIcon] = useState([]);
    const location = useLocation();

    //All
    useEffect(() => {

        setArticles([]);
        setArticlesHeader([]);
        setArticlesBody([]);
        setArticlesBodySide([]);
        setArticleRest([]);

        Axios.get('http://localhost:4000/')
            .then(
                res => {
                    const articleData = res.data.sort((a, b) => a.id - b.id);
                    setArticlesHeader(articleData.slice(0, 3));
                    setArticlesBody(articleData.slice(3, 4));
                    setArticlesBodySide(articleData.slice(4, 8));
                    setArticles(articleData);
                    setArticleRest(articleData.slice(8));

                    const bodyside = articleData.slice(3, 8)

                    for (let index = 0; index < bodyside.length; index++) {
                        if (bodyside[index].category === 'Notice') {
                            icon[index] = Notice
                        } else if (bodyside[index].category === 'Beardatorium') {
                            icon[index] = Beardatorium
                        } else if (bodyside[index].category === 'Launchpad') {
                            icon[index] = Launchpad
                        } else {
                            icon[index] = TeamBuild
                        }
                    }
                }
            )
            .catch(
                err => console.log(err)
            )
    }, [location.key]);

    const navigate = useNavigate();

    const goSingle = (article) => {
        navigate("/article", { state: { cardData: article } });
    };

    return (
        <div className='article-background'>
            <div className="article-container">
                <Navigation />
                <div className='article-page'>
                    <div className='article-intro'>
                        <h1>
                            The Bearded Blogger
                        </h1>
                        <div className="article-intro-body">
                            <h3>
                                CREATIVITY | CULTURE | COLLABORATION
                            </h3>
                            <p>
                                Get a behind-the-scenes look at the day-to-day life
                                of our creative team! From inspiring projects and
                                team-building moments to the latest company news, our
                                blog shares the stories, insights, and fun that fuel our
                                creative agency.
                            </p>
                        </div>
                    </div>
                    <div className="article-card-header">
                        {articleHeader?.map(article => (
                            <div className="article-card" key={article.id}>
                                <ArticleCard cardData={article} />
                            </div>
                        ))}
                    </div>

                    {articleBody.length > 0 && (
                        <div className='article-card-body'>
                            <div className='article-card-body-left'>
                                <img className='article-card-body-img' src={articleBody[0].image} style={{width: '100%', objectFit: 'cover'}}  />
                                <div className='article-card-body-info'>
                                    <img src={icon[0]} className='article-card-body-icon' />
                                    <div className='article-card-body-cat'>{articleBody[0]?.category}</div>
                                    <div>|</div>
                                    <div className='article-card-body-date'>{articleBody[0]?.published_at}</div>
                                </div>
                                <div className='article-card-body-title'>{articleBody[0]?.title}</div>
                            </div>
                            <div className='article-card-body-right'>
                                {articleBodySide.map((article, index) => (
                                    <div className='article-body-side' key={index} onClick={() => goSingle(article)}>
                                        <div className='article-body-info'>
                                            <img src={icon[index + 1]} className='article-body-icon' />
                                            <div className='article-body-cat'>{article?.category}</div>
                                            <div>|</div>
                                            <div className='article-body-date'>{article?.published_at}</div>
                                        </div>
                                        <div className='article-body-title'>{article?.title}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className='article-card-rest'>
                        {articleRest?.map(article => (
                            <div key={article.id}>
                                <ArticleCard cardData={article} />
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </div>
    );
}

export default Article;
