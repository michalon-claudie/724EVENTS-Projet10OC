import { useState, useEffect } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";
import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const filterEvents = () => {
      const events = data?.events ?? [];
      const filtered = events.filter(event => !type || event.type === type);
      const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
      setFilteredEvents(paginated);
    };

    filterEvents();
  }, [data, type, currentPage]);

  const changeType = (evtType) => {
    setType(evtType);
    setCurrentPage(1);
  };

  const totalPages = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1
  const typeList = new Set(data?.events?.map(event => event.type) ?? []);

  return (
    <>
      {error && <div>An error occurred</div>}
      {data?.events ? (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={value => changeType(value || null)}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map(event => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(totalPages)].map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={`event_${index}`} href="#events" onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </a>
            ))}
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default EventList;