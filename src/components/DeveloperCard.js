import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function DeveloperCard({ developer }) {
  const { login, type, id } = developer;

  return (
    <Card className="h-100 dev-card">
      <Card.Body>
        <Card.Title className="dev-username">{login}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted dev-type">
          Type: {type}
        </Card.Subtitle>

        <div className="dev-meta">
          <div className="meta-label">GitHub ID</div>
          <div className="meta-value">{id}</div>
        </div>
      </Card.Body>

      <Card.Footer className="bg-transparent border-0 pt-0 pb-3">
        <Button
          as={Link}
          to={`/dev/${login}`}
          variant="outline-dark"
          size="sm"
          className="w-100"
        >
          View Profile
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default DeveloperCard;
