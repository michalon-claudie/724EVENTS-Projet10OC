import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date/index";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = Array.isArray(data?.focus)
  ? [...data.focus].sort((evtA, evtB) => (new Date(evtA.date) < new Date(evtB.date) ? -1 : 1))
  : [];

  const totalSlides = byDateDesc.length;
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex < totalSlides - 1 ? prevIndex + 1 : 0));
    }, 5000)

    return () => clearInterval(intervalId); 
  }, [totalSlides]);

  const handleOnChange = (event) => {
    const newIndex = parseInt(event.target.value, 10);
    setIndex(newIndex);
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${radioIdx+10}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={handleOnChange}
                  value={radioIdx}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Slider;
