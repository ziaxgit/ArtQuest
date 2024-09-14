interface Exhibition {
  name: string;
  path: string;
  description: string;
  artworks: string[];
}

export const getExhibitionsFromLocalStorage = (): Exhibition[] => {
  try {
    // localStorage.removeItem("exhibitions");

    const storedExhibitions = localStorage.getItem("exhibitions");

    console.log(JSON.parse(storedExhibitions));
    return storedExhibitions ? JSON.parse(storedExhibitions) : [];
  } catch (error) {
    console.error("Error retrieving exhibitions from localStorage", error);
    return [];
  }
};

export const setExhibitionsToLocalStorage = (
  exhibitions: Exhibition[]
): void => {
  try {
    localStorage.setItem("exhibitions", JSON.stringify(exhibitions));
  } catch (error) {
    console.error("Error setting exhibitions to localStorage", error);
  }
};

export const clearExhibitionsFromLocalStorage = (): void => {
  try {
    localStorage.removeItem("exhibitions");
  } catch (error) {
    console.error("Error clearing exhibitions from localStorage", error);
  }
};
