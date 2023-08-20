import React from "react";
import Styles from "./EventCard.module.css";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EventCard = ({ image, ColorTitle, ColorDetail, IsShadow }) => {
  const date = new Date("2023-12-05T12:00:00.000Z"); // Correct the date format

  const startTime = "00:00.000".slice(0, -4); // "00:00"
  const endTime = "01:00.000".slice(0, -4);
  const loaction = " New York, USA";
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const parsedHours = parseInt(hours, 10);
    const meridiem = parsedHours >= 12 ? "pm" : "am";
    const formattedHours = parsedHours % 12 === 0 ? 12 : parsedHours % 12;
    return `${formattedHours}:${minutes} ${meridiem}`;
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
        <div className={Styles.Up}>
          <img className={Styles.Up} src={image} alt="" />
        </div>
        <div className={Styles.DownCOntainer}>
          <div style={{ color: ColorTitle }} className={Styles.Down}>
            <div className={Styles.date}>
              <div className={Styles.day}>{day}</div>
              <div className={Styles.monunt}>{month}</div>
            </div>
            <div>
              <p className={Styles.EventDetail}>
                A Better Alternative to Grading Student Science Competitions
                2022.
              </p>
            </div>
          </div>
          <div style={{ color: ColorDetail }} className={Styles.InfoContainer}>
            <div className={Styles.Info1}></div>
            <div className={Styles.Info2}>
              <FontAwesomeIcon icon={faClock}  style={{ color: ColorDetail }}/>{" "}
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
            <Button width={28} color="#3270fc">Join Now</Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
