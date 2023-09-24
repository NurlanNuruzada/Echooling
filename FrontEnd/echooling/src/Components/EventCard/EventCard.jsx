import React from "react";
import Styles from "./EventCard.module.css";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

const EventCard = ({ image, ColorTitle, ColorDetail, IsShadow ,Title,StartDate,EndTime,Location,Category,guId}) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const handleNavigate = () => {
    navigate(`/EventDetail/${guId}`);
  };
  const date = new Date(StartDate); // Correct the date format
  const startTime = StartDate?.slice(11,-3) 
  const endTime = EndTime?.slice(11,-3)
  const loaction = Location;
  const formatTime = (time) => {
    if (time) {
      const [hours, minutes] = time.split(":");
      const parsedHours = parseInt(hours, 10);
      const meridiem = parsedHours >= 12 ? "pm" : "am";
      const formattedHours = parsedHours % 12 === 0 ? 12 : parsedHours % 12;
      return `${formattedHours}:${minutes} ${meridiem}`;
    }
    else{
      return "";
    }
  };

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  return (
    <div>
      <div
        data-aos-duration="1000"
        data-aos="fade-down"
        className={IsShadow ? Styles.Main : Styles.EventCard}
      >
        <div className={Styles.ImageContainer}>
          <img className={Styles.Up} src={`Uploads/Event/${image}`} alt="" />
          <p className={Styles.Category}>{Category}</p>
        </div>
        <div className={Styles.DownCOntainer}>
          <div style={{ color: ColorTitle }} className={Styles.Down}>
            <div className={Styles.date}>
              <div className={Styles.day}>{day}</div>
              <div className={Styles.monunt}>{month}</div>
            </div>
            <div>
              <p className={Styles.EventDetail}>
                {Title}
              </p>
            </div>
          </div>
          <div style={{ color: ColorDetail }} className={Styles.InfoContainer}>
            <div className={Styles.Info1}></div>
            <div className={Styles.Info2}>
              <FontAwesomeIcon icon={faClock} style={{ color: ColorDetail }} />{" "}
              {formatTime(startTime)} - {formatTime(endTime)}
            </div>
            <div className={Styles.Info3}>
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{ color: ColorDetail }}
              />
              {loaction}
            </div>
          </div>
          <Button onClick={handleNavigate} width={28} color="#3270fc">
            Join Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
