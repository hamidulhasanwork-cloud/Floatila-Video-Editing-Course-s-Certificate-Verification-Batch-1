const SHEET_ID = "16YSGA7VztFOCKudmpOlRGT_Rbza4Z08Yi88PPaIw7FY";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${16YSGA7VztFOCKudmpOlRGT_Rbza4Z08Yi88PPaIw7FY}/gviz/tq?tqx=out:json`;

async function verify() {
  const id = document.getElementById("certID").value.trim();
  if (!id) {
    document.getElementById("result").innerHTML = "Please enter a Certificate ID";
    return;
  }

  try {
    const response = await fetch(SHEET_URL);
    const text = await response.text();
    const json = JSON.parse(text.substring(47, text.length-2));
    const rows = json.table.rows;

    let found = false;
    for (let r of rows) {
      if (r.c[4] && r.c[4].v === id) {
        found = true;
        document.getElementById("result").innerHTML = 
          `✅ Valid Certificate<br>
           Name: ${r.c[1].v}<br>
           Course: ${r.c[2].v}<br>
           Issue Date: ${r.c[3].v}`;
        break;
      }
    }

    if (!found) {
      document.getElementById("result").innerHTML = "❌ Invalid Certificate ID";
    }

  } catch (error) {
    document.getElementById("result").innerHTML = "Error fetching data!";
    console.error(error);
  }
}
