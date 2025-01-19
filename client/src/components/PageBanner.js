import React from 'react';
import { Link } from 'react-router-dom'; // For dynamic breadcrumbs
import '../PageBanner.css'; // Ensure you have the corresponding CSS file

const PageBanner = ({ pageTitle, breadcrumbs }) => {
  return (
    <section className="page-banner">
      <div className="banner-content">
        {/* Page Title */}
        <h1 className="page-title">{pageTitle}</h1>

        {/* Breadcrumbs */}
        <nav className="breadcrumbs">
          <ul>
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={index}>
                <Link to={breadcrumb.link}>{breadcrumb.label}</Link>
                {index < breadcrumbs.length - 1 && <span className="separator">/</span>}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default PageBanner;
