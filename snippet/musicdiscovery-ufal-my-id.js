async function loadDiscovery() {
    const url = "https://musicdiscovery.ufal.workers.dev";
    const res = await fetch(url);
    const text = await res.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");
    const items = xml.querySelectorAll("item");

    const container = document.getElementById("discovery");
    container.innerHTML = "";

    items.forEach((item, idx) => {
      if (idx >= 3) return;

      const desc = item.querySelector("description")?.textContent || "";

      const descDoc = new DOMParser().parseFromString(desc, "text/html");
      const firstLine = descDoc.querySelector("div")?.textContent.trim() || "";
      const secondLink = descDoc.querySelector("a")?.getAttribute("href") || "#";

      const div = document.createElement("div");
      div.innerHTML = `<a href="${secondLink}" target="_blank">${firstLine}</a>`;
      container.appendChild(div);
    });
  }

  loadDiscovery();