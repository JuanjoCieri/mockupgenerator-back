export function getDeviceFromFileName(filename) {
    if (filename.includes("laptop")) {
      return "Laptop";
    } else if (filename.includes("desktop")) {
      return "Desktop";
    } else if (filename.includes("phone")) {
      return "Móvil";
    } else if (filename.includes("tablet")) {
      return "Tablet";
    }
    return "other";
  }