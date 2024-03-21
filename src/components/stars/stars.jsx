import React from 'react';
import Rating from '@mui/material/Rating';

const Stars = ({ revData }) => {
    
    const visibleReviews = revData.filter(rev => rev.isVisible);
    const totalPunctuation = visibleReviews.reduce((sum, review) => sum + review.punctuation, 0);
    const promedi = totalPunctuation / visibleReviews.length;

    return (
        <div>
            <Rating name="half-rating-read" defaultValue={0} value={promedi} precision={0.5} readOnly />
        </div>
    );
}

export default Stars;

