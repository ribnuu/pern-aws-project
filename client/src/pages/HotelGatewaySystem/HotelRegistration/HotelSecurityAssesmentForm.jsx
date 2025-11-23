import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { HandleChangeFormData } from "../../../store/form/FormSlice";
import Slider from "react-slick";
import img1 from "../../../assets/hgs/floor_specific_access.jpg";
import img2 from "../../../assets/hgs/elevator_security.jpg";
import img3 from "../../../assets/hgs/smart_lock_system.jpg";
import img4 from "../../../assets/hgs/digital_lock_system.jpg";
import img5 from "../../../assets/hgs/traditional_room_security_locks.jpg";
import img6 from "../../../assets/hgs/enhanced_room_security.jpg";
import img7 from "../../../assets/hgs/silent_alarms.jpg";
import img8 from "../../../assets/hgs/luggage_scanning.jpg";
import img9 from "../../../assets/hgs/luggage_tags_and_tracking.jpg";
import img10 from "../../../assets/hgs/private_luggage_handling.jpg";
import img11 from "../../../assets/hgs/uniformed_and_plainclothes_security.jpg";
import img12 from "../../../assets/hgs/in_room_personal_safe.png";
import img13 from "../../../assets/hgs/peepholes.jpg";
import img14 from "../../../assets/hgs/incident_reporting_log_book.png";
import img15 from "../../../assets/hgs/cctv_video_surveillance_24_7.jpg";
import img16 from "../../../assets/hgs/centralized_monitoring_24_7.png";
import img17 from "../../../assets/hgs/compulsory_id_passport_verification.jpg";
import img18 from "../../../assets/hgs/trained_security_team_24_7.jpg";
import img19 from "../../../assets/hgs/emergency_response_plans_24_7.jpg";

// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";

const HotelSecurityAssessmentForm = ({ formData }) => {
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleInputChange = (key, value) => {
    dispatch(HandleChangeFormData({ key, value }));
  };

  const checkboxOptions = [
    {
      field: "floor_specific_access", // ok
      tooltip:
        "Key cards are programmed to only allow guests access to their assigned floor(s), preventing unauthorized individuals from entering restricted guest floors.",
      image: img1,
    },
    {
      field: "elevator_security", // ok
      tooltip:
        "Some luxury hotels have exclusive elevators that only allow access to certain floors for certain guests, based on the assigned key card.",
      image: img2,
    },
    {
      field: "smart_lock_system", // ok
      tooltip:
        "rooms are equipped with smart locks, often using biometric (fingerprint or facial recognition)",
      image: img3,
    },
    {
      field: "digital_lock_system", // ok
      tooltip: "Digital keypads for added protection and pin entry.",
      image: img4,
    },
    {
      field: "traditional_room_security_locks", // ok
      tooltip: "Traditional locks for the room doors",
      image: img5,
    },
    {
      field: "enhanced_room_security", // ok
      tooltip:
        "In addition to traditional locks, luxury hotels may offer double locks (deadbolt and chain) ",
      image: img6,
    },
    {
      field: "silent_alarms", // ok
      tooltip:
        "Rooms may be equipped with discreet panic buttons or silent alarms that alert security in case of a breach or emergency.",
      image: img7,
    },
    {
      field: "luggage_scanning", // ok
      tooltip:
        "Some luxury hotels utilize X-ray machines or manual screening for luggage at the entrance or upon delivery to guest rooms to ensure no prohibited items are brought into the property.",
      image: img8,
    },
    {
      field: "luggage_tags_and_tracking", // ok
      tooltip:
        "All luggage is tagged and tracked using barcodes or RFID to prevent mix-ups or theft.",
      image: img9,
    },
    {
      field: "private_luggage_handling", // ok
      tooltip:
        "For high-profile guests, specialized staff (such as security officers or personal concierges) handle luggage discreetly and securely.",
      image: img10,
    },
    {
      field: "uniformed_and_plainclothes_security", // ok
      tooltip:
        "Some hotels deploy a combination of uniformed and plainclothes security personnel to blend in with guests, providing discreet surveillance while maintaining a low profile.",
      image: img11,
    },
    {
      field: "in_room_personal_safe", // ok
      tooltip:
        "Standard in-room safe locker / luxury hotels often provide personal vaults or high-security lockers for guests’ most valuable items.",
      image: img12,
    },
    {
      field: "peepholes", // ok
      tooltip:
        "Guest rooms are often equipped with high-quality peepholes for additional safety.",
      image: img13,
    },
    {
      field: "incident_reporting_log_book", // ok
      tooltip: "This is to log incidents of all types.",
      image: img14,
    },
    {
      field: "cctv_video_surveillance_24_7", // ok
      tooltip: "with facial recognition or motion-detection capabilities.",
      image: img15,
    },
    {
      field: "centralized_monitoring_24_7", // ok
      tooltip:
        "Security personnel continuously monitor live feeds from the cameras, enabling immediate response to any suspicious activity.",
      image: img16,
    },
    {
      field: "compulsory_id_passport_verification", // ok
      tooltip:
        "At check-in, guests are required to present government-issued photo ID, and in some cases, additional verification such as biometric scanning may be employed to confirm identity.",
      image: img17,
    },
    {
      field: "trained_security_team_24_7", // ok
      tooltip:
        "High-end hotels employ security personnel who are trained to handle a wide range of situations, from conflict resolution to emergency evacuations, and often have a background in law enforcement or private security.",
      image: img18,
    },
    {
      field: "emergency_response_plans_24_7", // ok
      tooltip:
        "Luxury hotels have detailed emergency response plans for a range of scenarios (fire, medical emergencies, natural disasters) and conduct regular drills for staff.",
      image: img19,
    },
  ];

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          background: "#e0e0e0", // Light gray
          borderRadius: "50%",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <span style={{ fontSize: "18px", color: "#333" }}></span>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          background: "#e0e0e0", // Light gray
          borderRadius: "50%",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <span style={{ fontSize: "18px", color: "#333" }}></span>
      </div>
    );
  }

  const settings = {
    dots: true, // Show navigation dots
    infinite: false, // Disable infinite scroll
    speed: 500, // Animation speed
    slidesToShow: 3, // Number of slides to show
    slidesToScroll: 3, // Number of slides to scroll
    arrows: true, // Enable left and right navigation arrows
    beforeChange: (_, next) => setCurrentSlide(next), // Track current slide
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablet and below
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true, // Show dots on smaller screens
          arrows: true, // Ensure arrows show on smaller screens
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
    ],
  };

  return (
    <form className="space-y-4 p-4">
      <Slider {...settings}>
        {checkboxOptions.map(({ field, tooltip, image }) => (
          <div key={field} className="flex flex-col items-center space-y-2 p-2">
            <img
              src={image}
              alt={tooltip}
              className="w-full h-64 object-contain object-center"
            />
            <label className="flex flex-col items-center text-center">
              <input
                type="checkbox"
                checked={formData[field] || false}
                onChange={(e) => handleInputChange(field, e.target.checked)}
                className="w-6 h-6 accent-blue-500"
              />
              <span className="mt-4 font-semibold text-gray-800 text-center">
                <FormattedMessage
                  id={`app.hotel.form_fields.checkbox.${field}`}
                  defaultMessage={field}
                />
              </span>
            </label>
            <p className="text-gray-500 text-center">
              <FormattedMessage
                id={`app.hotel.form_fields.tooltip.${field}`}
                defaultMessage={tooltip}
              />
            </p>
          </div>
        ))}
      </Slider>
    </form>
  );
};

export default HotelSecurityAssessmentForm;
