import React from "react";
import './Card.css';

interface ICard {
    imageSrc: string,
    heading: string,
    subText1: string | false,
    subText2: string | false,
    description: string
}

/* Reusable Card component that accepts props */
export const Card = (props: ICard) => {
    // Destructure the props
    const { imageSrc, heading, subText1, subText2, description } = props;
    return (
        <div className="card">
            <img src={imageSrc} alt={heading} className="card__image" />
            <div className="card__body">
                <div className="card__subText">
                    {subText1 && <p className="card__subText__line1">{subText1}</p>}
                    {subText2 && <p className="card__subText__line2">{subText2}</p>}
                </div>
                <div className="card__description">
                    <div className="card__description__header">{heading}</div>
                    <div className="card__description__subHeader">{description}</div>
                </div>
            </div>
        </div>
    )
}