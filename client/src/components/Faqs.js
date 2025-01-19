import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const itemsPerPage = 5; // Set number of items per page

  // Fetch FAQ questions
  const getQuestions = async () => {
    try {
      const { data } = await axios.get('http://localhost:3308/get-faqs');
      setFaqs(data?.data);
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching the questions.');
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  // Calculate the items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = faqs.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-4 " style={{backgroundColor:'f8f9fa'}}>
      <h2 className="text-center">Frequently Asked Questions</h2>
      {error && <p className="text-danger text-center">{error}</p>}

      {currentItems.map((faqs) => (
        <div key={faqs.id} className="faq-item border-bottom py-2">
          <div
            className="d-flex justify-content-between align-items-center"
            onClick={() => setExpandedQuestion(expandedQuestion === faqs.id ? null : faqs.id)}
            style={{ cursor: 'pointer' }}
          >
            <span className="fw-bold">{faqs.question}</span>
            {expandedQuestion === faqs.id ? (
              <FaAngleUp className="faq-icon" />
            ) : (
              <FaAngleDown className="faq-icon" />
            )}
          </div>
          {expandedQuestion === faqs.id && (
            <div className="faq-answer mt-2">
              <p>{faqs.answer}</p>
            </div>
          )}
        </div>
      ))}

      {/* Pagination */}
      <nav aria-label="Page navigation" className="mt-4">
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(faqs.length / itemsPerPage) }, (_, index) => (
            <li
              key={index}
              className={`page-item  ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button 
              style={{color:'green',backgroundColor:'white'}}
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Faqs;
