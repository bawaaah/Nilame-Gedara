import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../Dimuthu_CSS/AdminComplaintDisplayCSS.css';
import { DialogContent } from '@mui/material';
import { PDFDownloadLink, Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      padding: 10,
      fontSize: 15,
    },
    title: {
      fontSize: 20,
      marginBottom: 10,
    },
    feedback: {
      marginBottom: 10,
    },
  });


  const FeedbacksDocument = ({ feedbacks }) => (
    <Document>
      <Page size="A4" style={styles.page}>
      <Text style={[styles.title, { color: 'blue' }]}>Feedbacks Report</Text>
        {feedbacks.map((feedback, index) => (
          <React.Fragment key={index}>
            <Text style={styles.feedback}>ID: {feedback.id}</Text>
            <Text style={styles.feedback}>Name: {feedback.name}</Text>
            <Text style={styles.feedback}>Email: {feedback.email}</Text>
            <Text style={styles.feedback}>Feedback: {feedback.feedback}</Text>
            <Text style={styles.feedback}>Suggestion: {feedback.suggestion}</Text>
            <Text>-----------------------------------------------------------------------</Text>
          </React.Fragment>
        ))}
      </Page>
    </Document>
  );

  const FeedbacksPDF = ({ feedbacks }) => (
    <div>
    <PDFDownloadLink document={<FeedbacksDocument feedbacks={feedbacks} />} fileName="feedbacks.pdf">
        {({ blob, url, loading, error }) => (
        <button style={{ backgroundColor: 'red', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', padding: '10px' }}>
            {loading ? 'Loading document...' : 'Download PDF'}
        </button>
        )}
    </PDFDownloadLink>
    </div>

  );


const AdminFeedbackDisplay = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [Replyform, setReplyform] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedReply, setSelectedReply] = useState(null);
    const [replyMessage, setReplyMessaget] = useState('');
    const [View, setView] = useState(false);

    useEffect(() => {
        getFeedback();
    }, []);

    const getFeedback = async () => {
        try {
            const response = await Axios.get('http://localhost:8070/api/getFeedback');
            setFeedbacks(response.data?.feedbacks || []);
            setFilteredFeedbacks(response.data?.feedbacks || []);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    const replyHandle = (id) => {
        setSelectedId(id);
        setReplyform(!Replyform);
    };

    const replyView = (reply) => {
        setSelectedReply(reply);
        setView(!View);
    };

    const viewSuggestions = (suggestions) => {
        setSelectedReply(suggestions);
        setView(!View);
    };

    const viewFeedback = (feedback) => {
        setSelectedReply(feedback);
        setView(!View);
    };

    const sendReply = () => {
        console.log(selectedId);
        console.log(replyMessage);

        const payloadupdate = {
            id: selectedId,
            reply: replyMessage,
        };

        Axios.post('http://localhost:8070/api/updateFeedback', payloadupdate)
            .then((response) => {
                console.log("Feedback submitted successfully:", response.data);
            })
            .catch((error) => {
                console.error("Error submitting feedback:", error);
            });
        alert("Reply send Successfully ..!");
        window.location.reload();
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchInput(searchTerm);
        const filtered = feedbacks.filter(feedback =>
            feedback.id.toString().includes(searchTerm) || feedback.email.toLowerCase().includes(searchTerm)
        );
        setFilteredFeedbacks(filtered);
    };
    

    return (
        <div className="feedback-display">
            <div className="feedback-display" style={{ backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'center' }}>

                <a href='/' className="action-link" style={{ color: 'blue', textDecoration: 'none', margin: '10px', display: 'inline-block' }}>Back</a> <br></br>

                <input
                    type="text"
                    placeholder="Search by ID or Email"
                    value={searchInput}
                    onChange={handleSearch}
                    className="search-bar"
                />
                <FeedbacksPDF feedbacks={feedbacks} />
            </div>

            {Replyform && (
                <div className="popup">
                    <DialogContent className="popup-content">
                        <div>Feedback id : {selectedId}</div>
                        <textarea
                            value={replyMessage}
                            onChange={(e) => setReplyMessaget(e.target.value)}
                            required
                            className="popup-textarea"
                            placeholder="Enter your reply..."
                        ></textarea><br></br>
                        <button onClick={sendReply} className="send-button">Send</button>
                        <button onClick={replyHandle} className="cancel-button">Cancel</button>
                    </DialogContent>
                </div>
            )}

            {View && (
                <div className="popup">
                    <DialogContent className="popup-content">
                        <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px', marginTop: '10px', minWidth: '300px', minHeight: '150px' }}>
                            {selectedReply}
                        </div>
                        <button onClick={replyView} className="cancel-button">Cancel</button>
                    </DialogContent>
                </div>
            )}

            <table className="feedback-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Feedback</th>
                        <th>Suggestion</th>
                        <th>Reply Message</th>
                        <th>View Reply Message</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFeedbacks.map(feedback => (
                        <tr key={feedback._id}>
                            <td>{feedback.id}</td>
                            <td>{feedback.name}</td>
                            <td>{feedback.email}</td>
                            <td>{feedback.phone}</td>
                            <td>
                                <button onClick={() => viewFeedback(feedback.feedback)} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', transition: 'background-color 0.3s ease' }}>
                                    View Feedback
                                </button>
                            </td>
                            <td>
                                <button onClick={() => viewSuggestions(feedback.suggestion)} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', transition: 'background-color 0.3s ease' }}>
                                    View Suggestions
                                </button>
                            </td>
                            <td>
                                {feedback.reply === null ? (
                                    <button onClick={() => replyHandle(feedback.id)} style={{ backgroundColor: '#ff0404', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', transition: 'background-color 0.3s ease' }}>
                                        Reply
                                    </button>
                                ) : (
                                    <div>sent</div>
                                )}
                            </td>
                            <td>
                                {feedback.reply === null ? (
                                    <div>No reply</div>
                                ) : (
                                    <button onClick={() => replyView(feedback.reply)} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', transition: 'background-color 0.3s ease' }}>
                                        View
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminFeedbackDisplay;
