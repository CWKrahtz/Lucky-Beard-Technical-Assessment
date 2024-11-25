import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import DOMPurify from 'dompurify';
import { useLocation, useNavigate } from "react-router-dom";
import './SingleArticle.css';
import Navigation from '../../components/nav/navigation';

import Beardatorium from '../../assets/icons/beardatorium.png';
import Notice from '../../assets/icons/notice.png';
import Launchpad from '../../assets/icons/launchpad.png';
import TeamBuild from '../../assets/icons/teambuild.png';
import ArticleCard from '../../components/article-cards/article-card';

function ArticleSingle() {

    const location = useLocation();
    const { cardData } = location.state || {};
    const articleData = cardData;

    const sanitizedContent = DOMPurify.sanitize(articleData.content);

    var icon = TeamBuild;

    const [articleRest, setArticleRest] = useState([]);

    useEffect(() => {

        setArticleRest([]);

        Axios.get(`http://localhost:4000/category/${articleData.category}`)
            .then(
                res => {
                    const related = res.data.sort((a, b) => a.id - b.id);
                    setArticleRest(related.slice(0, 3));

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

    if (articleData.category === 'Notice') {
        icon = Notice;
    } else if (articleData.category === 'Beardatorium') {
        icon = Beardatorium;
    } else if (articleData.category === 'Launchpad') {
        icon = Launchpad;
    } else {
        icon = TeamBuild;
    }

    return (
        <div className='article-container-single'>
            <Navigation />
            <img className='article-single-banner' src={articleData?.image} style={{width: '100%', height: '100%', objectFit: 'cover'}}  />
            <div className='single-context'>
                <div className='single-left'>
                    <div className='single-author'>
                        <div className='single-label'>Author</div>
                        <div className='single-answer'>{articleData.author}</div>
                    </div>
                    <div className='single-when'>
                        <div className='single-label'>Date</div>
                        <div className='single-answer'>{articleData.published_at}</div>
                    </div>
                    <div className='single-info'>
                        <div className='single-label'>Category</div>
                        <div className='single-info-content'>
                            <img src={icon} alt='Icon' />
                            <div className='single-answer'>{articleData.category}</div>
                        </div>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} className='single-right' />
            </div>
            <hr className='hr-line' />
            <h2 className='related-articles'>Related articles</h2>
            <div className='single-card-related'>
                {articleRest?.map(article => (
                    <div className="single-card" key={article.id}>
                        <ArticleCard cardData={article} />
                    </div>
                ))}
            </div>
        </div >
    );
}

export default ArticleSingle;