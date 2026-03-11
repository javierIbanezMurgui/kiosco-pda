const SPREADSHEET_ID = "1XT6m5p10idLEKCS1q9YxavyKyuIN5SOubzZy4RqU6yM"; // Tu Google Sheet

// Servir HTML
function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
      .setTitle("Sistema PDA")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// --- Funciones que JS llamará vía google.script.run ---
function getUsuarios() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Usuarios");
  const data = sheet.getDataRange().getValues();
  const headers = data.shift();
  return data.map(row => {
    let obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function getDispositivos() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Dispositivos");
  const data = sheet.getDataRange().getValues();
  const headers = data.shift();
  return data.map(row => {
    let obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function registrarLogin(usuario, numeroPda, device) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Logins");
  const fecha = new Date();
  sheet.appendRow([usuario, numeroPda, device, fecha]);
  return { status: "ok" };
}

function registrarLogout(usuario, numeroPda, device) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Logouts");
  const fecha = new Date();
  sheet.appendRow([usuario, numeroPda, device, fecha]);
  return { status: "ok" };
}
