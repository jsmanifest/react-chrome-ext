import React from "react";

const convertToMs = (ms, type) => {
  switch (type) {
    case "seconds":
      return ms * 1000;
    case "minutes":
      return ms * 60000;
    case "hours":
      return ms * 36000000;
    default:
      break;
  }
};

function App() {
  function filterByDuration(duration) {
    return () => {
      const container = document.querySelector(
        "#contents.style-scope.ytd-item-section-renderer"
      );
      const elemsList = container.querySelectorAll("ytd-video-renderer");
      elemsList.forEach(elem => {
        const durationElem = elem.querySelector(
          "span.style-scope.ytd-thumbnail-overlay-time-status-renderer"
        );
        if (durationElem) {
          let durationTime = durationElem.innerText.trim();
          const durationParts = durationTime.split(":");
          let hour = 0;
          let min = 0;
          let sec = 0;
          switch (durationParts.length) {
            case 2:
              min = Number(durationParts[0]);
              sec = Number(durationParts[1]);
              break;
            case 3:
              hour = Number(durationParts[0]);
              min = Number(durationParts[1]);
              sec = Number(durationParts[3]);
              break;
            default:
              break;
          }
          let currentDurationInMs = convertToMs(hour, "hours");
          currentDurationInMs += convertToMs(min, "minutes");
          currentDurationInMs += convertToMs(sec, "seconds");
          const minMs = convertToMs(duration.min, "minutes");
          const maxMs = convertToMs(duration.max, "minutes");
          if (currentDurationInMs < minMs || currentDurationInMs > maxMs) {
            elem.parentNode.removeChild(elem);
          }
        }
      });
    };
  }

  React.useEffect(() => {
    // Register the message listener on load
    // eslint-disable-next-line
    chrome.runtime.onMessage.addListener(action => {
      switch (action.type) {
        case "filter-by-duration": {
          const filter = filterByDuration({ min: 10, max: 15 });
          filter();
          window.addEventListener("scroll", filter);
          break;
        }
        default:
          break;
      }
    });
  }, []);

  return null;
}

export default App;
