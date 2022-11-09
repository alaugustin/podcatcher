import "./styles.css";

const RSS_URL = `https://omnycontent.com/d/playlist/e73c998e-6e60-432f-8610-ae210140c5b1/A6620428-68FA-4B5D-A5AF-AE33005F660F/0660E13D-8AA3-45F5-90EF-AE33005F6621/podcast.rss`; // Feed works
// const RSS_URL = `https://podcasts.files.bbci.co.uk/p02nrtyw.rss`; // Feed works
// const RSS_URL = `https://whatthefuckjusthappenedtoday.com/podcasts/index.xml`; // Starter Feed works

fetch(RSS_URL)
  .then((response) => response.text())
  .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
  .then((data) => {
    const items = data.querySelectorAll("item");
    let html = ``;

    items.forEach(el => {
      const podTitle = el.querySelector("title").innerHTML,
        podPubDate = el.querySelector("pubDate").innerHTML,
        podLink = el.querySelector("link").innerHTML,
        enclosureURL = el.querySelector("enclosure").getAttribute('url'),
        enclosureType = el.querySelector("enclosure").getAttribute('type');
      html += `
        <article>
          <h2>${podTitle}</h2>

          <audio controls>
            <source src="${enclosureURL}" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
          <p>${enclosureType}</p>

          <p>${el.querySelector("description").textContent}</p>

          <p>Episode Page: <a href="${podLink}" target="_blank" rel="noopener" target="_blank">${podLink}</a></p>

          <p>Published: ${podPubDate}</p>
        </article>
      `;
      console.log(podTitle);
      console.log('-----');
    });
    document.getElementById("app").insertAdjacentHTML("beforeend", html);

    console.log(data);
    console.log(items);
  });

// document.getElementById("app").innerHTML = `
// <h1>Hello Vanilla!</h1>
// <div>
//   We use the same configuration as Parcel to bundle this sandbox, you can find more
//   info about Parcel
//   <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
// </div>
// `;
