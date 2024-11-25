import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { htmlToText } from 'html-to-text';
import LinesEllipsis from 'react-lines-ellipsis';
import './article-card.css';

import Beardatorium from '../../assets/icons/beardatorium.png';
import Notice from '../../assets/icons/notice.png';
import Launchpad from '../../assets/icons/launchpad.png';
import TeamBuild from '../../assets/icons/teambuild.png';
import Arrow from '../../assets/icons/arrow-right.png';
import { useNavigate } from 'react-router-dom';

function ArticleCard(props) {

    const { cardData } = props;

    const sanitizedContent = DOMPurify.sanitize(cardData.content);

    // Convert sanitized HTML to plain text
    const plainText = htmlToText(sanitizedContent, {
        wordwrap: false, // Keeps the text unwrapped for better control
    });

    if (cardData.category === 'Notice') {
        var icon = Notice;
    } else if (cardData.category === 'Beardatorium') {
        var icon = Beardatorium;
    } else if (cardData.category === 'Launchpad') {
        var icon = Launchpad
    } else {
        var icon = TeamBuild;
    }

    const navigate = useNavigate();

    const goSingle = () => {
        navigate("/article", { state: { cardData } });
    };

    return (
        <div className='card-container'>
            <img className='card-image' style={{
                backgroundImage: cardData.image ? `url(${cardData.image})` : 'url(../../assets/images/clock.png)'
            }} />
            <div className='card-context'>
                <div className='card-info'>
                    <img src={icon} alt="icon" />
                    <div className='card-info-body'>
                        <div className='card-info-cat'>{cardData.category}</div>
                        <div>|</div>
                        <div>{cardData.published_at}</div>
                    </div>
                </div>
                <LinesEllipsis
                    className='card-title'
                    text={cardData.title}
                    maxLine='1'
                    ellipsis='...'
                    trimRight
                    basedOn='words'
                />

                <LinesEllipsis
                    className='card-sum'
                    text={plainText}
                    maxLine='3'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                />

                <div className='card-btn-container'>
                    <div className='card-btn' onClick={goSingle}>
                        <p>Read more</p>
                        <img src={Arrow} alt='View' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleCard;