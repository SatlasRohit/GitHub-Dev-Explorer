import React, { useEffect, useState } from "react";
import { Row, Col, Alert, Spinner } from "react-bootstrap";
import DeveloperCard from "../components/DeveloperCard";

const DEVELOPERS_API = "https://api.github.com/users?per_page=5";

function Home() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDevelopers() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(DEVELOPERS_API, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch developers (status ${response.status})`);
        }

        const data = await response.json();
        setDevelopers(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDevelopers();
    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="mb-4 text-center">
        <h1 className="page-title">GitHub Developers</h1>
        <p className="page-subtitle">
          Showing 5 public GitHub users. Click &quot;View Profile&quot; to see full details.
        </p>
      </div>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
          <div className="mt-2 small-text">Loading developers…</div>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Row>
          {developers.map((dev) => (
            <Col key={dev.id} xs={12} md={6} lg={4} className="mb-3">
              <DeveloperCard developer={dev} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default Home;
