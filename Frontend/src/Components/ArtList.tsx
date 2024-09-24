import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Dropdown,
} from "react-bootstrap";
import { fetchClevelandApiData } from "../utils/fetchApiData";
import {
  getCollectionsFromLocalStorage,
  setCollectionsToLocalStorage,
} from "../utils/collectionsStorage";
import { LuExternalLink } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
interface Artwork {
  id: number;
  title: string;
  creation_date: string;
  department: string;
  culture: string;
  technique: string;
  creators: { description: string }[];
  images: { web: { url: string } };
  description: string;
  url: string;
  sortable_date: Number;
}

const ArtList = () => {
  const [artData, setArtData] = useState<Artwork[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [addedArtworks, setAddedArtworks] = useState(
    getCollectionsFromLocalStorage()
  );

  const fetchArtData = async (
    page: number,
    searchTerm: string,
    filterTerm?: string,
    sortBy?: string
  ) => {
    setIsLoading(true);
    try {
      const response = await fetchClevelandApiData(
        page,
        searchTerm,
        filterTerm,
        sortBy
      );
      const data = response.data.data;
      setArtData((prevData) => (page === 1 ? data : [...prevData, ...data]));
    } catch (error) {
      console.error("Error fetching artwork data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArtData(currentPage, searchTerm);
  }, [currentPage]);

  const handleLoadMore = () => setCurrentPage((prevPage) => prevPage + 1);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);

    fetchArtData(1, searchTerm);
  };

  const handleFilterClick = (filter: string) => {
    setSearchTerm("");
    setCurrentPage(1);
    setFilterTerm(filter);
    fetchArtData(currentPage, "", filter);
  };

  const handleSortClick = (sort: string) => {
    setCurrentPage(1);
    setSortBy(sort);
    if (sort === "Oldest first") {
      artData.sort((a: any, b: any) => a.sortable_date - b.sortable_date);
    } else {
      artData.sort((a: any, b: any) => b.sortable_date - a.sortable_date);
      console.log(artData);
    }
  };

  const handleReset = () => {
    setCurrentPage(1);
    setSearchTerm("");
    setFilterTerm("");
    setSortBy("");
    fetchArtData(currentPage, searchTerm);
  };

  const handleAddToCollection = (artwork: Artwork) => {
    const newArtwork = {
      id: artwork.id,
      title: artwork.title,
      description: artwork.description,
      artist: artwork.creators.map((creator) => creator.description).join(", "),
      origin: artwork.culture,
      department: artwork.department,
      url: artwork.url,
      image_src: artwork.images.web.url,
      created_at: artwork.creation_date,
    };
    const currentCollections = getCollectionsFromLocalStorage();

    if (!currentCollections.some((item) => item.id === artwork.id)) {
      const updatedCollections = [...currentCollections, newArtwork];
      setCollectionsToLocalStorage(updatedCollections);
      setAddedArtworks(updatedCollections);
    }
  };

  const isArtworkAdded = (artwork: Artwork) => {
    return addedArtworks.some((item) => item.id === artwork.id);
  };

  const handleRemoveFromCollection = (artwork: Artwork) => {
    const currentCollections = getCollectionsFromLocalStorage();
    const updatedCollections = currentCollections.filter(
      (item) => item.id !== artwork.id
    );
    setCollectionsToLocalStorage(updatedCollections);
    setAddedArtworks(updatedCollections);
  };

  return (
    <Container className="mt-4">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Cleveland Museum of Art
      </h1>
      <Form onSubmit={(e) => handleSearch(e)}>
        <Row className="justify-content-center">
          <Col xs="6" md="6">
            <Form.Control
              type="text"
              placeholder="Search artworks"
              className="mr-sm-2"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>

      <div className="mt-2 d-flex gap-2 align-items-center">
        <Dropdown className="mt-2">
          <Dropdown.Toggle
            variant={filterTerm ? "success" : "secondary"}
            id="dropdown-basic"
          >
            {filterTerm || "Filter by department"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleFilterClick("African Art")}>
              African Art
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterClick("Chinese Art")}>
              Chinese Art
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                handleFilterClick("Egyptian and Ancient Near Eastern Art")
              }
            >
              Egyptian and Ancient Near Eastern Art
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                handleFilterClick("European Painting and Sculpture")
              }
            >
              European Painting and Sculpture
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleFilterClick("Decorative Art and Design")}
            >
              Decorative Art and Design
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="mt-2">
          <Dropdown.Toggle
            variant={sortBy ? "success" : "secondary"}
            id="dropdown-basic"
          >
            {sortBy || "Sort by"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSortClick("Oldest first")}>
              Oldest first
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortClick("Latest first")}>
              Latest first
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown id="dropdown-basic" className="mt-2">
          <Button onClick={handleReset} variant="danger">
            Reset
          </Button>
        </Dropdown>
      </div>

      {isLoading && (
        <div className="d-flex justify-content-center m-2">
          <Spinner animation="border" />
        </div>
      )}

      <Row className="mt-4">
        {artData.map((artwork: Artwork, index) => (
          <Col key={index} sm={6} md={6} lg={6} className="mb-4">
            <Card>
              <a>
                <Card.Img
                  variant="top"
                  src={artwork.images.web.url}
                  alt={artwork.title}
                  style={{ maxHeight: "500px", objectFit: "contain" }}
                />
              </a>
              <Card.Body>
                <a
                  href={artwork.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <h5 className="d-flex gap-2 align-items-center">
                    {artwork.title}
                    <LuExternalLink />
                  </h5>
                </a>
                <Card.Text>
                  <strong>Creation Date:</strong> {artwork.creation_date} <br />
                  <strong>Department:</strong> {artwork.department} <br />
                  <strong>Culture:</strong> {artwork.culture} <br />
                  <strong>Technique:</strong> {artwork.technique} <br />
                  <strong>Creator:</strong>{" "}
                  {artwork.creators
                    .map((creator) => creator.description)
                    .join(", ")}
                  <Card.Text
                    className="mt-2"
                    dangerouslySetInnerHTML={{ __html: artwork.description }}
                  />
                </Card.Text>
                <Col className="d-flex gap-2">
                  <Button
                    disabled={isArtworkAdded(artwork)}
                    className="mt-2 d-flex gap-2 justify-center align-items-center text-black"
                    onClick={() => handleAddToCollection(artwork)}
                    variant={isArtworkAdded(artwork) ? "white" : "light"}
                  >
                    <FaHeart
                      style={{
                        color: "red",
                        fill: isArtworkAdded(artwork) ? "red" : "white",
                        stroke: "red",
                        strokeWidth: "20",
                        width: "20px",
                      }}
                    />
                    {isArtworkAdded(artwork)
                      ? "Saved to Collections"
                      : "Save to Collections"}
                  </Button>
                  {isArtworkAdded(artwork) && (
                    <Button
                      className="mt-2 bg-danger"
                      variant="secondary"
                      onClick={() => handleRemoveFromCollection(artwork)}
                    >
                      Remove
                    </Button>
                  )}
                </Col>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {isLoading && artData.length > 0 && (
        <div className="d-flex justify-content-center m-2">
          <Spinner animation="border" />
        </div>
      )}
      {isLoading && <h3>Loading data...</h3>}
      {artData.length > 0 && (
        <Row className="justify-content-center m-4">
          <Button
            disabled={isLoading}
            className="w-auto"
            variant="primary"
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </Row>
      )}
      {searchTerm && artData.length === 0 && !isLoading && (
        <h5 className="text-center">
          No artwork was found for the search term "{searchTerm}"
        </h5>
      )}
    </Container>
  );
};

export default ArtList;
