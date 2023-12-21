import "./Contact.css"; // Don't forget to import your CSS file

import utk from "../assets/utk.png";
import shr from "../assets/shruti2.png";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
const TeamSection = () => {
  return (
    <div className="main bg-teal-50">
      <div className="profile-card">
        <div className="img">
          <img src={shr} alt="Shruti" />
        </div>
        <div className="caption">
          <h3>Shruti</h3>
          <p>Front End Developer</p>
          <div className="social-links text-black">
            <a href="https://www.linkedin.com/in/shrutisharma6/">
              <LinkedInIcon />
            </a>
            <a href="https://github.com/xshrutix">
              <GitHubIcon />
            </a>
            <a href="https://twitter.com/Shruti374105">
              <TwitterIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="profile-card">
        <div className="img">
          <img src={utk} alt="Utkarsh Saxena" />
        </div>
        <div className="caption">
          <h3>Utkarsh Saxena</h3>
          <p>Full Stack Developer</p>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/utkarsh-saxena-5a9034201/">
              <LinkedInIcon />
            </a>
            <a href="https://github.com/UtkarshSaxenautk">
              <GitHubIcon />
            </a>
            <a href="https://twitter.com/Utkarsh18300296">
              <TwitterIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
