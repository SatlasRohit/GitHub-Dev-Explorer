import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

function DeveloperDetails() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [dev, setDev] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    async function fetchDeveloper() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`https://api.github.com/users/${username}`, {
          signal: controller.signal,
        });
        if (!response.ok) { 
          if (response.status === 404) {
            throw new Error("Developer not found");
          }
          throw new Error(`Failed to fetch developer (status ${response.status})`);
        }
        const data = await response.json();
        setDev(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchDeveloper();
    return () => controller.abort();
  }, [username]);
  const handleBack = () => {
    navigate(-1);
  };
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" />
        <div className="mt-2 small-text">Loading developer details…</div>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <Button variant="link" className="px-0 mb-3" onClick={handleBack}>
          ← Back
        </Button>
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </>
    );
  }

  if (!dev) return null;

  return (
    <>
      <Button variant="link" className="px-0 mb-3" onClick={handleBack}>
        ← Back
      </Button>

      <Card className="mb-3">
        <Card.Body>
          <Card.Title className="mb-2">{dev.name || "No name provided"}</Card.Title>
          <Card.Subtitle className="text-muted mb-2">@{dev.login}</Card.Subtitle>
          {dev.bio && <p className="mb-0">{dev.bio}</p>}
          {!dev.bio && <p className="text-muted mb-0">No bio available.</p>}
        </Card.Body>
      </Card>

      <Row className="g-3">
        {/* Stats Section */}
        <Col xs={12} md={6}>
          <Card className="dev-section-card">
            <Card.Body>
              <Card.Title className="section-title">Stats</Card.Title>
              <div className="section-row">
                <span className="section-label">Followers</span>
                <span className="section-value">{dev.followers}</span>
              </div>
              <div className="section-row">
                <span className="section-label">Following</span>
                <span className="section-value">{dev.following}</span>
              </div>
              <div className="section-row">
                <span className="section-label">Public Repositories</span>
                <span className="section-value">{dev.public_repos}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Additional Info Section */}
        <Col xs={12} md={6}>
          <Card className="dev-section-card">
            <Card.Body>
              <Card.Title className="section-title">Profile Info</Card.Title>
              <div className="section-row">
                <span className="section-label">Location</span>
                <span className="section-value">
                  {dev.location || "Not specified"}
                </span>
              </div>
              <div className="section-row">
                <span className="section-label">Account Type</span>
                <span className="section-value">{dev.type}</span>
              </div>
              <div className="section-row">
                <span className="section-label">GitHub Profile</span>
                <span className="section-value">
                  <a
                    href={dev.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="profile-link"
                  >
                    {dev.html_url}
                  </a>
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default DeveloperDetails;
