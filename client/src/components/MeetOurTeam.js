import React from 'react';
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa'; // Import the necessary icons
import '../MeetOurTeam.css'; // Custom CSS for styling

const MeetOurTeam = () => {
  const teamMembers = [
    {
      image: '/images/Team/Taha.jpg', // Replace with actual image path
      name: 'Muhammad Taha Sami',
      studentId: 'CSC 23S 126',
      whatsapp: 'https://wa.me/+923272498799',
      instagram: 'https://instagram.com/itzztahahere',
      facebook: 'https://bento.me/tahasami'
    },
    {
      image: '/images/Team/Shayan.jpg', 
      name: 'Shayan Ahmed',
      studentId: 'CSC 23S 150',
      whatsapp: 'https://wa.me/+923171056544',
      instagram: 'https://instagram.com/mr_shayan_javed',
      facebook: 'https://facebook.com/janesmith'
    },
    {
      image: '/images/Team/Osama.jpg', 
      name: 'Osama Magsi',
      studentId: 'CSC 23S 110',
      whatsapp: 'https://wa.me/+923442751709',
      instagram: 'https://instagram.com/',
      facebook: 'https://facebook.com/alicejohnson'
    },
    {
      image: '/images/Team/Faizan.jpg', 
      name: 'Faizan Shabbir',
      studentId: 'CSC 23S 122',
      whatsapp: 'https://wa.me/+923353121941',
      instagram: 'https://instagram.com/bobbrown',
      facebook: 'https://facebook.com/bobbrown'
    }
  ];

  return (
    <section className="meet-our-team-container container px-5">
      <div className="text-center">
        <h2 className="meet-our-team-heading">Meet Our Team</h2>
        <p className="meet-our-team-description">
          Our dedicated team members are here to help you achieve success.
        </p>
      </div>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member-card">
            <img src={member.image} alt={member.name} className="team-member-image" />
            <h3 className="team-member-name">{member.name}</h3>
            <p className="team-member-profession">{member.studentId}</p>
            <div className="team-member-icons">
              <a href={member.whatsapp} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="social-icon" />
              </a>
              <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon" />
              </a>
              <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="social-icon" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetOurTeam;
