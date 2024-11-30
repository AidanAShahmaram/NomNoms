import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './RestaurantCard.css'

const RestaurantCard = ({ title, pic, weblink, address, phone, ratingInit, tags, id, user }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isComments, setIsComments] = useState(false);
    const [rating, setRating] = useState(ratingInit);
    // must track in case there is an error when grabbing data from the database
    const [error, setError] = useState(null);
    const [userRating, setUserRating] = useState(null);
    // these next few variables are all related to comments (errors are stored in the same way as the other errors)
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [numVisibleComments, setNumVisibleComments] = useState(3);
    
    //switch on and off expansion toggle
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    
    //switch on and off comments toggle
    const toggleComments = () => {
        setIsComments(!isComments);
    };

    const updateMyRating = (newRating) => {
        setUserRating(newRating);
        updateUserRating(newRating);
    }

    //NEED TO ADD THE PROPER API LINKS!!!
    const updateUserRating = async (newRating) => {
        try {
            // update the current user's rating on the server
            // id is the restaurant's id
            const response = await fetch('/api/restaurants/${id}/userrating', {
                // this could be PUT depending on our database design
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.id, rating: newRating }),
            });
            if (!response.ok) {
                throw new Error("Error Updating User's Rating");
            }
            // Update the card's displayed rating
            // grab rating from the backend
            const ratingResponse = await fetch('/api/restaurants/${id}/rating');
            if (!ratingResponse.ok) {
                throw new Error('Error While Fetching New Restaurant Rating');
            }
            const { rating } = await ratingResponse.json();
            setRating(rating);
        } catch (err) {
            setError(err.message);
        }
    };
    

    const renderStars = (rating) => {
        // Get the number of full stars by integer
        const fullStars = Math.floor(rating); 
        // Get the leftover amount of stars
        const halfStars = rating % 1 !== 0 ? 1 : 0;  
        // The remaining stars will be empty
        const emptyStars = 5 - fullStars - halfStars;  
        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push("★");
        }
        if (halfStars) {
            stars.push("✯");
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push("☆");
        }
        return stars.join("");
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch('/api/restaurants/${id}/comments');
                if (!response.ok) {
                    throw new Error('Error While Fetching Comments');
                }
                const data = await response.json();
                setComments(data.comments);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchComments();
    }, [id]);

    const addComment = async () => {
        // don't bother with blank comments
        if (!newComment.trim()) {
            return;
        } 

        try {
            const response = await fetch('/api/restaurants/${id}/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, comment: newComment }),
            });
            if (!response.ok) throw new Error('Error submitting comment');

            const data = await response.json();
            // append the new comments
            setComments((prevComments) => [...prevComments, data.newComment]);
            setNewComment('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="restaurant-card">
            <h1 className="title">{title}</h1>
            
            {/*Tags - they are an array prop*/}
            {/*Tags className is labels - they are an array prop*/}
            <div className="labels">
                {tags.length > 0 ? (
                tags.map((tag, index) => (
                    <span key={index} className="label">
                        {tag}
                    </span>
                    ))
                ) : (
                <p0>Tags Unavailable</p0>
                )}
            </div>
            
            <div className="rating">
                <div className="averageRating"><i>Average Rating:</i> { } {renderStars(rating)}</div>
                {/*Add your rating if you are signed in*/}
                {user && (
                            <div className="yourRating"><i>{user}'s Rating:</i> { }
                            {[1, 2, 3, 4, 5].map(chosenStars => (
                                <span key={chosenStars} onClick={() => updateMyRating(chosenStars)} style={{ cursor: 'pointer' }}>
                                    {/*Indicates what stars should be filled in or not*/}
                                    {chosenStars <= userRating ? "★" : "☆"}
                                </span>
                            ))}
                            </div>
                    )}
            </div>
            
            <img src={pic} alt={title} className="pic" />

            {/* Expansion Button */}
            {isExpanded ? (
                <div className="additional">
                    {/*Explains how it should open the other webpage*/}
                    <a href={weblink} target="_blank" rel="noopener noreferrer" className="link">Visit Their Website</a>
                    <div className="address"><b>Location:</b> {address}</div>
                    <div className="phone"><b>Phone Number:</b> {phone}</div>
                </div>
            ) : (
                <div className="add-additional">
                </div>
            )}
            <button onClick={toggleExpand} className="expand-button">
                {isExpanded ? 'Show Less' : 'Show More'}
            </button>

            {/* Comments Section*/}
            {/* Comments Expansion Button */}
            {isComments ? (
                <div className="comments-section">
                    <div className="comments-header">Comments</div>
                    <div className="comment-list">
                        {/*If there are no comments*/}
                        {comments.length === 0 ? (
                            <div className="comment">There are no comments! Be the first!</div>
                            ) : (
                                comments.slice(0, numVisibleComments).map((comment, i) => (
                                    <div key={i} className="comments">
                                        <div className="comment"><b>{comment.userName}:</b> {comment.text}</div>
                                    </div>
                                ))
                            )
                        }
                    </div>

                    {/* see more comments section */}
                    {comments.length > numVisibleComments && (
                    <button onClick={() => setNumVisibleComments(numVisibleComments + 3)} className="more-comments-button">
                        Show More Comments?
                    </button>
                    )}

                    {user && (
                        <div className="add-comment">
                            <textarea cols="60" rows="auto"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="...WRITE.A.COMMENT..."
                            />
                            <button onClick={addComment} className="submit-comment">Submit Comment</button>
                        </div>
                    )}
                </div>
                ) : (
                    <div className="comments-additional">
                        {/*This just adds space without CSS*/}
                        <p></p>
                    </div>
                )
            }
            <button onClick={toggleComments} className="comments-button">
                {isComments ? 'Close Comments' : 'Show Comments'}
            </button>
        </div>
    );
};

RestaurantCard.propTypes = {
    title: PropTypes.string.isRequired,
    pic: PropTypes.string.isRequired,
    weblink: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    ratingInit: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string.isRequired,
    user: PropTypes.object
};
  
export default RestaurantCard;