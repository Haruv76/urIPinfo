async function getIPInfo() {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "Loading...";

    try {
        const res = await fetch("https://ipwho.is/");
        const data = await res.json();

        const info = {
            "IP": data.ip,
            "Country": data.country,
            "Country ISO": data.country_code,
            "State": data.region,
            "City": data.city,
            "Postal Code": data.postal,
            "Latitude": data.latitude,
            "Longitude": data.longitude,
            "Organization": data.connection.org,
            "ISP": data.connection.isp
        };

        resultsDiv.innerHTML = "";

        for (const key in info) {
            const value = info[key];

            const item = document.createElement("div");
            item.className = "item";

            item.innerHTML = `
                <span><b>${key}:</b> ${value}</span>
                <button class="copy-btn" onclick="copyText('${value}')">Copy</button>
            `;

            resultsDiv.appendChild(item);
        }

    } catch (err) {
        resultsDiv.innerHTML = "Error loading IP data.";
    }
}

function copyText(text) {
    navigator.clipboard.writeText(text);
    alert("Copied: " + text);
}

getIPInfo();
